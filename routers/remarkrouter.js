const express=require('express');
const remarkrouter=express.Router();
const { append } = require('vary');
const { protectuser } = require('../controller/authcontroller');
const { createRemark, updateRemark, allRemark, deleteRemark } = require('../controller/remarkcontroller');

//Routers
//protected Route
remarkrouter.use(protectuser);
//Create remark
remarkrouter.route('/create-remark').post(createRemark);
//Update remark
remarkrouter.route('/update-remark/:id').patch(updateRemark);  
//get all remark
remarkrouter.route('/all-remark').get(allRemark);
//delete single or multiple remark
remarkrouter.route('/delete').post(deleteRemark);

module.exports=remarkrouter;