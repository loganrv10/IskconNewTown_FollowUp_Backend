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
  console.log('Connected to the Session Database.');
});

//User Schema
const sessionSchema=mongoose.Schema({
    topic:{
        type:String,
        required:[true,"This Field is Required"]
    },
    level:{
       type:Number,
       required:[true,"This Field is Required"]
    },
    date:{
       type:String,
       required:[true,"This Field is Required"]
    },
    speaker:{
      type:String,
      required:[true,"This Field is Required"]  
    }
});
  
const sessionmodel=mongoose.model('session',sessionSchema);

module.exports=sessionmodel;