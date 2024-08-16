import { Otp } from "../models/otp";

export const generateOtp = ()=>{
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const saveOtp = async (mobile:number, otp:string)=>{
  const otpSaved = await Otp.create({mobile, otp})
  return otpSaved
}

export const getSavedOtp = async (mobile: number) => {
  const savedOtp = await Otp.findOne({ mobile })
    .sort({ createdAt: -1 })
  return savedOtp;
}