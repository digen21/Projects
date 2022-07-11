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

db.on('error', ()=> console.log('error'));
db.once('open', ()=> console.log('Connected to database')); 


//Database Schema

const userSchema = new mongoose.Schema({
    // name: String,
    // number: Number,
    email: String,
    // password: String
});

const userColl = mongoose.model('students', userSchema);

const user = {
    email : "digen@gmail.com"
}

// app.get('/', (req, res) => {
//     res.send("gello")
// })

app.get('/forgot-password', (re1, res, next)=>{
    res.render('forgot-password')
});

app.post('/forgot-password', (req, res, next)=>{
    const {email} = req.body;
    // res.send(email);
    // console.log(email)
    if(email !== userColl.email){
        console.log('not existing')
    }
    else{
        console.log('exist')
    }


})

app.get('/reset-password', (re1, res, next)=>{
    
})

app.post('/reset-password', (re1, res, next)=>{
    
})

app.listen(5000);


