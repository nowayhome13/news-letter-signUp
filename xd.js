//Template for Express, Body-Parser 


const express = require("express");
const bodyParser =  require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/" , function(req,res){

    res.send("<h1>success code : 200</h1>");
});



app.listen(3000,function(){
    console.log("You are Running on port 3000;");
});


