const express=require('express');
const usermodel=require('../models/usermodel');

// Add Devotee
module.exports.addDevotee=async function addDevotee(req,res){
try{
    let obj=req.body;
    console.log(obj);
    let user=await usermodel.create(obj);
    console.log(user);
    if(user){
        res.status(200).send({
            data:user
        });
    }
    else{
        res.status(422).send({
            data:"error while adding User"
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
module.exports.updateDevotee=async function updateDevotee(req,res){
try{
    let obj=req.body;
    console.log(obj);
    let id=req.params.id;

    let user=await usermodel.updateOne({_id:id},obj,{new:true});
    console.log(user);
    if(user){
        res.status(200).send({
            data:user
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

//get All DevoteeList
module.exports.allDevotee=async function allDevotee(req,res){
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
    let devotee;

    if(search){
       const pattern = new RegExp(search, 'i');
       devotee=await usermodel.find({$or: [{name:pattern}, {phone:pattern}, {registered_by:pattern}]}).skip(skip).limit(limit);
       totalCount= await usermodel.find({$or: [{name:pattern}, {phone:pattern}, {registered_by:pattern}]}).countDocuments();
    }
    else{
       devotee=await usermodel.find(filterQuery).skip(skip).limit(limit);
       totalCount= await usermodel.find(filterQuery).countDocuments(); 
    }
    if(devotee){
        res.status(200).send({
            data:devotee,
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

//get Detail of Particular Devotee
module.exports.singleDevotee=async function singleDevotee(req,res){
try{
    let id=req.params.id;
    let user=await usermodel.find({_id:id});
    if(user){
        res.status(200).send({  
            data:user
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching sloka" 
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//update Level of multiple Devotee
module.exports.updateDevoteeLevel=async function updateDevoteeLevel(req,res){
try{
    let obj=req.body;
    let userIds=obj.id;
    let levels=obj.level;
    
    let users=await usermodel.updateMany({_id:{ $in: userIds }},{ $set:{level:levels} },{new:true});
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

//update Grade of multiple Devotee
module.exports.updateDevoteeGrade=async function updateDevoteeGrade(req,res){
try{
    let obj=req.body;
    let userIds=obj.id;
    let grades=obj.grade;
    
    let users=await usermodel.updateMany({_id:{ $in: userIds }},{ $set:{grade:grades} },{new:true});
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

