const express = require('express');
const router = express.Router();
const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  toggleExamStatus
} = require('../controllers/examController');
const { protect, teacherOnly } = require('../middleware/auth');

// Rutas protegidas - Todos los usuarios autenticados
router.get('/', protect, getExams);
router.get('/:id', protect, getExamById);

// Rutas protegidas - Solo profesores
router.post('/', protect, teacherOnly, createExam);
router.put('/:id', protect, teacherOnly, updateExam);
router.delete('/:id', protect, teacherOnly, deleteExam);
router.patch('/:id/toggle-active', protect, teacherOnly, toggleExamStatus);

module.exports = router;
