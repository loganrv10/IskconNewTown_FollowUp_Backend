const express=require('express');
const remarkmodel = require('../models/remarkmodel');


// create session
module.exports.createRemark=async function createRemark(req,res){
try{
    let obj=req.body;

    const currentDate = new Date(Date.now());
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: January is month 0
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    obj.creted_at=formattedDate;

    let remark=await remarkmodel.create(obj);
    if(remark){
        res.status(200).send({
            data:remark
        });
    }
    else{
        res.status(422).send({
            data:"error while creating remark"
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
    console.log(obj);
    let id=req.params.id;

    let remark=await remarkmodel.updateOne({_id:id},obj,{new:true});
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

//get All RemarkList
module.exports.allRemark=async function allRemark(req,res){
try{
    console.log(req.query);
    let limit =req.query.limit?parseInt(req.query.limit):5;
    let page = req.query.page?parseInt(req.query.page):1;
    let filterKey=req.query.filterkey?req.query.filterkey:null;
    let filterValue=req.query.filtervalue?req.query.filtervalue:null;
    let search=req.query.search?req.query.search:null;
    let devotee=req.query.id;
    let filterQuery;
    if(filterKey && filterKey=="creted_at"){
        filterQuery = { [filterKey]: filterValue };
    }
    else if(filterKey){
        const pattern = new RegExp(filterValue, 'i');
        filterQuery = { [filterKey]: { $regex: pattern } };
    }
    let skip=(page-1)*limit;
    let totalCount;
    let remark;

    if(search && filterQuery && filterQuery){
       const pattern = new RegExp('^' +search, 'i');
       remark=await remarkmodel.find({"devotee.id":devotee}).find(filterQuery).find({$or: [{"remarked_by.name":pattern}]}).skip(skip).limit(limit);
       totalCount= await remarkmodel.find({"devotee.id":devotee}).find(filterQuery).find({$or: [{"remarked_by.name":pattern}]}).countDocuments();
    }
    else if(search){
       const pattern = new RegExp('^' +search, 'i');
       remark=await remarkmodel.find({"devotee.id":devotee}).find({$or: [{"remarked_by.name":pattern}]}).skip(skip).limit(limit);
       totalCount= await remarkmodel.find({"devotee.id":devotee}).find({$or: [{"remarked_by.name":pattern}]}).countDocuments();
    }
    else{
       
       remark=await remarkmodel.find({"devotee.id":devotee}).find(filterQuery).skip(skip).limit(limit);
       totalCount= await remarkmodel.find({"devotee.id":devotee}).find(filterQuery).countDocuments(); 
    }
    if(remark){
        res.status(200).send({
            data:remark,
            count:totalCount
        });
    }
    else{
        res.status(422).send({
            data:"error while fetching remark list"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}

//Delete multiple Remark
module.exports.deleteRemark=async function deleteRemark(req,res){
try{
    let obj=req.body;
    let remarkIds=obj.remarkIds;
    let remark=await remarkmodel.deleteMany({_id:{ $in: remarkIds }});
    console.log(remark);
    if(remark){
        res.status(200).send({
            data:remark
        });
    }
    else{
        res.status(422).send({
            data:"error while deleting Remarks"
        });
    }
}
catch(err){
   res.status(422).send({
       data:err,
   });
}
}