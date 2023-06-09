//jshint esversion: 6

const express = require("express");
const bodyParser=require("body-parser");
const requests=require("requests");
const https=require("https")


const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){

    const firstName=req.body.fName
    const lastName=req.body.lName
    const email=req.body.email

    const data={
        members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
    };

    const jsonData=JSON.stringify(data)

    const url='https://us11.api.mailchimp.com/3.0/lists/dff3ee1c2c';

    const options={
        method:'POST',
        auth: "pranav:7db88096fbd3c44f2e175093917f8a22-us11"

    };

    const request= https.request(url,options, function(response){

        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        } else{
            res.sendFile(__dirname+"/failure.html" )
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        });
    });
    
    request.write(jsonData);
    request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/")
})






// API Key: 7db88096fbd3c44f2e175093917f8a22-us11


// list id :dff3ee1c2c.




app.listen(3000,function(){
    console.log("Your app is running on port 3000")
});