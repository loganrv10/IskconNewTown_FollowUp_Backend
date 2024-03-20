const express=require('express');
const sessionmodel=require('../models/sessionmodel');
const usermodel = require('../models/usermodel');
const attendancemodel = require('../models/attendancemodel');

// create session
module.exports.createSession=async function createSession(req,res){
try{
    let obj=req.body;
    let sessionDB= await sessionmodel.findOne({date:obj.date,level:obj.level,branch:obj.branch});
    if(sessionDB){
        return(
        res.status(404).send({
            data:"This Session Already Exist"
        }))
    }
    let session=await sessionmodel.create(obj);
    let record=[];
    if(session){
        let devotee= await usermodel.find({"mode":true}).find({level:session.level,branch:session.branch},{name:1,phone:1,handled_by:1,level:1,branch:1});
        for(let i=0;i<devotee?.length;i++){
            let dataToInserted={
                status:"Pending",
                remark:"",
                devotee:devotee[i],
                session:session,
                sessionDate:session.date,
                sessionLevel:session.level,
                sessionBranch:session.branch,
                devoteePhone:devotee[i].phone,
                sessionId:session._id,
                devoteeId:devotee[i]._id
            }
            let attendance=await attendancemodel.create(dataToInserted);
            record.push(attendance);
        }
        console.log(record);
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
    if(obj.prevdate==obj.date && obj.prevlevel==obj.level){
       console.log("No need to Check for Dublicate Data in Table"); 
    }
    else{
        let sessionDB= await sessionmodel.findOne({date:obj.date,level:obj.level});
        if(sessionDB){
            return(
                res.status(404).send({
                data:"This Session Already Exist"
            }))
        }
    }
    newobj={
        topic:obj.topic,
        date:obj.date,
        level:obj.level,
        speaker:obj.speaker,
        desc:obj.desc
    }
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
    else if(filterKey && filterKey=="date"){
        filterQuery = { [filterKey]: filterValue };
    }
    else if(filterKey){
        const pattern = new RegExp(filterValue, 'i');
        filterQuery = { [filterKey]: { $regex: pattern } };
    }
    let skip=(page-1)*limit;
    let totalCount;
    let session;

    if(search && filterQuery && filterQuery){
       const pattern = new RegExp('^' +search, 'i');
       session=await sessionmodel.find(filterQuery).find({$or: [{topic:pattern}, {speaker:pattern}]}).skip(skip).limit(limit);
       totalCount= await sessionmodel.find(filterQuery).find({$or: [{topic:pattern}, {speaker:pattern}]}).countDocuments();
    }
    else if(search){
       const pattern = new RegExp('^' +search, 'i');
       session=await sessionmodel.find({$or: [{topic:pattern}, {speaker:pattern}]}).skip(skip).limit(limit);
       totalCount= await sessionmodel.find({$or: [{topic:pattern}, {speaker:pattern}]}).countDocuments();
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

//get Detail of Particular session with Date and Level
module.exports.singleSessionWithDateAndLevel=async function singleSessionWithDateAndLevel(req,res){
try{
    console.log(req.query);
    let date=req.query.date;
    let branch=req.query.branch;
    let level=parseInt(req.query.level);
    let session= await sessionmodel.findOne({date:date,level:level,branch:branch},{ topic: 1,speaker: 1,branch:1 });
    console.log(session);
    if(session){
        res.status(200).send({  
            data:session
        });
    }
    else{
        res.status(404).send({
            data:"Session Record does not Exist" 
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//Delete Session
module.exports.deleteSession=async function deleteSession(req,res){
try{
    let id=req.params.id;
    let sessionDate=req.body.sessionDate;
    let attendance=await attendancemodel.deleteMany({sessionDate:sessionDate});
    if(attendance){
        let session=await sessionmodel.deleteMany({_id:id});
        if(session){
           res.status(200).send({
            data:session
        });
        }
        else{
          res.status(422).send({
            data:"error while deleting Session"
        });  
        }
    }
    else{
        res.status(422).send({
            data:"error while deleting Session"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}