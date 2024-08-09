
import { Request, Response } from 'express';

export class UserController {

   async login(req: Request, res: Response) {

    res.send(" successfull"); 
  }

   async otpLogin(req: Request, res: Response) {

    res.send(" successfull"); 
  }

 async userSignup(req: Request, res: Response) {

  res.send(" successfull"); 
}

 async itemPage(req: Request, res: Response) {

  res.send(" successfull"); 
}

 async cart(req: Request, res: Response) {

  res.send(" successfull"); 
}
}

export const userController = new UserController();
