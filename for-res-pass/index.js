const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//Solid Data
// let user = {
//     id: "sdsghdshdgsd",
//     email : "example@gmail.com",
//     password: "sasasasasw2www; ghsagsasahasqw"
// }


//Using MongoDB Data
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




const JWT_SECRET = "Some Super Secret....";

app.get('/', (req, res) => {
    user.find({}, function (err, data) {
        res.render('index', {
            dataList: data
        })
    });
});




app.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});



app.post('/forgot-password', (req, res, next) => {
    const { email } = req.body;
    console.log(email);                 //Getting Email from the use input


    //Check if the User With That Email Is Exists Or Not In Database
    user.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err.message);
        }
        if (!user) {
            console.log("User Is Not Exists");
        }

        const secret = JWT_SECRET + user.password;

        const payload = {
            id: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, secret, { expiresIn: '60s' });
        const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
        console.log(link);
        res.send("Link Has Ben Sent...");
    });
});



// ------------------------------------------------------------------------------
app.get('/reset-password/:id/:token', (req, res) => {

    const { id, token } = req.params;
    // res.send(req.params);    


    //Verifying The Token(Id is Exists In Database or not)
    // user.findOne({id : req.body._id}, (err, user) =>{
    //     if(id !== user.id){
    //         console.log("User Not Exists")
    //     }
    // })

    user.findOne({ id: req.body._id }, (err, user) => {
        if (!user) {
            res.send("Invalid Id");
            return;
        }
        const secret = JWT_SECRET + user.password;
        //if valid user and id
        try {
            const payload = jwt.verify(token, secret);              //If JWT verify failed to verify catch black Will be executed
            res.render('reset-password', { email: user.email });  //If no error found it will render to reset-password form
        } catch (error) {
            console.log(error.message + "Something Wrong");
            res.send(error.message + "Make Another Request");
        }


    })
})
// if(id !== user._id){
//     res.send("Invalid Id");
//     return;
// }

app.post('/reset-password/:id/:token',async (req, res) => {
    const { id, token } = req.params;
    // res.send(user);

    const { password, password2 } = req.body;

    const data= await user.findOne({_id:id});
    //first call the id from the database  
    // user.findOne({ _id: id }, async (err, data) => {
    //     if (!data) {
    //         res.send("Invalid Id");
    //         return;
    //     }

    //Validating Token
    const secret = JWT_SECRET + data.password;
    try {
        const payload = jwt.verify(token, secret);

        //validating password
        //finding user with email  and id and updating password
        //Hashing The Password

//--------------------Not Working(Almost There)--------------------


        // const updatePass =  async () =>{
            let a = await user.updateOne({ 
                _id: data._id            //old password
            },
                {$set : {
                    password: req.body.password  //pushing new password
                }});
            // console.log(a,{ 
            //     password: user.password             //old password
            // },
            //     {$set : {
            //         password: req.body.password  //pushing new password
            //     }});
            // console.log("ID: -" + id)
            // console.log(user);
            res.send("Updated");
            
    //     }
    // updatePass();

    // Password Is Matched But Not Updating In Database

//------------------------------------------------------------------------------

    // const updatePass = async (id, password) =>{
    //     const updates = password;
    //     // console.log("user: " + user);
    //     console.log("ID" + id)
    //     const opt = {new : true};

    //     const result = await user.findByIdAndUpdate(id, updates, opt);
    //     if(!result){
    //         console("Error")
    //     }
    // res.send(result);
    // }
    // updatePass();

// res.send(user);

    } catch (error) {
        console.error(error.message);
    }

    })




app.listen(3000, ()=>{console.log((`🚀 http://localhost:${3000} ` ))});



//90% Completed....