import { Otp } from "../models/otp";

export const generateOtp = ()=>{
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const saveOtp = async (email:string, otp:string)=>{
  const otpSaved = await Otp.create({email, otp})
  return otpSaved
}

export const getSavedOtp = async (email: string) => {
  const savedOtp = await Otp.findOne({ email })
    .sort({ createdAt: -1 })
  return savedOtp;
}