const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type: 'string',
        required: true
    },
    
    number:{
        type: 'number',
        required: true,
        maxLength: 10
    }, 
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    status:{
        type:"string",
        enum:["approved","pending","rejected"],
        default: "pending"
    }

});

module.exports = mongoose.model('student', userSchema);