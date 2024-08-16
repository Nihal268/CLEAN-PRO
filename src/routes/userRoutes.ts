import express, { Request, Response } from 'express';
import userController from "../controllers/userController"
import itemController from "../controllers/itemController"
import cartController from '../controllers/cartController';

const userRoute = express.Router();

userRoute.post('/sendOtp', (req: Request, res: Response) => userController.sendOtp(req, res))

userRoute.post('/verifyOtp', (req: Request, res: Response) => userController.verifyOtp(req, res))

userRoute.post('/signUp', (req: Request, res: Response) => userController.signUp(req, res))

userRoute.get('/getItems', (req: Request, res: Response) => itemController.getAllClothItems(req, res))

userRoute.get('/addToCart', (req: Request, res: Response) => cartController.addToCart(req, res))




export default userRoute;