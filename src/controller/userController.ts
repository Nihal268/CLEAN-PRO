
import { Request, Response } from 'express';

export class UserController {

   async login(req: Request, res: Response) {
          
    const { phone } = req.body;
      const user = {
        mobile:req.body.phone
      }
    if (!phone) {
      return res.status(400).send('Phone number is required');
    }

    req.session.user = phone;

    res.send('Phone number saved to session successfully');
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
