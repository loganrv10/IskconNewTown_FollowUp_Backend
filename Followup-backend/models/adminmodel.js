const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt=require('bcrypt');
const Crypto = require("crypto");
const { stringify } = require('querystring');

const dotenv = require('dotenv')
dotenv.config();
const DB=process.env.DB;

//Connection To DataBase
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});     
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the Admin Database.');
});

//admin Schema
const adminSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"This Field is Required"]
    },
    phone:{
        type:String,
        required:[true,"This Field is Required"],
        unique:[true,"This Devotee is already Exist"],
        validate: {
            validator: function() {
            return this.phone.length === 10;
        },
        message: 'Phone number must be 10 digits.'
        }
    },
    email:{
        type:String,
        required:[true,"This Field is Required"],
        unique:[true,"This Devotee is already Exist"],
        validate: {
        validator:function(){
            return validator.isEmail(this.email);
        },
        message: 'Email is not Valid.'
        }
    },
    password:{
        type:String,
    },
    confirmedPassword:{
        type:String,
        validate:function(){
            return this.password==this.confirmedPassword;
        }
    },
    image:{
        type:String,
    },
    role:{
        type:String,
        required:[true,"This Field is Required"],
    },
    location:{
       type:String 
    },
    level:{
       type:Number,
       required:[true,"This Field is Required"]
    },
    registered_by:{
      type:String,
      required:[true,"This Field is Required"]  
    },
    handled_by:{
       type:String 
    },
    status:{
       type:String,
       required:[true,"This Field is Required"]
    },
    devotees:{
        type:Array
    },
    resetToken:{
        type:String
    }
});

//middleware
adminSchema.post('save', function(error, doc, next) {
  if (error.code === 11000) {
    next('This Cordinator is already Exist');
  }else {
    next(error);
  }
});

adminSchema.pre('save',function(){
    if(this.confirmedPassword){
       this.confirmedPassword=undefined;
    }
});
  
adminSchema.pre('save',async function(){
    if(this.password){
       let salt=await bcrypt.genSalt();
       let hashedstring=await bcrypt.hash(this.password,salt);
       this.password=hashedstring;
    }
});

adminSchema.methods.createReastToken=function(){
   //creating unique token using crypto package
   const resetToken=Crypto.randomBytes(32).toString("hex");
   this.resetToken=resetToken;
   return resetToken;
}

adminSchema.methods.resetpasswordhandler=function(password,confirmedpassword){
    this.password=password;
    this.confirmedPassword=confirmedpassword;
    this.resetToken=undefined;
};

adminSchema.pre('save',function(){
    this.confirmedPassword=undefined;
});
  
adminSchema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    let hashedstring=await bcrypt.hash(this.password,salt);
    this.password=hashedstring;
});

  
const adminmodel=mongoose.model('admins',adminSchema);

module.exports=adminmodel;