import express, { Request, Response } from 'express';
import agentController from "../controllers/agentController"

const agentRoute = express.Router();


agentRoute.get('/agentRequestpage', (req: Request, res: Response) => agentController.agentRequestpage(req, res))  

agentRoute.post('/acceptORreject', (req: Request, res: Response) => agentController.acceptORreject(req,res))

agentRoute.get('/printInvoice', (req: Request, res: Response) => agentController.printInvoice(req,res))

agentRoute.post('/notifyLaundryPickUp', (req: Request, res: Response) => agentController.notifyLaundryPickUp(req,res))



export default agentRoute;