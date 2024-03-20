const express=require('express');
const userrouter=express.Router();
const {addDevotee,updateDevotee,allDevotee,singleDevotee,updateDevoteeLevel,updateDevoteeGrade, devoteeDetailsByPhone, updateDevoteeCordinator, allDevoteeOfCordinator, deleteDevotee, allDevoteeCount, downloadDevoteeToExcel, updateDevoteeMode}=require('../controller/usercontroller');
const { append } = require('vary');
const { protectuser, isAuthorised } = require('../controller/authcontroller');

//Routers
//Create Devotee
userrouter.route('/add-devotee').post(addDevotee);
//get details of devotee based on date and level
userrouter.route('/devotee-details').get(devoteeDetailsByPhone);
//protected Route
userrouter.use(protectuser);  
//Update Devotee
userrouter.route('/update-devotee/:id').patch(updateDevotee);   
//get all Devotee
userrouter.route('/all-devotee').get(allDevotee);
//download all Devotee data as excel
userrouter.route('/export-devotee').get(downloadDevoteeToExcel);  
//get Devotee of cordinator
userrouter.route('/all-devotee-cordinator').get(allDevoteeOfCordinator);
//get Devotee count of cordinator
userrouter.route('/count-devotee-cordinator').get(allDevoteeCount);
//update grade of Multiple Devotee
userrouter.route('/update-grade').patch(updateDevoteeGrade);
//get single Devotee
userrouter.route('/:id').get(singleDevotee);
//admin specific functionality
userrouter.use(isAuthorised(['admin']));
//delete devotee
userrouter.route('/delete/:id').post(deleteDevotee);
//update level of Multiple Devotee
userrouter.route('/update-level').patch(updateDevoteeLevel);
//update mode of Multiple Devotee
userrouter.route('/update-mode').patch(updateDevoteeMode);
//update grade of Multiple Devotee
userrouter.route('/assign-cordinator').patch(updateDevoteeCordinator); 

module.exports=userrouter;