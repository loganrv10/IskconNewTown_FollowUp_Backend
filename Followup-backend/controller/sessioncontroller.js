const express=require('express');
const sessionmodel=require('../models/sessionmodel');

// create session
module.exports.createSession=async function createSession(req,res){
try{
    let obj=req.body;
    // console.log(obj);
    let session=await sessionmodel.create(obj);
    if(session){
        res.status(200).send({
            data:session
        });
    }
    else{
        res.status(422).send({
            data:"error while creating Session"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//Update Session
module.exports.updateSession=async function updateSession(req,res){
try{
    let obj=req.body;
    console.log(obj);
    let id=req.params.id;

    let session=await sessionmodel.updateOne({_id:id},obj,{new:true});
    console.log(session);
    if(session){
        res.status(200).send({
            data:session
        });
    }
    else{
        res.status(422).send({
            data:"error while updating Session"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get All SessionList
module.exports.allSession=async function allSession(req,res){
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
    let session;

    if(search){
       const pattern = new RegExp(search, 'i');
       session=await sessionmodel.find({$or: [{topic:pattern}, {date:pattern}, {speaker:pattern}]}).skip(skip).limit(limit);
       totalCount= await sessionmodel.find({$or: [{topic:pattern}, {date:pattern}, {speaker:pattern}]}).countDocuments();
    }
    else{
       session=await sessionmodel.find(filterQuery).skip(skip).limit(limit);
       totalCount= await sessionmodel.find(filterQuery).countDocuments(); 
    }
    if(session){
        res.status(200).send({
            data:session,
            count:totalCount
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching session list"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get Detail of Particular session
module.exports.singleSession=async function singleSession(req,res){
try{
    let id=req.params.id;
    let session=await sessionmodel.find({_id:id});
    if(session){
        res.status(200).send({  
            data:session
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching Session Details" 
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}