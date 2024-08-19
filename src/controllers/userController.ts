import { Request, Response } from 'express';
import { sendSMS }  from '../services/sms';
import { generateOtp, getSavedOtp, saveOtp } from '../services/otp';
import { addUser, fetchUser } from '../services/user';
import bcrypt from 'bcrypt'

// want to get this change
const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const otp = generateOtp()
    const smsSent = await sendSMS(email, otp);

    if (smsSent) {
      const otpSaved = await saveOtp(email, otp)
      if (!otpSaved) {
        return res.status(500).json({
          success: false,
          message: 'Failed to handle OTP. Please try again.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Otp sent successfully',
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    console.log(otp,email)
    const savedOtp = await getSavedOtp(email)

    if (!savedOtp) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or has expired',
      });
    }

    if (savedOtp.otp === otp) {
      const user = await fetchUser(email)
      return res.status(200).json({
        success: true,
        message: 'Entered OTP is correct',
        data: user
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Entered OTP is incorrect',
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const securePassword = async (password: string) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error);
  }
};


const signUp = async (req: Request, res: Response) => {
  try {
    const { name,email,password, mobile   } = req.body;
    console.log(name);
    console.log(mobile);

    const hashedPassword = await securePassword(password)
    console.log('Hashed passwprd', hashedPassword);

    const userExist = await fetchUser(mobile)
    if(userExist){
      console.log('USER ALREADY EXISTS');
      return res.status(400).json({
        success: false,
        message: 'User already exists',
        data: userExist
      });
    }

    const savedUser = await addUser(name, email, hashedPassword as string,mobile)
    if (savedUser) {
      console.log('USER CREATED');
      return res.status(200).json({
        success: false,
        message: 'New user created',
        data: savedUser
      });

    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


export default {
  sendOtp,
  verifyOtp,
  signUp
}