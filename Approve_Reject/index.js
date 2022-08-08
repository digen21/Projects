const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/dbc');

const dbcSchema = {
    name: String,
    email: String,
    password: String,
    status: String,
}

const dbcTable =require('./model/userSchema')


//Fetching Data From The Database
app.get('/', (req, res) => {
    dbcTable.find({}, function(err, data) {
        res.render('index', {
            dataList: data
        });
    });
});

app.post('/approve', async(req, res) => {
    const id = req.body.id;
    const a = await dbcTable.updateOne({_id:id},{$set:{status: 'approved'}})
    res.send(a);

    
})

app.post('/reject', async(req, res) => {
    const id = req.body.id;
    const a = await dbcTable.updateOne({_id:id},{$set:{status: 'rejected'}})
    res.send(a);

    
})

app.get('/p',async(req, res) => {
    dbcTable.find({}, function(err, data) {
        res.render('patientpanel', {
            dataList: data
        });
    });
})



app.listen(4000, function() {
    console.log(`Server Is Running On http://localhost:${4000}`);
});