const express=require('express');
const multer=require('multer');
const path=require('path');
const adminrouter=express.Router();
const {addCordinate,updateCordinate,allCordinate,singleCordinate,updateCordinateLevel, CordinatezForSelect, assignDevotee, deassignDevotee, resetpassword, sendMail, updateProfileImage}=require('../controller/admincontroller');
const { append } = require('vary');
const { login, protectuser, isAuthorised, getProfile } = require('../controller/authcontroller');

//Routers
//login for cordinator
adminrouter.route('/login').post(login);
//get profile from token
adminrouter.route('/get-profile').get(getProfile);
//password reset link send
adminrouter.route('/send-mail').post(sendMail);
//update Password of cordinator
adminrouter.route('/resetpassword/:token').patch(resetpassword);
//get all Cordinate for select
adminrouter.route('/select-cordinate').get(CordinatezForSelect);
//protected Route
// adminrouter.use(protectuser);
//admin specific functionality
// adminrouter.use(isAuthorised(['admin']));
//Create Cordinate
adminrouter.route('/add-cordinate').post(addCordinate);   
//Update Cordinate
adminrouter.route('/update-cordinate/:id').patch(updateCordinate);
//get all Cordinate
adminrouter.route('/all-cordinate').get(allCordinate); 
//assign devotees to Cordinate
adminrouter.route('/assign-devotee/:id').patch(assignDevotee);
//deassign devotees to Cordinate
adminrouter.route('/deassign-devotee/:id').patch(deassignDevotee);
//update level of Multiple cordinate
adminrouter.route('/update-level').patch(updateCordinateLevel);
//get single Cordinate
adminrouter.route('/:id').get(singleCordinate);

//multer for fileupload
//upload--> storage , filter

const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public')
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});

const filter=function (req,file,cb){
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }else{
        cb(new Error("Not an Image! Please upload an Image"))
    }
}

const upload= multer({
    storage:multerStorage,
    fileFilter:filter
})

adminrouter.post("/profileimage/:token",upload.single('photo'),updateProfileImage);

module.exports=adminrouter;