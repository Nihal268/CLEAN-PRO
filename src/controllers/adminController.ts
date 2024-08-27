import { Request, Response } from 'express';
import { fetchAdmin } from '../services/adminLogin';
import {  fetchAllUser ,fetchUserById} from '../services/adminUser';
import { fetchAllAgent,addAgent,fetchAgent } from '../services/adminAgent';
import {  fetchAllUserOrders } from '../services/adminOrder';
import { Order } from "../models/order";
import {  addMap,fetchMapByPlace,fetchAllMaps,fetchMapById } from '../services/adminMap';
import {  fetchAllClothitems,addClothItem,fetchClothesByNameAndCategory } from '../services/adminClothitems';
import { ObjectId } from 'mongoose';





const adminLogin = async (req: Request, res: Response) => { 
    try { 
      const {  email ,password} = req.body;
      console.log(email,password)

    const admin = await fetchAdmin(email)

    if(admin?.password == password){

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

  
  export const userDetailsblocking = async (req: Request, res: Response) => {
    try {
      const {userId} = req.body;
  
      const user = await fetchUserById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.userStatus = !user.userStatus;
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: `User ${user.userStatus ? 'blocked' : 'unblocked'}`,
        data: user
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const request = async (req: Request, res: Response) => {
    try {
      const order = await Order.find()
      .populate("userId")
      .populate("addressId");
      
      if( order){
        return res.status(200).json({
            success: true,
            message: `user`,
            data: {order}
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
  
      const existingItems = await fetchClothesByNameAndCategory(name, category);
  
      if (existingItems.length > 0) {
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

      const maps = await fetchAllMaps()

      if(maps){
        return res.status(200).json({
            success: true,
            message: `items`,
            data: maps
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

  const addMaps = async (req: Request, res: Response) => {
    try {

      const {sl_no, place, latitude_longitude } = req.body;

      const existingmap = await fetchMapByPlace(place);


      if (existingmap) {
        return res.status(400).json({
          success: false,
          message: 'A map with the same place already exists.',
        });
      
    }
      const newMap = await addMap(sl_no , place,latitude_longitude)

      return res.status(201).json({
        success: true,
        message: 'Map created successfully',
        data: newMap,
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
      const { name, email, password, mobile, map  } = req.body; 
      console.log(map)
  
      const existingAgent = await fetchAgent(email);
      if (existingAgent) {
        return res.status(400).json({
          success: false,
          message: 'The agent already exists.',
        });
      }
  
      const Map = await fetchMapById(map);  
      if (!Map) {
        return res.status(404).json({
          success: false,
          message: 'Map not found.',
        });
      }
      const mapID = Map._id as ObjectId
      console.log(mapID,"ppppp")
      const newAgent = await addAgent(name, email, password, mobile, mapID );
      console.log(newAgent)
   
  
      return res.status(201).json({
        success: true,
        message: 'The agent was created successfully',
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
    userDetailsblocking, 
    request,
    items,
    addItems,
    map,
    addMaps,
    // offers,
    // addOffers,
    agents,
    addAgents,
   
}