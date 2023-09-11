const subject = require("../models/subjects");
const constants = require("../constants");

const addSubject = async (req, res, next) => {
  try {
    const { subjectId, description } = req.body;

    if (!subjectId || !description) {
      res.status(400);
      throw new Error(constants.SUBJECT_DETAILS_NOT_PROVIDED);
    }

    const existingSubject = await subject.findOne({ subjectId });
    if (existingSubject) {
      res.status(400);
      throw new Error(constants.SUBJECT_ALREADY_EXISTS);
    }

    const sub = await subject.create({ subjectId, description });
    res.status(201).json({ subject: sub });
  } catch (err) {
    next(err);
  }
};

const getSubjects = async (req, res, next) => {
  const subjects = await subject.find({});
  res.status(200).json({ subjects });
};

const editSubject = async (req, res, next) => {
  try {
    const id = req.params.id;
    let existingSubject;

    try{
      existingSubject = await subject.findById(id);
    }catch(err){
      res.status(404);
      throw new Error(constants.NO_SUBJECT_EXISTS);
    }
     
    if (!existingSubject) {
      res.status(404);
      throw new Error(constants.NO_SUBJECT_EXISTS);
    }

    const updatedSubject = await subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ subject: updatedSubject });
  } catch (err) {
    next(err);
  }
};

const deleteSubject = async (req, res, next) => {
  try {
    const id = req.params.id;

    let existingSubject;

    try{
      existingSubject = await subject.findById(id);
    }catch(err){
      res.status(404);
      throw new Error(constants.NO_SUBJECT_EXISTS);
    }

    if (!existingSubject) {
      res.status(404);
      throw new Error(constants.NO_SUBJECT_EXISTS);
    }

    await subject.deleteOne({ _id: req.params.id });
    res.status(200).json({ subject: existingSubject });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addSubject,
  getSubjects,
  editSubject,
  deleteSubject,
};
