const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const router = express.Router()

// -------Connecting models------------

require("../models/User");
let User = mongoose.model("User");

// ------------Routes---------------

router.get("/login", (req,res) =>{
    res.render("login");
})
router.post("/", (request,response) => {
    let rand = Math.floor(Math.random()*10000)

    let user = new User({
        email:request.body.email,
        verify:"http://localhost:3000"+"/verify?id="+request.body.email+"/verify?id="+rand
    })
    user.save()
    .then((user) => {
        
        console.log(user);
        response.redirect(`/verify/email/${user._id}`);
    })
    .catch((err)=>{
        console.log(err);
        response.send("<h1>Something went wrong</h1>")
    })
})


router.get("/email/:id",(request,response) => {
    console.log(request.params.id)

    User.findById(request.params.id, function (error, data) {
        if(error){
            console.log(error)
        }else{
            try{
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'story.1book@gmail.com',
                      pass: 'artist317'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'story.1book@gmail.com',
                    to: data.email,
                    subject: 'Email verification magic link',
                    text: `Please verify your link ==> ${data.verify}  http://localhost:3000/verify/email/${data._id}`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }catch(error){
                console.log(error);
            }

        }
    })
    


})

router.post("/email/:id", (req,res) =>{
  User.findById(req.params.id, function(error, found){
    if(error){
      throw console.log(error)
    }else{
      console.log(found.verify)
      res.send("<h1>Ok verified</h1>")
    }
  })
})



  module.exports = router