const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminmodel = require("../models/adminmodel");

const dotenv = require("dotenv");
dotenv.config();
const jwt_key = process.env.key;

// login cordinator
module.exports.login = async function login(req, res) {
  try {
    let obj = req.body;
    console.log(obj);
    let user = await adminmodel.findOne({ email: obj.email });
    console.log(user);
    if (user) {
      let objpassword = obj.password;
      let userpassword = user.password;
      let verify;
      console.log(userpassword,"hello",objpassword);
      if (!objpassword || !userpassword) {
        verify = false;
      } else {
        verify = await bcrypt.compare(objpassword, userpassword);
      }
      console.log("Hanuman",verify);
      // verify = true;
      //changed by default
      if (verify) {
        let uid = user._id;
        let token = jwt.sign({ payload: uid }, jwt_key);  
        res.cookie("userAuth", token, { httpOnly: true });
        return res.status(200).send({
          data: {
            userAuthToken: token,
          },
        });
      } else {
        res.status(401).send({
          data: "Credential is wrong",
        });
      }
    } else {
      res.status(404).send({
        data: "User not found", 
      });
    }
  } catch (err) {
    res.status(422).send({
      data: err,
    });
  }
};

//get profile of LogedIn User
module.exports.getProfile = async function getProfile(req, res) {
  try {
      let token;
      let temp = req.header('authorization');
      console.log(temp);
      token = temp.substring(4);
      console.log(token);
      if(token){
        let payload=jwt.verify(token,jwt_key);
        if(payload){
          console.log(payload);
          let admin=await adminmodel.findById(payload.payload);
          if (admin) {
            res.status(200).send({
              data: admin,
            });
          }
          else{
            res.status(201).send({
            data:"user not verified"
            });
          }
        }
        else{
          res.status(404).send({
          data:"user not found"
          });
        }
      }
  } catch (err) {
    res.status(422).send({
      data: err,
    });
  }
};

//protect route
module.exports.protectuser=async function protectuser(req,res,next){
    try{
        let token;
        let temp = req.header('authorization');
        // console.log(temp);
        token = temp.substring(4);
        // console.log(token);
        if(token){
          let payload=jwt.verify(token,jwt_key);  
          if(payload){
            let admin=await adminmodel.findById(payload.payload);
            req.id=admin._id;
            req.role=admin.role;
            next();  
          }
          else{
            res.status(401).send({
            data:"user not verified"
          });
          }
        }
        else{
          const client=req.get('User-Agent');
          console.log(client);
          if(client.includes("Crome")==true){
            return res.redirect('/login');
          }
          else{
            res.status(401).send({
            data:"Please Login Again"
          }) 
          }
        }
    }
    catch(err){
        res.status(422).send({
            data:err
        })
    }
}

//isAuthorised-> to check the user's role [admin,cordinator]
module.exports.isAuthorised = function isAuthorised(roles) {
  // console.log(roles,"Authorised")
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "You don't have permission"
      });
    }
  };
};
