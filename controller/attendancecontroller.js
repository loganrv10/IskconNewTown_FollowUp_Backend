const express=require('express');
const attendancemodel=require('../models/attendancemodel');
const sessionmodel=require('../models/sessionmodel');
const usermodel = require('../models/usermodel');
const CsvParser = require('json2csv').Parser;

// mark attendance
module.exports.createAttendance=async function createAttendance(req,res){
try{
    let obj=req.body;
    let sessionID=obj.sessionID;
    let userID=obj.userID;
    let session= await sessionmodel.findOne({_id:sessionID},{date:1,level:1,branch:1});
    let user= await usermodel.findOne({_id:userID},{name:1,phone:1,handled_by:1,level:1,branch:1});
    let checkAttendance = await attendancemodel.findOneAndUpdate({sessionDate:session.date,sessionLevel:session.level,devoteePhone:user.phone,sessionBranch:session.branch},{status:obj.status},{new:true});
    if(checkAttendance){
        return(
            res.status(200).send({
                data:checkAttendance
        }));
    }
    else{
        let dataToInserted={
            status:obj.status,
            remark:"",
            devotee:user,
            session:session,
            sessionDate:session.date,
            sessionLevel:session.level,
            devoteePhone:user.phone,
            sessionId:session._id,
            sessionBranch:session.branch,
            devoteeId:user._id
            }
        let attendance=await attendancemodel.create(dataToInserted);
        if(attendance){
           return(
            res.status(200).send({
                data:attendance
            }));
        }else{
            res.status(422).send({
            data:"error while marking attendance"
            });
        }
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get Detail of Particular session
module.exports.sessionAttendance=async function sessionAttendance(req,res){
try{
    let id=req.query.session;
    let status=req.query.status;
    let limit =req.query.limit?parseInt(req.query.limit):5;
    let page = req.query.page?parseInt(req.query.page):1;
    let search=req.query.search?req.query.search:null;
    let skip=(page-1)*limit;
    let totalCount;
    let attendance;
    if(search){
       const pattern = new RegExp('^' +search, 'i');
       if(status=="P"){
           attendance=await attendancemodel.find({sessionId:id,status:"Present"},{status:1,devotee:1,remark:1,creted_at:1,sessionDate:1,sessionLevel:1}).find({$or: [{"devotee.name":pattern}, {"devotee.phone":pattern},{"devotee.handled_by.name":pattern}]}).skip(skip).limit(limit);
           totalCount= await attendancemodel.find({sessionId:id,status:"Present"},{status:1,devotee:1,remark:1,creted_at:1,sessionDate:1,sessionLevel:1}).find({$or: [{"devotee.name":pattern}, {"devotee.phone":pattern},{"devotee.handled_by.name":pattern}]}).countDocuments();
        }
       else{
           attendance=await attendancemodel.find({sessionId:id,status:{ $ne: 'Present' }},{status:1,devotee:1,remark:1,creted_at:1,sessionDate:1,sessionLevel:1}).find({$or: [{"devotee.name":pattern}, {"devotee.phone":pattern},{"devotee.handled_by.name":pattern}]}).skip(skip).limit(limit);
           totalCount= await attendancemodel.find({sessionId:id,status:{ $ne: 'Present' }},{status:1,devotee:1,remark:1,creted_at:1,sessionDate:1,sessionLevel:1}).find({$or: [{"devotee.name":pattern}, {"devotee.phone":pattern},{"devotee.handled_by.name":pattern}]}).countDocuments();
        }
    }
    else{
        if(status=="P"){
           attendance=await attendancemodel.find({sessionId:id,status:"Present"},{status:1,devotee:1,remark:1,creted_at:1,sessionDate:1,sessionLevel:1}).skip(skip).limit(limit);
           totalCount=await attendancemodel.find({sessionId:id,status:"Present"}).countDocuments();   
        }
        else{
            attendance=await attendancemodel.find({sessionId:id,status:{ $ne: 'Present' }},{status:1,devotee:1,remark:1,creted_at:1,sessionDate:1,sessionLevel:1}).skip(skip).limit(limit);
            totalCount=await attendancemodel.find({sessionId:id,status:{ $ne: 'Present' }}).countDocuments();
        }
    }
    console.log(attendance)
    if(attendance){
        res.status(200).send({  
            data:attendance,
            count:totalCount
        });
    }
    else{
        res.status(404).send({
            data:"No Attendance is Found" 
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//Update Remark
module.exports.updateRemark=async function updateRemark(req,res){
try{
    let obj=req.body;
    let id=req.params.id;
    if(obj?.status=="Present"){
      obj.creted_at=new Date();
    }
    console.log(obj);
    let remark=await attendancemodel.updateOne({_id:id},obj,{new:true});
    console.log(remark);
    if(remark){
        res.status(200).send({
            data:remark
        });
    }
    else{
        res.status(422).send({
            data:"error while updating remark"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get attendance record of particular devotee
module.exports.getRecordDevotee=async function getRecordDevotee(req,res){
try{
    let id=req.params.id;
    let record=await attendancemodel.find({devoteeId:id});
    let result=[];
    if(record){
    for(let i=0;i<record.length;i++){
        let dateString = record[i].sessionDate;
        const [year,month,day] = dateString.split("-");
        const date = new Date(year, month - 1, day); // Month in JavaScript's Date object is 0-based 
        const monthText = date.toLocaleString('en-US', { month: 'long' });
        let exist = result.findIndex(obj =>
            obj["year"] === year && obj["month"] ===monthText
        );
        if(exist!=-1){
           result[exist].record.push(record[i]);
        }
        else{
           let objRecord={};
           let temp=[];
           temp.push(record[i]);
           objRecord.year=year;
           objRecord.month=monthText;
           objRecord.record=temp;
           result.push(objRecord);
        }
    }
        res.status(200).send({
            data:result
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching record"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get stats of attendance of particular month
module.exports.getRecordStatMonth=async function getRecordStatMonth(req,res){
try{
    let month=req?.body?.month;
    const pattern = new RegExp(month, 'i');
    record=await attendancemodel.find({status:"Present"}).find({$or: [{sessionDate:pattern}]});

    let result=[];
    if(record){
    for(let i=0;i<record.length;i++){
       let date=record[i].sessionDate;
       let exist = result.findIndex(obj =>
            obj["date"] === date
        );
        if(exist!=-1){
            if(record[i].sessionLevel==1){
                result[exist].level1= result[exist].level1+1
            }
            else if(record[i].sessionLevel==2){
                result[exist].level2= result[exist].level2+1
            }
            else if(record[i].sessionLevel==3){
                result[exist].level3= result[exist].level3+1
            }
        }
        else{
           let objRecord={};
           objRecord.level1=0;
           objRecord.level2=0;
           objRecord.level3=0;
           objRecord.date=date;
           result.push(objRecord);

           if(record[i].sessionLevel==1){
                objRecord.level1=objRecord.level1+1
            }
            else if(record[i].sessionLevel==2){
                objRecord.level2=objRecord.level2+1
            }
            else if(record[i].sessionLevel==3){
                objRecord.level3=objRecord.level3+1
            }
        }
    }
        res.status(200).send({
            data:result
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching record"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//get stats of attendance of particular Devotee
module.exports.getRecordStatDevotee=async function getRecordStatDevotee(req,res){
try{
    let id=req.params.id;
    console.log(id);
    let record=await attendancemodel.find({devoteeId:id});
    let level1=0;
    let level2=0;
    let level3=0;
    if(record){
    for(let i=0;i<record.length;i++){
       if(record[i].sessionLevel==1 && record[i].status=="Present"){
          level1=level1+1
       }
       else if(record[i].sessionLevel==2 && record[i].status=="Present"){
          level2=level2+1
       }
       else if(record[i].sessionLevel==3 && record[i].status=="Present"){
          level3=level3+1
       }
    }
        res.status(200).send({
            data:{
                level1:level1,
                level2:level2,
                level3:level3,
                total:level1+level2+level3
            }
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching record"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//download Attendance data as excel
module.exports.downloadAttendanceToExcel=async function downloadAttendanceToExcel(req,res){
try{
    let id=req.query.session;
    let status=req.query.status;
    let attendance;
    if(status=="P"){
        attendance=await attendancemodel.find({sessionId:id,status:"Present"},{status:1,devotee:1,remark:1,creted_at:1,sessionDate:1});
    }
    else{
        attendance=await attendancemodel.find({sessionId:id,status:{ $ne: 'Present' }},{status:1,devotee:1,remark:1,creted_at:1,sessionDate:1});
    }
    let users=[];
    if(attendance && attendance.length > 0){
        attendance.forEach((user)=>{
           const {devotee,remark,status,creted_at,sessionDate}=user;
           users.push({
            'Date':sessionDate,
            'Name': devotee?.name,
            'Phone': devotee?.phone,
            'Remark': remark,
            'Branch': devotee?.branch,
            'Level': devotee?.level,
            'Handled By': devotee?.handled_by?.name,
            'Status':status,
            'Marked At' :creted_at?new Date(creted_at).toLocaleString():"____",
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
            data:"No Attendance data found"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err
   });
}
}



