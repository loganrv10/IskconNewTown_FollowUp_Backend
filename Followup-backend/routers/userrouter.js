const express=require('express');
const userrouter=express.Router();
const {addDevotee,updateDevotee,allDevotee,singleDevotee,updateDevoteeLevel,updateDevoteeGrade, devoteeDetailsByPhone, updateDevoteeCordinator, allDevoteeOfCordinator, deleteDevotee}=require('../controller/usercontroller');
const { append } = require('vary');
const { protectuser } = require('../controller/authcontroller');

//Routers
//delete devotee
userrouter.route('/delete/:id').post(deleteDevotee);  
//protected Route
userrouter.use(protectuser);
//Create Devotee
userrouter.route('/add-devotee').post(addDevotee);
//Update Devotee
userrouter.route('/update-devotee/:id').patch(updateDevotee);   
//get all Devotee
userrouter.route('/all-devotee').get(allDevotee);
//get all Devotee
userrouter.route('/all-devotee-cordinator').get(allDevoteeOfCordinator);
//get details of devotee based on date and level
userrouter.route('/devotee-details').get(devoteeDetailsByPhone);
//update level of Multiple Devotee
userrouter.route('/update-level').patch(updateDevoteeLevel);
//update grade of Multiple Devotee
userrouter.route('/update-grade').patch(updateDevoteeGrade);
//update grade of Multiple Devotee
userrouter.route('/assign-cordinator').patch(updateDevoteeCordinator); 
//get single Devotee
userrouter.route('/:id').get(singleDevotee);

module.exports=userrouter;