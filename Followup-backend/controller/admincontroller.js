const express=require('express');
const adminmodel=require('../models/adminmodel');
const {sendmail} =require("../emailUtility/nodeMailer");

// Add Cordinator
module.exports.addCordinate=async function addCordinate(req,res){
try{
    let obj=req.body;
    // console.log(obj);
    let user=await adminmodel.create(obj);
    if(user){
        const resetToken=user.createReastToken();
        await user.save();
        //http://abcd.com/resetpassword/resetToken
        let resetPasswordLink=`${req.protocol}://${req.get('host')}/admin/resetpassword/${resetToken}`;
        user.resetPasswordLink=resetPasswordLink;
        let mailConfirmation=await sendmail("resetpassword",user);
        console.log(mailConfirmation);
        res.status(200).send({
            data:user,
            mailStatus:mailConfirmation.data
        });
    }
    else{
        res.status(422).send({
            data:"error while adding User",
            mailStatus:mailConfirmation.data
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//Update Devotee
module.exports.updateCordinate=async function updateCordinate(req,res){
try{
    let obj=req.body;
    console.log(obj);
    let id=req.params.id;

    let user=await adminmodel.updateOne({_id:id},obj,{new:true});
    console.log(user);
    if(user){
        res.status(200).send({
            data:user
        });
    }
    else{
        res.status(422).send({
            data:"error while updating Cordinator"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get All DevoteeList
module.exports.allCordinate=async function allCordinate(req,res){
try{
    console.log(req.query);
    let limit =req.query.limit?parseInt(req.query.limit):5;
    let page = req.query.page?parseInt(req.query.page):1;
    let filterKey=req.query.filterkey?req.query.filterkey:null;
    let filterValue=req.query.filtervalue?req.query.filtervalue:null;
    let search=req.query.search?req.query.search:null;
    let filterQuery;
    if(filterKey && filterKey=="level"){
        filterValue=parseInt(filterValue);
        filterQuery = { [filterKey]: filterValue };
    }
    else if(filterKey){
        const pattern = new RegExp(filterValue, 'i');
        filterQuery = { [filterKey]: { $regex: pattern } };
    }
    let skip=(page-1)*limit;

    let totalCount;
    let cordinate;

    if(search){
       const pattern = new RegExp(search, 'i');
       cordinate=await adminmodel.find({$or: [{name:pattern}, {phone:pattern}, {registered_by:pattern}]}).skip(skip).limit(limit);
       totalCount= await adminmodel.find({$or: [{name:pattern}, {phone:pattern}, {registered_by:pattern}]}).countDocuments();
    }
    else{
       cordinate=await adminmodel.find(filterQuery).skip(skip).limit(limit);
       totalCount= await adminmodel.find(filterQuery).countDocuments(); 
    }
    if(cordinate){
        res.status(200).send({
            data:cordinate,
            count:totalCount
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching devotee list"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get Detail of Particular cordinate
module.exports.singleCordinate=async function singleCordinate(req,res){
try{
    let id=req.params.id;
    let user=await adminmodel.find({_id:id});
    if(user){
        res.status(200).send({  
            data:user
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching Devotee Details" 
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//update Level of multiple Cordinator
module.exports.updateCordinateLevel=async function updateCordinateLevel(req,res){
try{
    let obj=req.body;
    let userIds=obj.id;
    let levels=obj.level;
    
    let users=await adminmodel.updateMany({_id:{ $in: userIds }},{ $set:{level:levels} },{new:true});
    console.log(users);
    if(users){
        res.status(200).send({
            data:users
        });
    }
    else{
        res.status(422).send({
            data:"error while updating Devotee"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get id and name of cordinate for select option
module.exports.CordinatezForSelect=async function CordinateForSelect(req,res){
try{
    let user=await adminmodel.find({},{name:1});
    if(user){
        res.status(200).send({  
            data:user
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching Devotees" 
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//Assign Devotee to Coordinator
module.exports.assignDevotee=async function assignDevotee(req,res){
try{
    let obj=req.body;
    console.log(obj);
    let id=req.params.id;
  
    let user=await adminmodel.updateOne({_id:id},{$push:{devotees:{$each:obj.devotee}}});
    console.log(user);
    
    if(user){
        res.status(200).send({
            data:user
        });
    }
    else{
        res.status(422).send({
            data:"error while removing Devotees"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//Deassign Devotee to Coordinator
module.exports.deassignDevotee=async function deassignDevotee(req,res){
try{
    let obj=req.body;
    console.log(obj);
    let id=req.params.id;
    
    let user;
    for(let i=0;i<obj?.devotee?.length;i++){
       user=await adminmodel.updateOne({_id:id},{$pull:{devotees:obj.devotee[i]}});
    } 
    console.log(user);
    if(user){
        res.status(200).send({
            data:user
        });
    }
    else{
        res.status(422).send({
            data:"error while removing Devotees"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//resetpassword for Cordinator
module.exports.resetpassword=async function resetpassword(req,res){
try{
    const token=req.params.token;
    let {password,confirmedpassword}=req.body;
    const admin=await adminmodel.findOne({resetToken:token});
    if(admin){
      //resetpasswordhandler will update users password in db
      admin.resetpasswordhandler(password,confirmedpassword);
      await admin.save();
      return res.status(200).send({
          data:"password updated successfully"
      })
    }
    else{
       return res.status(401).send({
           data:"cordinator not found"
       });
    }
}
catch(err){
    res.status(500).send({
        data:err
        })
    }
}

