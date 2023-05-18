const express=require('express');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const dotenv = require('dotenv')

dotenv.config();
const port=process.env.port;
const app=express();


app.use(express.json());
app.use(cookieParser());
app.use(cors());

const userrouter=require('./routers/userrouter');
app.use('/devotee',userrouter);

const adminrouter=require('./routers/adminrouter');
app.use('/admin',adminrouter);

const sessionrouter=require('./routers/sessionrouter');
app.use('/session',sessionrouter);

// const chapterrouter=require('./routers/chapterrouter');
// app.use('/chapter',chapterrouter);

//static image folder
// app.use('/public',express.static('./public'));

app.listen(port,(err)=>{
    if(err){
        console.log("error while creating server");
        return;
    }
    console.log("server is running at",port);
});