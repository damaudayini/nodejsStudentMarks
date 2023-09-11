const studentMarks = require("../models/studentMarks");
const student = require("../models/students");
const subject = require("../models/subjects");
const constants = require("../constants");

const addStudentMarks = async (req, res, next) => {
  try {
    const { studentId, subjectId, marks } = req.body;
    let existingStudent;
    let existingSubject;

    if (!studentId || !subjectId || !marks) {
      res.status(400);
      throw new Error(constants.SUBJECT_MARKS_DETAILS_NOT_PROVIDED);
    }

    try{
      existingStudent = await student.findById(req.params.id);
    }catch(err){
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }

    
    if (!existingStudent) {
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }

    try{
      existingSubject = await subject.findOne({subjectId: req.body.subjectId});
    }catch(err){
      res.status(404);
      throw new Error(constants.NO_SUBJECT_EXISTS);
    }

     
    if (!existingSubject) {
      res.status(404);
      throw new Error(constants.NO_SUBJECT_EXISTS);
    }

    const existingMarks = await studentMarks.findOne({ studentId, subjectId });
    if (existingMarks) {
      res.status(400);
      throw new Error(constants.STUDENT_MARKS_ALREADY_EXISTS);
    }

    const studentMark = await studentMarks.create({ studentId, subjectId, marks });

    //calculate Rank
    res.status(201).json({ studentMarks: studentMark });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// const getSubjects = async (req, res) => {
//   const subjects = await subject.find({});
//   res.status(200).json({ subjects });
// };

const editStudentMarks = async (req, res, next) => {
  try {
    const { studentId, subjectId, marks } = req.body;

    if (!studentId || !subjectId || !marks) {
      res.status(400);
      throw new Error(constants.SUBJECT_MARKS_DETAILS_NOT_PROVIDED);
    }

    const existingStudent = await student.findById(req.params.id);
    if (!existingStudent) {
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }

    const existingSubject = await subject.findOne({subjectId: req.body.subjectId});
    if (!existingSubject) {
      res.status(404);
      throw new Error(constants.NO_SUBJECT_EXISTS);
    }

    const existingMarks = await studentMarks.findOne({ studentId, subjectId });
    if (!existingMarks) {
      res.status(400);
      throw new Error(constants.NO_STUDENT_MARKS_EXISTS);
    }
    
    const updatedStudentMarks = await studentMarks.findOneAndUpdate({ studentId, subjectId }, req.body, { new: true });

    res.status(200).json({ studentMarks : updatedStudentMarks });
  } catch (err) {
    next(err);
  }
};

const deleteStudentMarks = async (req, res, next) => {
  try {
    const { studentId, subjectId } = req.body;

    if (!studentId || !subjectId ) {
      res.status(400);
      throw new Error(constants.STUDENT_SUBJECT_DETAILS_NOT_PROVIDED);
    }

    const existingStudent = await student.findById(req.params.id);
    if (!existingStudent) {
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }

    const existingSubject = await subject.findOne({subjectId: req.body.subjectId});
    if (!existingSubject) {
      res.status(404);
      throw new Error(constants.NO_SUBJECT_EXISTS);
    }

    const existingMarks = await studentMarks.findOne({ studentId, subjectId });
    if (!existingMarks) {
      res.status(400);
      throw new Error(constants.NO_STUDENT_MARKS_EXISTS);
    }
    
    await studentMarks.deleteOne(existingMarks);

    res.status(200).json({ studentMarks : existingMarks });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  addStudentMarks,
  editStudentMarks,
  deleteStudentMarks,
};
