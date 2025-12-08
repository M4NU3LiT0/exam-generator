const express = require('express');
const router = express.Router();
const {
  submitExam,
  getMyResults,
  getResultById,
  getResultsByExam,
  getDashboardStats
} = require('../controllers/resultController');
const { protect, studentOnly, teacherOnly } = require('../middleware/auth');

// Rutas protegidas - Estudiantes
router.post('/', protect, studentOnly, submitExam);
router.get('/my-results', protect, studentOnly, getMyResults);

// Rutas protegidas - Profesores
router.get('/stats/dashboard', protect, teacherOnly, getDashboardStats);
router.get('/exam/:examId', protect, teacherOnly, getResultsByExam);

// Rutas protegidas - Ambos roles
router.get('/:id', protect, getResultById);

module.exports = router;
