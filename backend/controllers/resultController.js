const Result = require('../models/Result');
const Exam = require('../models/Exam');
const Question = require('../models/Question');

// @desc    Enviar respuestas de examen
// @route   POST /api/results
// @access  Private/Student
exports.submitExam = async (req, res) => {
  try {
    const { examId, answers, timeTaken } = req.body;

    // Verificar que el examen existe
    const exam = await Exam.findById(examId).populate('questions');
    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: 'Examen no encontrado' 
      });
    }

    if (!exam.isActive) {
      return res.status(400).json({ 
        success: false, 
        message: 'Este examen no está activo' 
      });
    }

    // Verificar si el estudiante ya presentó este examen
    const existingResult = await Result.findOne({ 
      exam: examId, 
      student: req.user._id 
    });

    if (existingResult) {
      return res.status(400).json({ 
        success: false, 
        message: 'Ya has presentado este examen' 
      });
    }

    // Obtener todas las preguntas con respuestas correctas
    const questions = await Question.find({ exam: examId });

    // Calificar respuestas
    let totalScore = 0;
    const gradedAnswers = [];

    for (let answer of answers) {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      
      if (!question) continue;

      let isCorrect = false;
      let pointsEarned = 0;

      if (question.questionType === 'multiple-choice' || question.questionType === 'true-false') {
        // Para opción múltiple, verificar si la opción seleccionada es correcta
        const selectedOption = question.options.find(opt => opt._id.toString() === answer.selectedAnswer);
        if (selectedOption && selectedOption.isCorrect) {
          isCorrect = true;
          pointsEarned = question.points;
        }
      } else if (question.questionType === 'short-answer') {
        // Para respuesta corta, comparar texto (ignorando mayúsculas/minúsculas y espacios)
        const correctAnswer = question.correctAnswer.toLowerCase().trim();
        const userAnswer = answer.selectedAnswer.toLowerCase().trim();
        if (correctAnswer === userAnswer) {
          isCorrect = true;
          pointsEarned = question.points;
        }
      }

      totalScore += pointsEarned;

      gradedAnswers.push({
        question: question._id,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        pointsEarned
      });
    }

    const percentage = (totalScore / exam.totalPoints) * 100;

    // Crear resultado
    const result = await Result.create({
      exam: examId,
      student: req.user._id,
      answers: gradedAnswers,
      score: totalScore,
      percentage: percentage.toFixed(2),
      totalPoints: exam.totalPoints,
      timeTaken: timeTaken || 0,
      submittedAt: new Date()
    });

    // Poblar información para la respuesta
    await result.populate('exam', 'title description subject');
    await result.populate('student', 'name email');

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error al enviar examen:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar examen',
      error: error.message 
    });
  }
};

// @desc    Obtener resultados del estudiante
// @route   GET /api/results/my-results
// @access  Private/Student
exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user._id })
      .populate('exam', 'title subject totalPoints')
      .sort({ submittedAt: -1 });

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Error al obtener resultados:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener resultados',
      error: error.message 
    });
  }
};

// @desc    Obtener resultado específico
// @route   GET /api/results/:id
// @access  Private
exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('exam')
      .populate('student', 'name email')
      .populate('answers.question');

    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: 'Resultado no encontrado' 
      });
    }

    // Verificar autorización
    if (req.user.role === 'student' && result.student._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'No autorizado para ver este resultado' 
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error al obtener resultado:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener resultado',
      error: error.message 
    });
  }
};

// @desc    Obtener resultados de un examen (para profesor)
// @route   GET /api/results/exam/:examId
// @access  Private/Teacher
exports.getResultsByExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    
    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: 'Examen no encontrado' 
      });
    }

    // Verificar que el profesor sea el dueño del examen
    if (exam.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'No autorizado' 
      });
    }

    const results = await Result.find({ exam: req.params.examId })
      .populate('student', 'name email')
      .sort({ submittedAt: -1 });

    // Calcular estadísticas
    const stats = {
      totalStudents: results.length,
      averageScore: results.length > 0 
        ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(2)
        : 0,
      averagePercentage: results.length > 0
        ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
        : 0,
      passedStudents: results.filter(r => r.isPassed).length,
      failedStudents: results.filter(r => !r.isPassed).length
    };

    res.json({
      success: true,
      count: results.length,
      stats,
      data: results
    });
  } catch (error) {
    console.error('Error al obtener resultados del examen:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener resultados del examen',
      error: error.message 
    });
  }
};

// @desc    Obtener estadísticas generales (Dashboard del profesor)
// @route   GET /api/results/stats/dashboard
// @access  Private/Teacher
exports.getDashboardStats = async (req, res) => {
  try {
    // Obtener todos los exámenes del profesor
    const exams = await Exam.find({ teacher: req.user._id });
    const examIds = exams.map(exam => exam._id);

    // Obtener todos los resultados de esos exámenes
    const results = await Result.find({ exam: { $in: examIds } })
      .populate('exam', 'title')
      .populate('student', 'name');

    // Calcular estadísticas
    const stats = {
      totalExams: exams.length,
      activeExams: exams.filter(e => e.isActive).length,
      totalSubmissions: results.length,
      averageScore: results.length > 0
        ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
        : 0,
      recentSubmissions: results.slice(0, 5)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas',
      error: error.message 
    });
  }
};
