
const express = require("express");
const bodyParser =  require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get("/" , function(req,res){

    res.sendFile(__dirname+"/signUp.html");
});

app.post("/" , function(req,res){
   
    
    const firstName = req.body.Fname;
    const secondName = req.body.Lname;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                     FNAME: firstName,
                     LNAME: secondName 
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/3a1d9338ab";
    const options = {
        method: "POST",
        auth: "sumit1:a65b49127d56043c4eb1b923387605d5-us20"
    }

   const request = https.request(url , options , function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/posiitve.html");
        } else {
            res.sendFile(__dirname+"/negative.html");
        }
         response.on("data" , function(data){
             console.log(JSON.parse(data));
         })

    });

    request.write(jsonData);
    request.end();
    
});

app.listen(process.env.PORT || 3000 , function() {
    console.log("You are Running ");

});


//api key
//a65b49127d56043c4eb1b923387605d5-us20


//Audience ID
//3a1d9338ab