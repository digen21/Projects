
const mongoose = require('mongoose');
const express = require('express');
const ejs = require('ejs');
const app = express();
const jwt = require('jsonwebtoken');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');

//database connection

mongoose.connect('mongodb://localhost:27017/bloodbank');
const db = mongoose.connection;

db.on('error', ()=> console.log("Error Occured: "));
db.once('open', ()=> console.log("Connected to database "));


// Database Schema //solid value
const user = {
    email : "digen@gmail.com"
}

const userSchema = new mongoose.Schema({
    email : String
});

const userTable = mongoose.model('students', userSchema)

app.get('/forgot-password', (req, res) => {
    userTable.find({}, function(err, data) {
        res.render('forgot-password', {
            dataList: data
        })
    })
})

app.post('/forgot-password', (req, res) => {
    userTable.findOne({email : req.body.email}, (err, user)   =>{
        if(err){
            console.log(err);
        }
        if(user){
            console.log("User Already Exists");
        }
        else{
            console.log("User Nor Exists");
        }
    })
})



app.listen(5000);
