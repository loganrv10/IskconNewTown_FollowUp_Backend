const express=require('express');
const adminrouter=express.Router();
const {addCordinate,updateCordinate,allCordinate,singleCordinate,updateCordinateLevel, CordinatezForSelect, assignDevotee, deassignDevotee, resetpassword}=require('../controller/admincontroller');
const { append } = require('vary');

//Routers
//Create Cordinate
adminrouter.route('/add-cordinate').post(addCordinate);
//Update Cordinate
adminrouter.route('/update-cordinate/:id').patch(updateCordinate);
//get all Cordinate
adminrouter.route('/all-cordinate').get(allCordinate);
//get all Cordinate for select
adminrouter.route('/select-cordinate').get(CordinatezForSelect);
//assign devotees to Cordinate
adminrouter.route('/assign-devotee/:id').patch(assignDevotee);
//deassign devotees to Cordinate
adminrouter.route('/deassign-devotee/:id').patch(deassignDevotee);
//update level of Multiple cordinate
adminrouter.route('/update-level').patch(updateCordinateLevel);
//update Password of cordinator
adminrouter.route('/resetpassword/:token').patch(resetpassword);
//get single Cordinate
adminrouter.route('/:id').get(singleCordinate);

module.exports=adminrouter;