const express=require('express');
const sessionrouter=express.Router();
const { append } = require('vary');
const { createSession, updateSession, allSession, singleSession } = require('../controller/sessioncontroller');

//Routers
//Create session
sessionrouter.route('/create-session').post(createSession);
//Update session
sessionrouter.route('/update-session/:id').patch(updateSession);
//get all session
sessionrouter.route('/all-session').get(allSession);
//get single session
sessionrouter.route('/:id').get(singleSession);

module.exports=sessionrouter;