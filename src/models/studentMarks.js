const mongoose = require("mongoose");

const studentMarksSchema = mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("studentMarks", studentMarksSchema);
