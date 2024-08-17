
<<<<<<< HEAD
const nodemailer=require('nodemailer')


const password=process.env.PASSWORD;
const adminEmail=process.env.EMAIL;


export  const sendSMS = async ( email:string, otp:string)=> {
=======
export  const sendSMS = async ( email: string, otp:string)=> {
>>>>>>> c5711379a6aa060c188a8c00792eb04c9d58fa32
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

    transporter.sendMail(mailOptions,  (error:any, info:any)=> {
      if (error) {
        console.log(error);
      } else {
        console.log('Email has been sent:', info.response);
      }
    });
  } catch (error:any) {
    console.log(error.message);
  }
};




