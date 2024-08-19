import express, { Request, Response } from 'express';
import adminController from "../controllers/adminController"

const adminRoute = express.Router();

adminRoute.post('/adminLogin', (req: Request, res: Response) => adminController.adminLogin(req, res))


export default adminRoute;