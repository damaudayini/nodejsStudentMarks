const student = require("../models/students");
const constants = require("../constants");

const addStudent = async (req, res, next) => {
  try {
    const { name, studentId } = req.body;
    if (!name || !studentId) {
      res.status(400);
      throw new Error(constants.STUDENT_DETAILS_NOT_PROVIDED);
    }

    const existingStudent = await student.findOne({ studentId });
    if (existingStudent) {
      res.status(400);
      throw new Error(constants.STUDENT_ALREADY_EXISTS);
    }

    const stud = await student.create({ name, studentId });
    res.status(201).json({ student: stud });
  } catch (err) {
    next(err);
  }
};

const getStudents = async (req, res) => {
  const students = await student.find({});
  res.status(200).json({ students });
};

const getStudentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let stud;
    try{
      stud = await student.findById(id);
    }catch(err){
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }
   
    if (!stud) {
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }
    res.status(200).json({ student: stud });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const editStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    let existingStudent; 

    try{
      existingStudent = await student.findById(id);
    }catch(err){
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }
    
    if (!existingStudent) {
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }

    const updatedStudent = await student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ student: updatedStudent });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    let existingStudent;

    try{
     existingStudent = await student.findById(id);
    }catch(err){
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }
    
    if (!existingStudent) {
      res.status(404);
      throw new Error(constants.NO_STUDENT_EXISTS);
    }

    await student.deleteOne({ _id: req.params.id });
    res.status(200).json({ student: existingStudent });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  editStudent,
  deleteStudent,
};
