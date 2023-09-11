const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://admin:admin123@cluster0.xf6wyvn.mongodb.net/student-marks');
        console.log('Connected to Database');

    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;
