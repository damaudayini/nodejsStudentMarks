const express = require('express');
const { addStudentMarks, editStudentMarks, deleteStudentMarks } = require('../services/studentMarks');
const router = express.Router();


router.route('/:id').post(addStudentMarks)
                  .put(editStudentMarks)
                  .delete(deleteStudentMarks);

module.exports = router;