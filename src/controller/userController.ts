

import { Request, Response } from 'express';

export class UserController {
  public async login(req: Request, res: Response): Promise<void> {

    res.send("Login successfull"); 
  }
}

export const userController = new UserController();
