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

userRoute.patch('/removeFromCart', (req: Request, res: Response) => cartController.removeFromCart(req, res))

userRoute.patch('/changeQuantity', (req: Request, res: Response) => cartController.changeItemCount(req, res))

userRoute.post('/addAddress', (req: Request, res: Response) => userController.addAddress(req, res))

userRoute.delete('/deleteAddress', (req: Request, res: Response) => userController.deleteAddress(req, res))

userRoute.patch('/editAddress', (req: Request, res: Response) => userController.editAddress(req, res))




export default userRoute;