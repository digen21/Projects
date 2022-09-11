
//Declaration Section
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoSession = require('connect-mongodb-session')(session);


const mongoURI =  'mongodb://localhost:27017/finalproject';

//Database connection
// require('./config/dbConnect');

mongoose.connect(mongoURI, 
    { useNewUrlParser : true,
    useUnifiedTopology: true,}
    ).then(res =>{
        console.log("Connected")
    });



//Database Section
const patientModel = require('./models/patient/patient-register');
const patientLoginModel = require('./models/patient/patient-login');
// const { application } = require('express');






const PORT = process.env.PORT || 8080;



//Middleware Section
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname  + '/public'));


const Store = new mongoSession({
    uri: mongoURI,
    collection: 'sessions',
});

    //Session Middleware
    app.use(session({
        secret: 'Some Super Secret',
        resave: false,
        saveUninitialized: false,
        store: Store
    }));
    

    //Auth : No One Can Directly Access Dashboard
    const isAuth = (req, res, next) => {
        if(req.session.isAuth){
            next();
        }else{
            console.log("💩You have to login first💩");
            res.redirect('login');
        }
    };




//Landing Page
app.get('/', (req, res) => {
    
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);     //Telling Browser That Using Specific Session
    res.render('home');
});



app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', async(req, res) => {
    const {email, password} = req.body;


    const user = await patientModel.findOne({email});
    // const displayUser = await userModel.findOne({username});

    if(!user){
        req.session.error = "Invalid User Details";
        return res.redirect('/login');
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        req.session.error = "Invalid Password";
        return res.redirect('/login');
    }


    req.session.isAuth = true;
    // req.session.username = displayUser;
    res.redirect('dashboard');
    console.log(req.body);
});

app.get('/register', (req, res) => {
    // const error = req.session.error;
    // delete req.session.error;
    res.render('register');
});



app.post('/register', async(req, res) => {


    const {username, email, password, password2} = req.body;
    console.log(req.body);

    let user = await patientModel.findOne({email});

    if(user){
        req.session.error = "User Already Exists";
        return res.render('register');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = new patientModel({
        username,
        email,
        password: hashPassword,
        password2
    })

    await user.save();
    res.render('login');
    // console.log(req.body);
    console.log(user);
});


app.get('/dashboard', isAuth, async(req, res) => {
    res.render('dashboard')

});


app.post('/logout', (req, res) => {

    req.session.destroy((err)=>{
    if(err) throw err;
    res.redirect('/login')
    })
});







// //Routers Section
// app.get('/', (req, res) =>{
    
//     req.session.isAuth = true;
//     console.log(req.session);
//     console.log(req.session.id);
//     res.render('home');
// });



// //Registration Route
// app.get('/register', (req, res) => {
//     res.render('register');
// });

// //Data Adding With Authentication
// app.post('/register', async(req, res) =>{ 

//     const {username, email, password, password2} = req.body;
//     console.log(req.body);

//     let user = await patientModel.findOne({email});

//     if(user){
//         console.warn = "User Already Exists";
//         return res.render('register');
//     }


//     //Matching Password With Password2
//     if(password === password2){
//         console.error("Password is correct");

//         const hashPassword = await bcrypt.hash(password, 10);
//         const hashPassword2 = await bcrypt.hash(password2, 10);


//         user = new patientModel({
//             username,
//             email,
//             password: hashPassword,
//             password2: hashPassword2
//         });

//         await user.save();
//         res.render('login');
//         console.log(user);
        
//     }else{
//         console.error("Password is Not Matched");
//     }
// });



// //Login Route
// app.get('/login', (req, res) => {
//     res.render('login');
// });


// // app.post('/login', async(req, res) => {
// //     const {email, password} = req.body;
// //     const user = await patientModel.findOne({email})
// //     const isMatch = await bcrypt.compare(password, user.password);


// //     if(!user){
// //         req.session.error = "Invalid User Details";
// //         // return res.redirect('login');
// //     }
// //     if(!isMatch){
// //         req.session.error = "Invalid Password";
// //         // return res.redirect('login');
// //     }
// //     req.session.isAuth = true;
// //     res.redirect('dash');
// // });


// // app.post('/login', async(req, res)=>{
// //     const {email, password} = req.body;

// //     const user = await patientModel.findOne({email});
// //     if(!user){
// //         return res.redirect('/login');
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if(!isMatch){
// //         res.redirect('/dashboard')
// //     }
// // });


// app.post('/login', async(req, res) => {
//     const {email, password} = req.body;


//     const user = await patientModel.findOne({email});
//     // const displayUser = await userModel.findOne({username});

//     if(!user){
//         req.session.error = "Invalid User Details";
//         return res.redirect('/login');
//     }


//     const isMatch = await bcrypt.compare(password, user.password);

//     if(!isMatch){
//         req.session.error = "Invalid Password";
//         return res.redirect('/login');
//     }


//     req.session.isAuth = true;
//     // req.session.username = displayUser;
    


//     res.redirect('dashboard');
//     console.log(req.body);
// });


// app.get('/dashboard',isAuth,(req, res) => {
//     res.render('dashboard');

// });



// app.post('/logout', (req, res) => {

//     req.session.destroy((err)=>{
//     if(err) throw err;
//     res.redirect('/login')
//     })
// });






// //404 Error Page
// app.use((req, res, next) => {
//     res.status(404).send(
//         "<h1> 😭Page not found on the server... 😭</h1>"
//         );
// })



app.listen(PORT, console.log(`The Port Is Running On http://localhost:${PORT}`));