const express = require('express');
const { addStudent, getStudents, getStudentById, editStudent, deleteStudent } = require('../services/students');
const router = express.Router();


router.route('/').post(addStudent);

router.route('/').get(getStudents);

router.route('/:id').get(getStudentById);

router.route('/:id').put(editStudent);

router.route('/:id').delete(deleteStudent);

module.exports = router;