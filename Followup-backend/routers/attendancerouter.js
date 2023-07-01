const express=require('express');
const { createAttendance, updateRemark, getRecordDevotee, sessionAttendance, getRecordStatDevotee, getRecordStatMonth } = require('../controller/attendancecontroller');
const { protectuser } = require('../controller/authcontroller');
const attendancerouter=express.Router(); 

//Routers
//protected Route
// attendancerouter.use(protectuser);
//Create attendance
attendancerouter.route('/create-attendance').patch(createAttendance); 
//get all Attendance of Session
attendancerouter.route('/session-attendance').get(sessionAttendance);
//update remark of attendance
attendancerouter.route('/update-remark/:id').patch(updateRemark); 
//get attendance record of particular devotee
attendancerouter.route('/devotee-record/:id').get(getRecordDevotee);   
//get attendance record stats of particular devotee
attendancerouter.route('/devotee-stats/:id').get(getRecordStatDevotee); 
//get attendance record stats of particular month
attendancerouter.route('/month-stats').post(getRecordStatMonth); 

module.exports=attendancerouter;