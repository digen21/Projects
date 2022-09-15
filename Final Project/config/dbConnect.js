const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/finalproject';

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', ()=>{
    console.error('Error In Database Connectivity');
})

db.once('open', ()=>{
    console.log("Connected Successfully");
});


module.exports = mongoose.connect;