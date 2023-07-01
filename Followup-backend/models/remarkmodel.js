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
  console.log('Connected to the Remark Database.'); 
});

//remark Schema
const remarkSchema=mongoose.Schema({
    remark:{
        type:String,
        required:[true,'this field is required']
    },
    remarked_by:{
        type:Object,
        required:[true,'remark must come from coordinator']
    },
    devotee:{
        type:Object,
        required:[true,'remark must belong to devotee']
    },
    creted_at:{
      type:String,
      required:[true,"This Field is Required"]
    }
});

const remarkmodel=mongoose.model('remark',remarkSchema);

module.exports=remarkmodel;