
const nodemailer=require('nodemailer')


const password=process.env.PASSWORD;
const adminEmail=process.env.EMAIL;


 export const sendSMS = async ( email:string, otp:string)=> {
  try {

    const transporter = nodemailer.createTransport({
      host: 'SMTP.gmail.com', 
      port: 587,
      secure: false,
      requireTLS: true,
      service:'gmail',
      
      auth: {
        user: 'nihalmuhaednihal@gmail.com',
        pass: 'wfge xhpl ejaq tnpw'
        
      }
    });
    const mailOptions = {
      from: 'nihalmuhaednihal@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `<p>Hi ${name}, please  check your otp for ${otp} to verify your email.</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email has been sent:', info.response);
    return true; 
  } catch (error:any) {
    console.log(error.message);
  }
};



