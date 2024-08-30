import nodemailer from 'nodemailer'

export const sendSMS = async (email: string) => {
  try {

    const transporter = nodemailer.createTransport({
      host: 'SMTP.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      service: 'gmail',

      auth: {
        user: 'cleanproofficial1@gmail.com',
        pass: 'gvzz cscl wjlp mziq'

      }
    });
    const mailOptions = {
      from: 'cleanproofficial1@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `
    <div style="font-family: Arial, sans-serif; color: white;">
  <p>Dear <strong>[Customer Name]</strong>,</p>

  <p style="margin-top: 20px;">
    Thank you for choosing Clean Pro Laundry Service! We are pleased to inform you that our team member will be arriving shortly to collect your laundry order.
  </p>

  <p style="margin-top: 20px;">
    If you have any special instructions or need assistance, please feel free to let us know. Our goal is to provide you with the best service possible.
  </p>

  <p style="margin-top: 20px;">
    If you have any questions or need further assistance, please contact us at 
    <a href="mailto:cleanproofficial1@gmail.com" style="color: #007BFF; text-decoration: none;">
      cleanproofficial1@gmail.com
    </a>.
  </p>

  <p style="margin-top: 30px;">Thank you for trusting us with your laundry needs. We look forward to serving you!</p>

  <p style="margin-top: 20px;">Regards,</p>
  <p style="margin-top: 5px;"><strong>Clean Pro Laundry</strong></p>
</div>

    `
        
    
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email has been sent:', info.response);
    return true;
  } catch (error: any) {
    console.log(error.message);
  }
};
