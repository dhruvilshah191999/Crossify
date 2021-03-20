var express = require('express');
var auth = require('../middleware/auth');
var mongoose = require('mongoose');
var category_details = require('../modules/interest_category');
var event_details = require('../modules/event_details');
var user_details = require('../modules/user_details');
var club_details = require('../modules/club_details');
const { ObjectID, ObjectId } = require('bson');
const { json } = require('express');
const { update } = require('../modules/interest_category');
var router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

const hostEmail ="bjkanodiya42gmail.com";
const hostPassword = "Bhargav42@";

const hostAccount = {
    user: hostEmail,
    pass: hostPassword,
};

const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: hostAccount.user,
        pass: hostAccount.pass,
    },
});
const sendEmail = async (dstemail,message) => {
    try {
        const info = await transpoter.sendMail({
            from: hostEmail,
            to: dstemail,
            subject: `You are Invited !!!`,
            text: 'You are receiving this because you have requested to join event by event organizer.\n\n message:'+message +'If you would like to know more please login to crossify.com\n'
        });
        //    console.log(info.messageId);
        //    console.log("Preview URL : ", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log("Error Sending Mail", error);
    }
};
router.post('/general-update',async function(req,res,next) {
    var {
        event_id,
        user_id,
        event_name,
        privacy,
        address,
        city,
        state,
        latitude,
        longitude,
        starting_date,
        starting_time,
        ending_date,
        ending_time }=req.body;
    var startdate = new Date(starting_date + ' ' + starting_time); 
    var date = new Date(ending_date + ' ' + ending_time); 
    var check =  event_details.update(
    {
        _id:ObjectId(event_id),
        organizer_id:ObjectId(user_id)
    },{
        event_name:event_name,
        visibility:privacy,
        location:address,
        city,
        state,
        longitude,
        latitude,
        startdate,
        date
    });
    console.log(check);
    await check.exec((error,data)=>{
        console.log(error);
        console.log(data);
        if(error){
            var error = {
                is_error: true,
                message: error.message,
              };
              return res.status(400).send(error);
        }
        else if(data){
        
            var finaldata ={
                is_error:false,
                message: "value updated succesfully"
            };
            return res.status(200).send(finaldata);
        }
        else {
            var error={
                is_error:true,
                message: "wrong event id or you may not have access to update "
            };
            return res.status(404).send(error);
        }
    });

})
router.post('/details-update',async function(req,res,next) {
    var {
        event_id,
        user_id,
        photo,
        description,
        eligibility,
        tags } =req.body;
   
    var check = event_details.findOneAndUpdate(
    {
        _id:ObjectId(event_id),
        organizer_id:ObjectId(user_id)
    },{
        photo,
        description,
        eligibility,
        $push:{tags}
        
    });
    console.log(check);
    await check.exec((error,data)=>{
        if(error){
            var error = {
                is_error: true,
                message: error.message,
              };
              return res.status(400).send(error);
        }
        else if(!data){
            var error={
                is_error:true,
                message: "wrong event id or you may not have access to update "
            };
            return res.status(404).send(error);
            
        }
        else {
            
            var finaldata ={
                is_error:false,
                message: "value updated succesfully"
            };
            return res.status(200).send(finaldata);
        }
    });

})
router.post("/Status_Update", async function (req, res, next)
{
    var {
        event_id,
        user_id,
        status
    } = req.body;

    var check = event_details.findOneAndUpdate(
        { _id: ObjectId(event_id), participants_list: { $in: { user: ObjectId(user_id) } } },
        {
            $set: {"participants_list.$.status": status}
        })
    
    await check.exec((err, data) =>
    {
        if (err) {
            var err = {
                is_error: true,
                message: err.message,
            };
            return res.status(500).send(err);
        }
        else if(data){        
            var finaldata ={
                is_error:false,
                message: "value updated succesfully"
            };
            return res.status(200).send(finaldata);
        }
        else {
            var err={
                is_error:true,
                message: "wrong event id or you may not have access to update "
            };
            return res.status(404).send(err);
        }
    });
});
router.post('/publish',async function(req,res,next){
    var {event_id,questions}= req.body;
    //var n=question.length;
    console.log(questions)
    
    var check = event_details.updateMany({
        _id:ObjectId(event_id),
       
        
    },{$set:{"faq.$[elem].privacy":"public"}},{
        multi: true,
        arrayFilters: [ { "elem.question": {$in:questions} } ]
      }) 
    await check.exec((error,data)=>{

        if (error) {
            var err = {
                is_error: true,
                message: error.message,
            };
            return res.status(500).send(err);
        }
        else if(data){
           var finaldata = {
               is_error:false,
               message:"value has been updated"
           }
           return res.status(200).send(finaldata);
        }
        else {
            
            var err={
                is_error:true,
                message: "wrong event details"
            };
            return res.status(404).send(err);
        }
    })
    
})
router.post('/canceled',async function(req,res,next){
    var {event_id,user_id}= req.body;
    var check = event_details.findOneAndUpdate({
        _id:ObjectId(event_id)
        
    })
})
router.post('/privatise',async function(req,res,next){
    var {event_id,questions}= req.body;
    //var n=question.length;
    console.log(questions)
    
    var check = event_details.updateMany({
        _id:ObjectId(event_id),
       
        
    },{$set:{"faq.$[elem].privacy":"privatise"}},{
        multi: true,
        arrayFilters: [ { "elem.question": {$in:questions} } ]
      }) 
    await check.exec((error,data)=>{

        if (error) {
            var err = {
                is_error: true,
                message: error.message,
            };
            return res.status(500).send(err);
        }
        else if(data){
           var finaldata = {
               is_error:false,
               message:"value has been updated"
           }
           return res.status(200).send(finaldata);
        }
        else {
            
            var err={
                is_error:true,
                message: "wrong event details"
            };
            return res.status(404).send(err);
        }
    })
    
})
router.post('/reject',async function(req,res,next){
    var {event_id,questions}= req.body;
    
    
    var check = event_details.updateMany({
        _id:ObjectId(event_id),
       
        
    },{$set:{"faq.$[elem].status":"rejected"}},{
        multi: true,
        arrayFilters: [ { "elem.question": {$in:questions} } ]
      }) 
    await check.exec((error,data)=>{

        if (error) {
            var err = {
                is_error: true,
                message: error.message,
            };
            return res.status(500).send(err);
        }
        else if(data){
           var finaldata = {
               is_error:false,
               message:"value has been updated"
           }
           return res.status(200).send(finaldata);
        }
        else {
            
            var err={
                is_error:true,
                message: "wrong event details"
            };
            return res.status(404).send(err);
        }
    })
    
})
router.post("/answer", async function (req, res,next)
{
    var {
        event_id,
        question,
        answer
    } = req.body;

    var check = event_details.findOneAndUpdate(
        { _id: ObjectId(event_id), "faq.question": question },
        { $Set: { "faq.$.answer": answer } }
    )

    await check.exec((err, data) =>
    {
        if (err) {
            var err = {
                is_error: true,
                message: err.message,
            };
            return res.status(500).send(err);
        }
        else if(data){        
            var finaldata ={
                is_error:false,
                message: "value updated succesfully"
            };
            return res.status(200).send(finaldata);
        }
        else {
            var err={
                is_error:true,
                message: "wrong event id or you may not have access to update "
            };
            return res.status(404).send(err);
        }
    });
});
router.get('/broadcast_message',async function(req,res,next){
    var {event_id,usersarray,message}= req.body;
    // var check = event_details.find({
    //     _id:event_id,
    //     "participants_list.user": { $in:usersarray } 
    // },{},{
    //     multi: true,
    //     arrayFilters: [ { "elem.participants_list": {$in:usersarray} } ]
    //   })
    await usersarray.forEach(element => {
        async()=>{
        var check = user_details.findOne({
            _id:ObjectId(element),

        })
        await check.exec((error,data)=>{
            if(error){
            var err = {
                is_error: true,
                message: error.message,
            };
            return res.status(500).send(err);
            }
            else if(data){
                var dstemail= data.email;
                sendEmail(dstemail,message);
                var finaldata={
                    is_error:false,
                    message:"mail sent"
                }
                return res.status(200).send(finaldata);
            }
    })
    }
    })
})
module.exports=router;