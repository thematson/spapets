var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'kwpetspa@gmail.com',
           pass: 'Password1@'
       }
   });

   module.exports = app => {

    
   }