const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
        name:{
            type: String,
            required: true,

        },
        studentId:{
            type: String,
            required: true,
        },

    
})

module.exports = mongoose.model('students', studentSchema);