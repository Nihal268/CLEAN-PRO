import express, { Request, Response } from 'express';
import adminController from "../controllers/adminController"

const adminRoute = express.Router();

adminRoute.post('/adminLogin', (req: Request, res: Response) => adminController.adminLogin(req, res))

adminRoute.get('/dashboard', (req: Request, res: Response) => adminController.dashboard(req, res))

adminRoute.get('/userDetails', (req: Request, res: Response) => adminController.userDetails(req, res))

adminRoute.get('/request', (req: Request, res: Response) => adminController.items(req, res))

adminRoute.get('/items', (req: Request, res: Response) => adminController.addItems(req, res))

adminRoute.get('/addItems', (req: Request, res: Response) => adminController.addItems(req, res))

// adminRoute.get('/offers', (req: Request, res: Response) => adminController.addItems(req, res))

// adminRoute.get('/addOffers', (req: Request, res: Response) => adminController.addItems(req, res))

adminRoute.get('/agents', (req: Request, res: Response) => adminController.addItems(req, res))

adminRoute.get('/addAgents', (req: Request, res: Response) => adminController.addItems(req, res))






export default adminRoute;