const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
const emailport=process.env.emailport;
const emailhost=process.env.emailhost;
const emailsender=process.env.emailsender;
const emailpass=process.env.emailpass;

module.exports.sendmail=async function sendmail(str,data){
  try{
    let transporter = nodemailer.createTransport({
      host: emailhost,
      port: emailport,
      secure: false, // true for 465, false for other ports
      auth:{
        user: emailsender, // generated ethereal user
        pass: emailpass, // generated ethereal password
      },
    });
    var osubject,otext,ohtml;
    if(str=="resetpassword"){
      osubject=`About Reset Password`;
      ohtml=`
        <h5>Hare Krishna, ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h5>
        <p>You are Appointed as Co-ordinator for FOE FollowUp</p>
        <p>Please Reset Your Password:-</p>
        <p>Here is your link to reset your password!! </p>
        <p>${data.resetPasswordLink}</p>
        <hr>
        <p>Here is your details:-</p>
        <p>Name:${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
        <p>Email:${data.email}</p>
        `
    }
    let info = await transporter.sendMail({
      from: `"FOE FollowUp" <${emailsender}>`, // sender address
      to: data.email, // list of receivers
      subject: osubject, // Subject line
      html: ohtml, // html body
    });
  
    if(info){
      return ({
        data:"Mail sent Successfully",
        status:200
      });
    }
    else{
      return ({
        data:"There is an error while sending mail",
        status:422
      });
    }
   
  }
  catch(err){
    return ({
    data:err,
    status:500
    });
  } 
}