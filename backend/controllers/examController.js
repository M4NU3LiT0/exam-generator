const Exam = require('../models/Exam');
const Question = require('../models/Question');

// @desc    Crear un nuevo examen
// @route   POST /api/exams
// @access  Private/Teacher
exports.createExam = async (req, res) => {
  try {
    const { title, description, subject, duration, totalPoints } = req.body;

    const exam = await Exam.create({
      title,
      description,
      subject,
      duration,
      totalPoints: totalPoints || 100,
      teacher: req.user._id
    });

    res.status(201).json({
      success: true,
      data: exam
    });
  } catch (error) {
    console.error('Error al crear examen:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear examen',
      error: error.message 
    });
  }
};

// @desc    Obtener todos los exámenes (del profesor o disponibles para estudiante)
// @route   GET /api/exams
// @access  Private
exports.getExams = async (req, res) => {
  try {
    let exams;
    
    if (req.user.role === 'teacher') {
      // Profesor ve solo sus exámenes
      exams = await Exam.find({ teacher: req.user._id })
        .populate('questions')
        .populate('teacher', 'name email')
        .sort({ createdAt: -1 });
    } else {
      // Estudiante ve todos los exámenes activos
      exams = await Exam.find({ isActive: true })
        .populate('teacher', 'name email')
        .select('-questions') // No mostrar preguntas en la lista
        .sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    console.error('Error al obtener exámenes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener exámenes',
      error: error.message 
    });
  }
};

// @desc    Obtener un examen por ID
// @route   GET /api/exams/:id
// @access  Private
exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate('questions')
      .populate('teacher', 'name email');

    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: 'Examen no encontrado' 
      });
    }

    // Si es estudiante, no mostrar respuestas correctas
    if (req.user.role === 'student') {
      const questionsWithoutAnswers = exam.questions.map(q => {
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
      exam.questions = questionsWithoutAnswers;
    }

    res.json({
      success: true,
      data: exam
    });
  } catch (error) {
    console.error('Error al obtener examen:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener examen',
      error: error.message 
    });
  }
};

// @desc    Actualizar un examen
// @route   PUT /api/exams/:id
// @access  Private/Teacher
exports.updateExam = async (req, res) => {
  try {
    let exam = await Exam.findById(req.params.id);

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
        message: 'No autorizado para actualizar este examen' 
      });
    }

    exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: exam
    });
  } catch (error) {
    console.error('Error al actualizar examen:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar examen',
      error: error.message 
    });
  }
};

// @desc    Eliminar un examen
// @route   DELETE /api/exams/:id
// @access  Private/Teacher
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

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
        message: 'No autorizado para eliminar este examen' 
      });
    }

    // Eliminar todas las preguntas asociadas
    await Question.deleteMany({ exam: req.params.id });

    await exam.deleteOne();

    res.json({
      success: true,
      message: 'Examen eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar examen:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar examen',
      error: error.message 
    });
  }
};

// @desc    Activar/Desactivar un examen
// @route   PATCH /api/exams/:id/toggle-active
// @access  Private/Teacher
exports.toggleExamStatus = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

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

    exam.isActive = !exam.isActive;
    await exam.save();

    res.json({
      success: true,
      data: exam
    });
  } catch (error) {
    console.error('Error al cambiar estado del examen:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cambiar estado del examen',
      error: error.message 
    });
  }
};
