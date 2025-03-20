'use strict';
const crypto = require('crypto');
const mailer = require("nodemailer");
const OAuth = require('oauth-1.0a');
const dayjs = require("dayjs");
const path = require("path");
const config = require('./config');

class Util {
    constructor() { 
      this.encryptDecryptKey = 'ABCDEFGH'
      this.smtpSetting = "";
    }

    getDefaultAPIServer() {
      return config.netsuite_default_server;
    }

    getBaseRestURL(apiServer='PROD') {
      let baseURL = config.base_url_rest_prod;
      if(apiServer == 'SB1'){
        baseURL =  config.base_url_rest_sb1;
      }
      else if(apiServer == 'SB2'){
        baseURL =  config.base_url_rest_sb2;
      }
      return baseURL;
    }

    getBaseSuiteQLURL(apiServer='PROD') {
      let baseURL = config.base_url_sql_prod;
      if(apiServer == 'SB1'){
        baseURL =  config.base_url_sql_sb1;
      }
      else if(apiServer == 'SB2'){
        baseURL =  config.base_url_sql_sb2;
      }
      return baseURL;
    }

    createOAuthHeader(requestURL,methodType,apiServer='PROD') {
      let netSuiteConsumerToken = config.netSuiteConsumerToken_prod;
      let netSuiteTokenKeySecret = config.netSuiteToken_prod;
      let netSuiteRelam = config.realm_prod;
      if(apiServer == 'SB1'){
        netSuiteConsumerToken = config.netSuiteConsumerToken_sb1;
        netSuiteTokenKeySecret = config.netSuiteToken_sb1;
        netSuiteRelam = config.realm_sb1;
      }
      else if(apiServer == 'SB2'){
        netSuiteConsumerToken = config.netSuiteConsumerToken_sb2;
        netSuiteTokenKeySecret = config.netSuiteToken_sb2;
        netSuiteRelam = config.realm_sb2;
      }

      const request_data = {
          url: requestURL,
          method: methodType,
          headers: {
              'Content-Type': 'application/json',
              'Prefer': 'transient'
          }
      };
      
      const oauth = OAuth({
          consumer: netSuiteConsumerToken,
          signature_method: 'HMAC-SHA256',
          nonce_length:11,
          hash_function(base_string, key) {
              return crypto
                  .createHmac('sha256', key)
                  .update(base_string)
                  .digest('base64');
          }
      });
  
      const buildAuthorizationHeader = (authData) => {
          const headerParts = [];
          for (const [key, value] of Object.entries(authData)) {
              const encodedValue = encodeURIComponent(value);
              headerParts.push(`${key}="${encodedValue}"`);
          }
          return `OAuth ${headerParts.join(', ')}`;
      };
  
      const authorizationData = oauth.authorize(request_data,netSuiteTokenKeySecret);

      //Below code check for allowed Valid keys and remove extra keys added to authorization header
      const validKeys = ['oauth_consumer_key','oauth_nonce','oauth_signature_method','oauth_timestamp','oauth_version','oauth_token','oauth_signature'];
      const authDataAllKeys = Object.keys(authorizationData);
      authDataAllKeys.forEach(function(d){
          if(validKeys.indexOf(d) == -1){
              delete authorizationData[d];
          }
      });
      
      const authHeader = buildAuthorizationHeader({
          realm: netSuiteRelam,
          ...authorizationData
      });
  
      const headers = {
          ...request_data.headers,
          'Authorization': authHeader,
          'user-agent': "NetSuite ETL"
      };

      return headers;
    }
    
    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    sendEmail(fromAddress, toAddress, subject, messageBodyHTML, messageBodyText, emailAttachments,callBack) {
      // Use Smtp Protocol to send Email
      let smtpTransport =  mailer.createTransport(this.smtpSetting);
      smtpTransport.sendMail({
        from: fromAddress,
        to: toAddress,
        subject: subject,
        text: messageBodyText,
        html: messageBodyHTML,
        attachments: emailAttachments
      }
        , function (error, response) {
          smtpTransport.close();
          if (error) {
            console.log(error);
            if(callBack){
              callBack(error);
            }
          } else {
            //console.log(response);
            if(callBack){
              callBack(null,"Email Sent");
            }
          }
        });
    }

    RandomString(length) {
      var allowedChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var result = '';
      for (var i = length; i > 0; --i)
        result += allowedChar[Math.floor(Math.random() * allowedChar.length)];
      return result;
    }

    encryptString(stringToEncrypt){
      let mykey = crypto.createCipher('aes-128-cbc', this.encryptDecryptKey);
      let mystr = mykey.update(stringToEncrypt, 'utf8', 'hex')
      mystr += mykey.final('hex');
      return mystr;
    }

    decryptString(stringToDecrypt){
      let mykey = crypto.createDecipher('aes-128-cbc', this.encryptDecryptKey);
      let mystr = mykey.update(stringToDecrypt, 'hex', 'utf8')
      mystr += mykey.final('utf8');
      return mystr;
    }

    formatCurrency(price){
      return price.toLocaleString("en-US", { style: 'currency', currency: 'USD' });
    }
}

module.exports = new Util();