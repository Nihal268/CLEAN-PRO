import express from "express";
import { sendOtp } from "../controllers/userController";

const userRoute = express.Router();

userRoute.post('/send-otp', sendOtp)


export default userRoute ;