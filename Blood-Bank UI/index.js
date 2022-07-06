var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
bodyParser.urlencoded({
    extended: true,
})
);

mongoose.connect("mongodb://localhost:27017/bloodbank");

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));




app.post("/sign_up", (req, res) => {
    const name = req.body.uname;
    const password = req.body.password;

    const data = {
    uname: name,
    password: password,
    };

    db.collection("blood").insertOne(data, (err, collection) => {
    if (err) {
        throw err;
    }
    console.log("Record Inserted Successfully");
    });

    return res.redirect("success.html");
});


app.get("/", (req, res) => {
    res.set({
    "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("admin.html");
});


//Patient Information


app.post("/send",(req,res)=>{
    const name = req.body.name;
    const phno = req.body.phno;
    const add = req.body.add;
    const gender = req.body.gender;
    const age = req.body.age;
    const bg = req.body.bg;
    const disease = req.body.disease;
    const password = req.body.password;

    const data = {
        "pname": name,
        "phone": phno,
        "address": add,
        "gender": gender,
        "age": age,
        "bloodgroup": bg,
        "disease": disease,
        "password" : password
    }

    db.collection('patientinfo').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('patientreq.html');
})
app.listen(4000);


console.log("Listening on PORT 4000");
