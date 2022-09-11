const mongoose = require('mongoose');


const patientLoginSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

const patientLoginModel = new mongoose.model('patient-login', patientLoginSchema);
module.exports = patientLoginModel;