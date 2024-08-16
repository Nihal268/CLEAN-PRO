import { Request, Response } from 'express';
import { User } from '../models/user';
import { sendSMS } from '../services/sms';


export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ error: 'Invalid mobile number' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const smsSent = await sendSMS(mobile, otp);

    if (smsSent) {
      res.status(200).json({
        success: true,
        message: 'Otp sent successfully',
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
