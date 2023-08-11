

const  passwordTemplate=`<!DOCTYPE html>
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
            style="background-image: url('./images/pattern.png')"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding-top: 20px; padding-bottom: px"
              >
              <div>
                <img
                  src="./images/isckonlogo1.png"
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
                    background-image: url('./images/patternbody.jpeg')
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
                            <span style="line-height: 24px">Hello, </span>
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
                            <span style="line-height: 20px">
                              Booking Request received for
                              <b>{{unit_name}}</b>.</span
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
                            <span style="line-height: 24px; font-size: 14px"
                              >Additional Details:<br />
                            </span>
                            <span style="line-height: 20px">
                              Lead Name : <b>{{lead_name}}</b><br />
                              Lead Email : <b>{{lead_email}}</b><br />
                              Quotation Price : <b>{{price}}</b><br />
                              Received By : <b>{{request_received_by}}</b><br />
                            </span>
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
                                        background-image: url('./images/patternbody.jpeg');
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
                                            src="./images/krishnalogo.png"
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
                            src="./images/krishna.png"
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
                    background-image: url('./images/patternbody.jpeg')
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
                        target=""
                        href=""
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