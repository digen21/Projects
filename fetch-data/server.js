const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
// const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/dbc');

const dbcSchema = {
    name: String,
    email: String,
    phno: Number,
    password: String
}

const dbcTable = mongoose.model('users', dbcSchema);

app.get('/', (req, res) => {
    dbcTable.find({}, function(err, data) {
        res.render('index', {
            dataList: data
        })
    })
})

app.listen(4000, function() {
    console.log('server is running');
});