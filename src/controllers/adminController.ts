import { Request, Response } from 'express';
import { fetchAdmin } from '../services/adminLogin';
import {  fetchAllUser } from '../services/adminUser';
import { fetchAllAgent,addAgent,fetchAgent } from '../services/adminAgent';
import {  fetchAllUserOrders } from '../services/adminOrder';
import {  fetchAllClothitems,addClothItem,fetchClothesByNameAndCategory } from '../services/adminClothitems';





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

  const dashboard = async (req: Request, res: Response) => {
    try {
   
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
      const user = await fetchAllUser()
      const order = await fetchAllUserOrders()

   
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  const items = async (req: Request, res: Response) => {
    try {
      
     const items = await fetchAllClothitems()
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

  const map = async (req: Request, res: Response) => {
    try {
  

   
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  const addMap = async (req: Request, res: Response) => {
    try {

      const { place, email, password ,mobile , map } = req.body;

   
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
      const agents = await fetchAllAgent()

      if(agents){
        return res.status(200).json({
            success: true,
            message: `items`,
            data: agents
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

  const addAgents = async (req: Request, res: Response) => {
    try {
      const { name, email, password ,mobile , map } = req.body;

      const existingAgent = await fetchAgent( email );
  
      if (existingAgent) {
        return res.status(400).json({
          success: false,
          message: 'The agent already exist already exists.',
        });
      }
   
      const newAgent = await addAgent(name, email, password, mobile);
      
      return res.status(201).json({
        success: true,
        message: 'The agent created successfully',
        data: newAgent,
      });

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
export default {
    adminLogin,
    dashboard,
    userDetails,
    request,
    items,
    addItems,
    map,
    addMap,
    // offers,
    // addOffers,
    agents,
    addAgents,
   
}