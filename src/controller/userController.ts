
import { Request, Response } from 'express';

export class UserController {

  public async login(req: Request, res: Response): Promise<void> {

    res.send("Login successfull"); 
  }

  public async otpLogin(req: Request, res: Response): Promise<void> {

    res.send("Login successfull"); 
  }

public async userSignup(req: Request, res: Response): Promise<void> {

  res.send("Login successfull"); 
}

public async itemPage(req: Request, res: Response): Promise<void> {

  res.send("Login successfull"); 
}

public async cart(req: Request, res: Response): Promise<void> {

  res.send("Login successfull"); 
}
}

export const userController = new UserController();
