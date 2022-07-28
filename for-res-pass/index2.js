const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/dbc');
const db = mongoose.connection;

db.on('error', () => console.log("Error In Connection"));
db.once('open', () => console.log("Conncted With Database"));


//UserSchema

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String
});

const user = mongoose.model('users', userSchema);

const JWT_SECRET = "Some Secret";

//Data Is Perfectly Coming From The Database
app.get('/', (req, res) => {
    user.find({}, function (err, data) {
        res.render('index', {
            dataList: data
        })
    });
});

//Rendering To Forgot Password Page
app.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});


app.post('/forgot-password', (req, res) => {

    //The Email Entered By User Perfectly Coming In Console
    const {email} = req.body;
    console.log(req.body);

    
    //Now Finding That Particular Email In Database

    user.findOne({email:  req.body.email}, (err, data)=>{
        if(!data){
            console.log("User Not Exists");
        }

                                                        //If Error Use user here
        const secret = JWT_SECRET + data.password;

        const payload = {
            id: data._id,
            email : data.email
        }

        const token = jwt.sign(payload, secret, {expiresIn: '1min'});
        const link = `http://localhost:3000/reset-password/${data._id}/${token}`;
        console.log(link);
        res.send("Link Has been sent...");          //Upto Here Working Properly.....
    });

})

app.get('/reset-password/:id/:token', (req, res) => {

    const { id, token } = req.params;
    res.send(req.params);                   //Now Id And Token Perfectly Coming In Console

    user.findOne({ id: req.body._id},(err, data)=>{
        if(!data){
            console.log("Invalid Id");
            return;
        }

        const secret = JWT_SECRET + user.password;
        try {
            const payload =  jwt.verify(token, secret)
            res.render('reset-password', {email: user.email});
        } catch (error) {
            console.log(error.message);
        }
    });
});


app.post('/reset-password/:id/:token', (req, res)=>{
    const {id , token} = req.params;
    // console.log(user);

    const {password, password2} = req.body;

    user.findOne({_id: id}, (err, data)=>{
        if(!data){
            console.log("Invalid Id");
            return;
        }

        const secret = JWT_SECRET + data.password;
        try {
            const payload = jwt.verify(token, secret);

            const updatePass = async ()=>{
                let data = await user.updateOne({
                    password: user.password
                },{$set:{
                    password: req.body.password
                }});
                console.log(data);
                console.log("Id: " + id);
                res.send("Updated");
            }
            updatePass();


        } catch (error) {
            console.log(error.message);
        }

    });
});

app.listen(3000, ()=>{console.log((`@ http://localhost:${3000}`))});
