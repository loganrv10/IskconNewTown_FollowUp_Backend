const express=require('express');
const userrouter=express.Router();
const {addDevotee,updateDevotee,allDevotee,singleDevotee,updateDevoteeLevel,updateDevoteeGrade}=require('../controller/usercontroller');
const { append } = require('vary');

//Routers
//Create Devotee
userrouter.route('/add-devotee').post(addDevotee);
//Update Devotee
userrouter.route('/update-devotee/:id').patch(updateDevotee);
//get all Devotee
userrouter.route('/all-devotee').get(allDevotee);
//update level of Multiple Devotee
userrouter.route('/update-level').patch(updateDevoteeLevel);
//update grade of Multiple Devotee
userrouter.route('/update-grade').patch(updateDevoteeGrade);
//get single Devotee
userrouter.route('/:id').get(singleDevotee);


module.exports=userrouter;