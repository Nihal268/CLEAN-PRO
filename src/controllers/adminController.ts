import { Request, Response } from 'express';
import { fetchAdmin } from '../services/admin';
import {  fetchAllUser } from '../services/user';
import {  fetchClothesByCategory,addClothItem,fetchClothesByNameAndCategory } from '../services/clothItem';





const adminLogin = async (req: Request, res: Response) => {
    try {
      const {  email } = req.body;
      console.log(email)

    const admin = await fetchAdmin(email)
    //also need agent data too after creating  model do that
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
            // data: agent
          });
    }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


  const userDetails = async (req: Request, res: Response) => {
    try {
      const user = await fetchAllUser()
    if(user){
        return res.status(200).json({
            success: true,
            message: `user`,
            data: user
          });
    }else{
        return res.status(400).json({
            success: false,
            message: `error`,
            // data: 
          });
    }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  const request = async (req: Request, res: Response) => {
    try {
   
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  const items = async (req: Request, res: Response) => {
    try {
      
     const items = await fetchClothesByCategory()
     if(items){
      return res.status(200).json({
          success: true,
          message: `items`,
          data: items
        });
  }else{
      return res.status(400).json({
          success: false,
          message: `error`,
          // data: 
        });
  }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  export const addItems = async (req: Request, res: Response) => {
    try {
      const { name, category, icon, prices } = req.body;
  
      const existingItem = await fetchClothesByNameAndCategory( name, category );
  
      if (existingItem) {
        return res.status(400).json({
          success: false,
          message: 'A cloth item with the same name and category already exists.',
        });
      }
  
      const newClothItem = await addClothItem(name, category, icon, prices);
      
      return res.status(201).json({
        success: true,
        message: 'Cloth item created successfully',
        data: newClothItem,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  // const offers = async (req: Request, res: Response) => {
  //   try {
   
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // };

  // const addOffers = async (req: Request, res: Response) => {
  //   try {
   
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // };

  const agents = async (req: Request, res: Response) => {
    try {
   
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  const addAgents = async (req: Request, res: Response) => {
    try {
   
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
export default {
    adminLogin,
    userDetails,
    request,
    items,
    addItems,
    // offers,
    // addOffers,
    agents,
    addAgents
}