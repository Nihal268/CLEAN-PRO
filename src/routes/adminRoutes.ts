import express, { Request, Response } from 'express';
import userController from "../controllers/userController"

const adminRoute = express.Router();

// adminRoute.post('/', (req: Request, res: Response) => userController.sendOtp(req, res))


export default adminRoute;