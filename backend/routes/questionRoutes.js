const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getQuestionsByExam,
  getQuestionById,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questionController');
const { protect, teacherOnly } = require('../middleware/auth');

// Rutas protegidas - Usuarios autenticados pueden ver preguntas
router.get('/exam/:examId', protect, getQuestionsByExam);
router.get('/:id', protect, getQuestionById);

// Rutas protegidas - Solo profesores pueden modificar
router.post('/', protect, teacherOnly, createQuestion);
router.put('/:id', protect, teacherOnly, updateQuestion);
router.delete('/:id', protect, teacherOnly, deleteQuestion);

module.exports = router;
