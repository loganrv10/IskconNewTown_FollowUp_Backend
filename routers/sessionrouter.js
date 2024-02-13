const express=require('express');
const sessionrouter=express.Router();
const { append } = require('vary');
const { createSession, updateSession, allSession, singleSession, singleSessionWithDateAndLevel, deleteSession } = require('../controller/sessioncontroller');
const { protectuser, isAuthorised } = require('../controller/authcontroller');

//Routers
//get details of session based on date and level
sessionrouter.route('/session-details').get(singleSessionWithDateAndLevel);
//protected Route
sessionrouter.use(protectuser);
//get all session
sessionrouter.route('/all-session').get(allSession);
//get single session
sessionrouter.route('/:id').get(singleSession);
//admin specific functionality
sessionrouter.use(isAuthorised(['admin']));
//delete session
sessionrouter.route('/delete/:id').post(deleteSession);  
//Create session
sessionrouter.route('/create-session').post(createSession);
//Update session
sessionrouter.route('/update-session/:id').patch(updateSession);

module.exports=sessionrouter;