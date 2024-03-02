const express=require('express');
const usermodel=require('../models/usermodel');
const remarkmodel = require('../models/remarkmodel');
const attendancemodel = require('../models/attendancemodel');
const CsvParser = require('json2csv').Parser;

// Add Devotee
module.exports.addDevotee=async function addDevotee(req,res){ 
try{
    let obj=req.body;
    console.log("Yes");
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

//download Devotee data as excel
module.exports.downloadDevoteeToExcel=async function downloadDevoteeToExcel(req,res){
try{
    let users=[];
    let alluser=await usermodel.find({});
    if(alluser && alluser.length > 0){
        alluser.forEach((user)=>{
           const {name,phone,location,currentLocation,shiftLocation,comment,round,branch,level,registered_by,handled_by,grade,status,marital_status,creted_at}=user;
           let registeredByName=registered_by?.name;
           let handledByName=handled_by?.name;
           users.push({
            'Name': name,
            'Phone': phone,
            'Mother Tongue': location,
            'Current Location': currentLocation,
            'Shifted To': shiftLocation,
            'Comment': comment,
            'No. of Rounds': round,
            'Branch': branch,
            'Level': level,
            'Registered By': registeredByName,
            'Handled By': handledByName,
            'Grade': grade,
            'Profession': status,
            'Marital Status': marital_status,
            'Joined At': creted_at
            });
        })
        const csvFields=Object.keys(users[0]);;
        const csvParser=new CsvParser({csvFields});
        const csvData= csvParser.parse(users);
        res.setHeader('Content-Type','text/csv');
        res.setHeader('Content-Disposition','attachment: filename=participantsData.csv');
        res.status(200).send(csvData);
    }
    else{
        res.status(404).send({
            data:"No participant data found"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err
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
    else if(filterKey && filterKey=="creted_at"){
        filterQuery = { [filterKey]: filterValue };
    }
    else if(filterKey){
        const pattern = new RegExp(filterValue, 'i');
        filterQuery = { [filterKey]: { $regex: pattern } };
    }
    let skip=(page-1)*limit;

    let totalCount;
    let devotee;

    if(search && filterQuery && filterQuery){
       const pattern = new RegExp('^' +search, 'i');
       devotee=await usermodel.find(filterQuery).find({$or: [{name:pattern}, {phone:pattern}, {"registered_by.name":pattern},{"handled_by.name":pattern}]}).skip(skip).limit(limit);
       totalCount= await usermodel.find(filterQuery).find({$or: [{name:pattern}, {phone:pattern}, {"registered_by.name":pattern},{"handled_by.name":pattern}]}).countDocuments();
    }
    else if(search){
       const pattern = new RegExp('^' +search, 'i');  
       console.log(pattern);
       devotee=await usermodel.find({$or: [{name:pattern}, {phone:pattern}, {"registered_by.name":pattern},{"handled_by.name":pattern}]}).skip(skip).limit(limit);
       totalCount= await usermodel.find({$or: [{name:pattern}, {phone:pattern}, {"registered_by.name":pattern},{"handled_by.name":pattern}]}).countDocuments();
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

//get Detail of Particular Devotee by Phone Number
module.exports.devoteeDetailsByPhone=async function devoteeDetailsByPhone(req,res){
try{
    console.log(req.query);
    let phone=req.query.phone; 
    let user=await usermodel.find({phone:phone},{name:1,phone:1,level:1,handled_by:1,branch:1});
    if(user?.length!=0){
        res.status(200).send({  
            data:user
        });
    }
    else{
        res.status(404).send({
            data:"Participant does not Exist" 
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

//Assign multiple Devotee to Cordinator
module.exports.updateDevoteeCordinator=async function updateDevoteeCordinator(req,res){
try{
    let obj=req.body;
    let userIds=obj.id;
    let cordinator=obj.cordinator;
    let users=await usermodel.updateMany({_id:{ $in: userIds }},{ $set:{handled_by:cordinator} },{new:true});
    console.log(users);
    if(users){
        res.status(200).send({
            data:users
        });
    }
    else{
        res.status(422).send({
            data:"error while assigning Devotee"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get All DevoteeList of Cordinator
module.exports.allDevoteeOfCordinator=async function allDevoteeOfCordinator(req,res){
try{
    console.log(req.query);
    let limit =req.query.limit?parseInt(req.query.limit):5;
    let page = req.query.page?parseInt(req.query.page):1;
    let filterKey=req.query.filterkey?req.query.filterkey:null;
    let filterValue=req.query.filtervalue?req.query.filtervalue:null;
    let search=req.query.search?req.query.search:null;
    let cord=req.query.cord;
    let filterQuery;
    if(filterKey && filterKey=="level"){
        filterValue=parseInt(filterValue);
        filterQuery = { [filterKey]: filterValue };
    }
    else if(filterKey && filterKey=="creted_at"){
        filterQuery = { [filterKey]: filterValue };
    }
    else if(filterKey){
        const pattern = new RegExp(filterValue, 'i');
        filterQuery = { [filterKey]: { $regex: pattern } };
    }
    let skip=(page-1)*limit;

    let totalCount;
    let devotee;

    if(search && filterQuery && filterQuery){
       const pattern = new RegExp('^' +search, 'i');
       devotee=await usermodel.find({"handled_by.id":cord}).find(filterQuery).find({$or: [{name:pattern}, {phone:pattern}, {"registered_by.name":pattern},{"handled_by.name":pattern}]}).skip(skip).limit(limit);
       totalCount= await usermodel.find({"handled_by.id":cord}).find(filterQuery).find({$or: [{name:pattern}, {phone:pattern}, {"registered_by.name":pattern},{"handled_by.name":pattern}]}).countDocuments();
    }
    else if(search){
       const pattern = new RegExp('^' +search, 'i');  
       console.log(pattern);
       devotee=await usermodel.find({"handled_by.id":cord}).find({$or: [{name:pattern}, {phone:pattern}, {"registered_by.name":pattern},{"handled_by.name":pattern}]}).skip(skip).limit(limit);
       totalCount= await usermodel.find({"handled_by.id":cord}).find({$or: [{name:pattern}, {phone:pattern}, {"registered_by.name":pattern},{"handled_by.name":pattern}]}).countDocuments();
    }
    else{
        devotee=await usermodel.find({"handled_by.id":cord}).find(filterQuery).skip(skip).limit(limit);
        totalCount= await usermodel.find({"handled_by.id":cord}).find(filterQuery).countDocuments(); 
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

//get Devotee count of Cordinator
module.exports.allDevoteeCount=async function allDevoteeCount(req,res){
try{
    let cord=req.query.cord;
    let totalCount;
    totalCount= await usermodel.find({"handled_by.id":cord}).countDocuments();
    if(totalCount!==undefined){
        res.status(200).send({
            data:totalCount
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching devotee count"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//Delete Devotee
module.exports.deleteDevotee=async function deleteDevotee(req,res){
try{
    let id=req.params.id;
    let devoteePhone=req.body.devoteePhone;
    let remark=await remarkmodel.deleteMany({"devotee.id":id});
    let attendance=await attendancemodel.deleteMany({devoteePhone:devoteePhone});
    if(remark && attendance){
        let Devotee=await usermodel.deleteMany({_id:id});
        if(Devotee){
           res.status(200).send({
            data:Devotee
        });
        }
        else{
          res.status(422).send({
            data:"error while deleting Participant"
        });  
        }
    }
    else{
        res.status(422).send({
            data:"error while deleting Participant"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

