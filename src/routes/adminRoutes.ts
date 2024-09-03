import express, { Request, Response } from 'express';
import adminController from "../controllers/adminController"

const adminRoute = express.Router();


adminRoute.post('/adminLogin', (req: Request, res: Response) => adminController.adminLogin(req, res))  //needs completeion

adminRoute.get('/dashboard', (req: Request, res: Response) => adminController.dashboard(req, res))  //needs completeion

adminRoute.get('/userDetails', (req: Request, res: Response) => adminController.usersDetails(req, res))  //DONE

adminRoute.post('/userDetails/blocking', (req: Request, res: Response) => adminController.userDetailsblocking(req, res))  //DONE

adminRoute.get('/request', (req: Request, res: Response) => adminController.request(req, res))

adminRoute.get('/items', (req: Request, res: Response) => adminController.items(req, res))

adminRoute.post('/addItems', (req: Request, res: Response) => adminController.addItems(req, res))

adminRoute.post('/deleteItems', (req: Request, res: Response) => adminController.deleteItems(req, res))

adminRoute.get('/map', (req: Request, res: Response) => adminController.map(req, res))

adminRoute.post('/addMap', (req: Request, res: Response) => adminController.addMaps(req, res))

adminRoute.post('/deleteMap', (req: Request, res: Response) => adminController.deleteMaps(req, res))


// adminRoute.get('/offers', (req: Request, res: Response) => adminController.addItems(req, res))

// adminRoute.get('/addOffers', (req: Request, res: Response) => adminController.addItems(req, res))

adminRoute.get('/agents', (req: Request, res: Response) => adminController.agents(req, res))

adminRoute.post('/addAgents', (req: Request, res: Response) => adminController.addAgents(req, res))

adminRoute.post('/deleteAgents', (req: Request, res: Response) => adminController.deleteAgents(req, res))

adminRoute.post('/rejectOrder', (req: Request, res: Response) => adminController.rejectOrder(req, res))








export default adminRoute;