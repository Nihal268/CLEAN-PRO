import { Request, Response } from 'express';
import { fetchAdmin } from '../services/admin';


const adminLogin = async (req: Request, res: Response) => {
    try {
      const {  email } = req.body;
      console.log(email)

    const admin = await fetchAdmin(email)
    if(admin){
        return res.status(200).json({
            success: true,
            message: `Admin`,
            data: admin
          });
    }else{
        return res.status(200).json({
            success: true,
            message: `Delivery Boy`,
            data: admin
          });
    }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

export default {
    adminLogin
}