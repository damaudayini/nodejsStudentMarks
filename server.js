const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./src/config/dbConnect');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const port = process.env.PORT;

connectDB();
app.use(express.json());

app.use('/students/marks', require('./src/routes/studentMarksRouter'));
app.use('/students', require('./src/routes/studentRouter'));
app.use('/subjects', require('./src/routes/subjectRouter'));

app.use(errorHandler);

let server = app.listen(port, () => {
    console.log( `Server is running on port ${port}` );
});

module.exports = server