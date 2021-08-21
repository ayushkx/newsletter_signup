const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const request=require('request');
 const https=require('https');
 app.use(bodyparser.urlencoded({extended:true}));

 app.use(express.static("public"));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    
   const firstname= req.body.fname;
   const lastname= req.body.lname;
    const email=req.body.email;
   const data={
   	members:[
   	{
   		email_address:email,
   		status:"subscribed",
   		merge_fields:{
   			FNAME:firstname,
   			LNAME: lastname,
   		}
   	}
   	]
   };

    const jsondata=JSON.stringify(data);

    const url="https://us10.api.mailchimp.com/3.0/lists/7687ab690d";
    const options={
    	method:"POST",
    	auth:"your api key here"
    }
    const request=https.request(url,options,function(response){
        if (response.statusCode===200){
          res.sendFile(__dirname+"/success.html");
        }
       else
       {
        res.sendFile(__dirname+"/failure.html");
       }
    	response.on("data",function(data){
    		console.log(JSON.parse(data));
    	});
    });

    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
	console.log("server started at 3000");
});
// 

