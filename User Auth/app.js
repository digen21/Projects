const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); 
const homeRouter = require('./routers/homeRouter');
const app = express();
const port = process.env.PORT || 8080;


app.set('view engine', 'ejs');              //Created To Run HTML File

app.use(express.static('public'));          //Linking Public File


// Database Connection
mongoose.connect('mongodb://localhost:27017/bloodbank',{useNewUrlParser: true});
const db = mongoose.connection;


//Checking For The Connection
db.on('error', ()=> console.log('Error Connected!!!'));
db.once('open', ()=> console.log('Connected With Database Successfully...')); 






app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use('/', homeRouter);                   //Using The Data From homeRouter.j



// app.get('/', (err, res)=>{               //Checking
//     // res.send('hello');
// });

app.listen(port);

