const mongoose=require('mongoose');
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
  console.log('Connected to the Attendance Database.'); 
});

//User Schema
const attendanceSchema=mongoose.Schema({
    remark:{
        type:String
    },
    status:{
        type:String,
        required:[true,'this field is required']
    },
    devotee:{
        type:Object,
        required:[true,'attendance must belong to devotee']
    },
    session:{
        type:Object,
        required:[true,'attendance must belong to session']
    },
    sessionDate:{
        type:String,
        required:[true,'this field is required']
    },
    sessionLevel:{
        type:Number,
        required:[true,'this field is required']
    },
    sessionBranch:{
        type:String,
        required:[true,'this field is required']
    },
    devoteePhone:{
       type:String,
        required:[true,'this field is required'] 
    },
    sessionId:{
       type:String,
        required:[true,'this field is required'] 
    },
    devoteeId:{
       type:String,
        required:[true,'this field is required'] 
    },
    creted_at:{
      type:Date,
      default:Date.now
    }
});

const attendancemodel=mongoose.model('attendance',attendanceSchema);

module.exports=attendancemodel;
