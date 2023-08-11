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
    var osubject,otext,ohtml,attachment;
    if(str=="resetpassword"){
      osubject=`About Reset Password`;
      ohtml=`
        <h5>Hare Krishna, ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h5>
        <p>You are Appointed as Co-ordinator for FOE FollowUp</p>
        <p>Please Reset Your Password:-</p>
        <p>Here is your link to reset your password!! </p>
        <a href={data.resetPasswordLink}>Click Here</a>
        <hr>
        <p>Here is your details:-</p>
        <p>Name:${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
        <p>Email:${data.email}</p>
        `
    }
    else if(str=="resetpasswordself"){
      osubject=`About Reset Password`;
      attachment=[{
        filename:"krishna.png",
        path:__dirname+'/images/krishna.png',
        cid: 'krishna'
      },
      {
        filename:"isckonlogo1.png",
        path:__dirname+'/images/isckonlogo1.png',
        cid: 'isckonlogo1'
      },
      {
        filename:"krishnalogo.png",
        path:__dirname+'/images/krishnalogo.png',
        cid: 'krishnalogo'
      },
      {
        filename:"pattern.png",
        path:__dirname+'/images/pattern.png',
        cid: 'pattern'
      },
      {
        filename:"patternbody.png",
        path:__dirname+'/images/patternbody.jpeg',
        cid: 'patternbody'
      }
      ]

ohtml=`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <!-- Facebook sharing information tags -->
    <meta property="og:title" content="" />
    <style>
      .hfg {
        color: #0085ff;
        font-weight: bold;
      }

      @media only screen and (max-width: 450px) {
        .widht_360 {
          width: 360px !important;
        }

        .p_lr_0 {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }

        .p_lr_10 {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }

        .no_phone {
          display: none !important;
        }

        .yes_phone {
          display: block !important;
        }
      }
    </style>
  </head>

  <body
    bgcolor="#e6e6e6"
    style="
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      height: 100% !important;
      width: 100% !important;
      background-color: #fff;
      margin: 0;
      padding: 0;
    "
  >
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding-top: 20px">
          <table
            width="600"
            border="0"
            cellspacing="0"
            cellpadding="0"
            bgcolor="#a04e4e"
            class="widht_360"
            style="background-image: url('cid:pattern')"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding-top: 20px; padding-bottom: px"
              >
              <div>
                <img
                  src="cid:isckonlogo1"
                  width="150"
                  alt="FOE"
                  style=""
                />
                <p style="
                    margin-top:-5px;
                    font-family: Helvetica, Arial, 'sans-serif';
                    color:#ffce70;
                    font-weight:500;
                    "
                    >FOE FOLLOWUP</p>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding: 20px 20px 20px 20px" class="p_lr_10">
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  bgcolor="#FFFFFF"
                  style="
                    background-image: url('cid:patternbody')
                  "
                >
                  <tr>
                    <td style="padding: 40px 40px 0px 40px" class="p_lr_10">
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tr>
                          <td
                            valign="top"
                            style="
                              font-family: Helvetica, Arial, 'sans-serif';
                              padding: 0px 0px 10px 0px;
                              color: #262727;
                              font-size: 14px;
                              line-height: 24px;
                              letter-spacing: -0.01em;
                              mso-line-height-rule: exactly;
                              line-height: 16px;
                              font-weight: normal;
                            "
                            class="font_20"
                          >
                            <span style="line-height: 24px;font-size: 20px">Hare Krishna, </span>
                          </td>
                          
                        </tr>
                        <tr>
                          <td
                            valign="top"
                            style="
                              font-family: Helvetica, Arial, 'sans-serif';
                              padding: 0px 0px 10px 0px;
                              color: #262727;
                              font-size: 14px;
                              line-height: 24px;
                              letter-spacing: -0.01em;
                              mso-line-height-rule: exactly;
                              font-weight: normal;
                            "
                            class="font_20"
                          >
                            <span style="line-height: 20px;font-size: 20px;">
                              <b>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</b></span
                            >
                          </td>
                        </tr>
                        <tr>
                          <td
                            valign="top"
                            style="
                              font-family: Helvetica, Arial, 'sans-serif';
                              padding: 0px 0px 20px 0px;
                              color: #262727;
                              font-size: 14px;
                              line-height: 24px;
                              letter-spacing: -0.01em;
                              mso-line-height-rule: exactly;
                              font-weight: normal;
                            "
                            class="font_20"
                          >
                            <span style="line-height: 24px; font-size: 16px"
                              >Click on below button to reset your password:<br />
                            </span>
                            <a href=${data.resetPasswordLink} target="_blank">
                            <button style="
                              background: linear-gradient(97.85deg, #ffaf2a 0.95%, #ffc666 100%);
                              font-weight: 500;
                              font-size: 1.2rem;
                              box-shadow: rgba(242, 178, 73, 0.59) 0px 9px 12px;
                              border-radius: 6px;
                              color: #06386b;
                              padding: 0.8rem 2rem;
                              font-family:Product Sans;
                              border: none;
                              cursor: pointer;
                              margin-top: 20px;
                            ">OPEN</button>
                          </a>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding-top: 0px; padding-left: 0px;"
                            bgcolor="#FFFFFF"
                            class="p_lr_10"
                            >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tr>
                                <td class="p_lr_10">
                                  <table
                                    width="100%"
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                    style="
                                        background-image: url('cid:patternbody');
                                    "
                                    >
                                    <tr>
                                      <td
                                        valign="top"
                                        width="50"
                                        style="padding-right: 10px;padding-bottom: 20px;"
                                      >
                                        <a href="">
                                          <img
                                            src="cid:krishnalogo"
                                            width="60"
                                            alt="FOE"
                                            border="0"
                                        /></a>
                                      </td>
                                  
                                      <td>
                                        <table
                                          width="100%"
                                          border="0"
                                          cellspacing="0"
                                          cellpadding="0"
                                        >
                                          <tr>
                                            <td
                                              valign="top"
                                              style="
                                                font-family: Helvetica, Arial,
                                                  'sans-serif';
                                                padding: 0px 0px 5px 0px;
                                                color: #233334;
                                                font-size: 14px;
                                                line-height: 16px;
                                                mso-line-height-rule: exactly;
                                                text-align: left;
                                                font-weight: 500;
                                              "
                                              class="font_20"
                                            >
                                              Thanks & Regards
                                            </td>
                                          </tr>

                                          <tr>
                                            <td
                                              valign="top"
                                              style="
                                                font-family: Helvetica, Arial,
                                                  'sans-serif';
                                                padding: 0px 0px 0px 0px;
                                                color: #233334;
                                                font-size: 16px;
                                                line-height: 16px;
                                                mso-line-height-rule: exactly;
                                                text-align: left;
                                                font-weight: normal;
                                              "
                                              class="font_20"
                                            ></td>
                                          </tr>

                                          <tr>
                                            <td
                                              valign="top"
                                              style="
                                                font-family: Helvetica, Arial,
                                                  'sans-serif';
                                                padding: 0px 0px 5px 0px;
                                                color: #233334;
                                                font-size: 14px;
                                                line-height: 16px;
                                                mso-line-height-rule: exactly;
                                                text-align: left;
                                                font-weight: 550;
                                              "
                                              class="font_20"
                                            >
                                              ISKCON Youth Forum
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              valign="top"
                                              style="
                                                font-family: Helvetica, Arial,
                                                  'sans-serif';
                                                padding: 0px 0px 24px 0px;
                                                color: purple;
                                                font-size: 16px;
                                                line-height: 16px;
                                                mso-line-height-rule: exactly;
                                                text-align: left;
                                                font-weight: 500;
                                              "
                                              class="font_20"
                                            >
                                              ISKCON WhiteField
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="">
                        <img
                            src="cid:krishna"
                            width="100%"
                            height="100%"
                            alt="FOE"
                            style=""
                        />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 0px 20px 20px 20px" class="p_lr_10">
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  bgcolor="#FAFAFA"
                  style="
                    background-image: url('cid:patternbody')
                  "
                >
                  <tr>
                    <td
                      valign="top"
                      align="center"
                      style="
                        font-family: Noto Sans JP, Helvetica, Arial,
                          'sans-serif';
                        padding: 20px 0px 0px 0px;
                        color: #000000;
                        font-size: 14px;
                        line-height: 26px;
                        font-weight: 600;
                        mso-line-height-rule: exactly;
                        text-align: center;
                      "
                    >
                      Need More Information?<br /><a
                        target="_blank"
                        href="https://iskconwhitefield.org/"
                        >We are here, visit our official website</a
                      >
                      <br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
    }
    let info = await transporter.sendMail({
      from: `"FOE FollowUp" <${emailsender}>`, // sender address
      to: data.email, // list of receivers
      subject: osubject, // Subject line
      html: ohtml, // html body
      attachments:attachment
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