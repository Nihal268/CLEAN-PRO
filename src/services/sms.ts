import nodemailer from 'nodemailer'

export const sendSMS = async (email: string, otp: string) => {
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
          To verify it's you, please enter the following one-time password (OTP):
        </p>
    
        <div style="margin: 20px 0; text-align: center;">
          <span
            id="otp"
            style="
              display: inline-block;
              padding: 10px 20px;
              font-size: 20px;
              font-weight: bold;
              color: #FFFFFF; /* OTP text color set to white */
              background-color: #007BFF;
              border-radius: 5px;
              letter-spacing: 2px;
              cursor: pointer;
            "
            onclick="copyOTP()"
            title="Click to copy"
          >
            ${otp}
          </span>
        </div>
    
        <p style="margin-top: 20px;">
          This OTP is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone.
        </p>
    
        <p style="margin-top: 20px;">
          If you did not initiate this request, please contact us immediately at 
          <a href="mailto:cleanproofficial1@gmail.com" style="color: #007BFF; text-decoration: none;">
            cleanproofficial1@gmail.com
          </a>.
        </p>
    
        <p style="margin-top: 30px;">Thank you for choosing Clean Pro Laundry Service!</p>
    
        <p style="margin-top: 20px;">Regards,</p>
        <p style="margin-top: 5px;"><strong>Clean Pro Laundry</strong></p>
      </div>
    
      <script>
        function copyOTP() {
          var otpText = document.getElementById("otp").innerText;
          navigator.clipboard.writeText(otpText).then(function() {
            alert("OTP copied to clipboard!");
          }, function(err) {
            alert("Failed to copy OTP: " + err);
          });
        }
      </script>
    `
        
    
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email has been sent:', info.response);
    return true;
  } catch (error: any) {
    console.log(error.message);
  }
};
