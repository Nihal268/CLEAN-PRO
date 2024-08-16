
// import { Request, Response } from 'express';
// const generateOtp = require("otp-generator");
// import bcrypt from 'bcrypt';
// import {User} from '../models/user'

// function generateOTP() {
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   return otp.toString();
// }

// const securePassword = async (password: string) => {
//   try {
//     const passwordHash = await bcrypt.hash(password, 10);
//     return passwordHash;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export class UserController {

// async login(req: Request, res: Response) {
          
//   const { phone } = req.body;
    
//   if (!phone) {
//     return res.status(400).send('Phone number is required');
//   }

//   const otp = generateOTP();
//   req.session.user = { phone, otp }; 

//   console.log("Generated OTP:", otp);
    
//     res.send('Phone number saved to session successfully');
//   }


// async otpLogin(req: Request, res: Response) {

//   const { otp } = req.body;

//   if (otp  == req.session.user?.otp) {
//     return res.status(400).send('Invalid OTP');
//   }

//   const phone = req.session.user?.phone;

//   const availableUser = await User.findOne({ mobile: phone });

//   if (!availableUser) {
//     const user = new User({ mobile: phone });
//     await user.save(); 
//   }

//     res.send(" successfull"); 
//   }

// async userSignup(req: Request, res: Response) {

//   res.send(" successfull");   
// }

// async itemPage(req: Request, res: Response) {

//   res.send(" successfull"); 
// }

// async cart(req: Request, res: Response) {

//   res.send(" successfull"); 
// }
// }

// export const userController = new UserController();
