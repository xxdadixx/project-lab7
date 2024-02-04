const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^[a-zA-Zก-๏\s]+$/.test(value),
            message: 'Invalid firstname format',
        },
    },
    lastname: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^[a-zA-Zก-๏\s]+$/.test(value),
            message: 'Invalid lastname format',
        },
    },
    studentID: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^[0-9]{11}-[0-9]$/.test(value),
            message: 'Invalid student ID format',
        },
    },
    faculty: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('class', ClassSchema);
