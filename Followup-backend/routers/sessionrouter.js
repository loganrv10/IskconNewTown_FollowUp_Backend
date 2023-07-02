const express=require('express');
const sessionrouter=express.Router();
const { append } = require('vary');
const { createSession, updateSession, allSession, singleSession, singleSessionWithDateAndLevel, deleteSession } = require('../controller/sessioncontroller');
const { protectuser } = require('../controller/authcontroller');

//Routers
//delete devotee
sessionrouter.route('/delete/:id').post(deleteSession);  
//protected Route
// sessionrouter.use(protectuser);
//Create session
sessionrouter.route('/create-session').post(createSession);
//Update session
sessionrouter.route('/update-session/:id').patch(updateSession);
//get all session
sessionrouter.route('/all-session').get(allSession);
//get details of session based on date and level
sessionrouter.route('/session-details').get(singleSessionWithDateAndLevel);
//get single session
sessionrouter.route('/:id').get(singleSession);

module.exports=sessionrouter;