const Question = require('../models/Question');
const Exam = require('../models/Exam');

// @desc    Agregar pregunta a un examen
// @route   POST /api/questions
// @access  Private/Teacher
exports.createQuestion = async (req, res) => {
  try {
    const { examId, questionText, questionType, options, correctAnswer, points, order } = req.body;

    // Verificar que el examen existe
    const exam = await Exam.findById(examId);
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
        message: 'No autorizado para agregar preguntas a este examen' 
      });
    }

    const question = await Question.create({
      exam: examId,
      questionText,
      questionType,
      options,
      correctAnswer,
      points,
      order: order || 0
    });

    // Agregar pregunta al array de preguntas del examen
    exam.questions.push(question._id);
    await exam.save();

    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error al crear pregunta:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear pregunta',
      error: error.message 
    });
  }
};

// @desc    Obtener todas las preguntas de un examen
// @route   GET /api/questions/exam/:examId
// @access  Private
exports.getQuestionsByExam = async (req, res) => {
  try {
    const questions = await Question.find({ exam: req.params.examId }).sort({ order: 1 });

    // Si es estudiante, no mostrar respuestas correctas
    if (req.user.role === 'student') {
      const questionsWithoutAnswers = questions.map(q => {
        const questionObj = q.toObject();
        if (questionObj.questionType === 'multiple-choice' || questionObj.questionType === 'true-false') {
          questionObj.options = questionObj.options.map(opt => ({
            text: opt.text,
            _id: opt._id
          }));
        }
        delete questionObj.correctAnswer;
        return questionObj;
      });
      return res.json({
        success: true,
        count: questionsWithoutAnswers.length,
        data: questionsWithoutAnswers
      });
    }

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener preguntas',
      error: error.message 
    });
  }
};

// @desc    Obtener una pregunta por ID
// @route   GET /api/questions/:id
// @access  Private/Teacher
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('exam');

    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pregunta no encontrada' 
      });
    }

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error al obtener pregunta:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener pregunta',
      error: error.message 
    });
  }
};

// @desc    Actualizar una pregunta
// @route   PUT /api/questions/:id
// @access  Private/Teacher
exports.updateQuestion = async (req, res) => {
  try {
    let question = await Question.findById(req.params.id).populate('exam');

    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pregunta no encontrada' 
      });
    }

    // Verificar que el profesor sea el dueño del examen
    if (question.exam.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'No autorizado para actualizar esta pregunta' 
      });
    }

    question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error al actualizar pregunta:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar pregunta',
      error: error.message 
    });
  }
};

// @desc    Eliminar una pregunta
// @route   DELETE /api/questions/:id
// @access  Private/Teacher
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('exam');

    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pregunta no encontrada' 
      });
    }

    // Verificar que el profesor sea el dueño del examen
    if (question.exam.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'No autorizado para eliminar esta pregunta' 
      });
    }

    // Remover pregunta del array del examen
    await Exam.findByIdAndUpdate(
      question.exam._id,
      { $pull: { questions: question._id } }
    );

    await question.deleteOne();

    res.json({
      success: true,
      message: 'Pregunta eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar pregunta:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar pregunta',
      error: error.message 
    });
  }
};
