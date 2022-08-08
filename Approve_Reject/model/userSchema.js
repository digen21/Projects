const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

   
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

module.exports  =dbcTable= mongoose.model('users', userSchema);