const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
        subjectId:{
            type: String,
            required: true,

        },
        description:{
            type: String,
            required: true,
        },    
})

module.exports = mongoose.model('subjects', subjectSchema);