import express, { Request, Response } from 'express';
import userController from "../controllers/userController"

const userRoute = express.Router();

userRoute.post('/sendOtp',(req: Request, res: Response) => userController.sendOtp(req,res))

userRoute.post('/verifyOtp',(req:Request,res:Response) => userController.verfiyOtp(req,res))

userRoute.post('/singUp',(req:Request,res:Response) => userController.signUp(req,res))

userRoute.post('/singUp',(req:Request,res:Response) => userController.signUp(req,res))



export default userRoute ;