import { Request, Response } from 'express';
import { fetchAdmin } from '../services/adminLogin';
import { fetchAllUser, fetchUserById } from '../services/adminUser';
import { fetchAllAgents, addAgent, fetchAgent ,deleteAgent,editAgent,searchAgents} from '../services/adminAgent';
import { addMap, fetchMapByPlace, fetchAllMaps, fetchMapById ,deleteMap,editMap,searchMaps} from '../services/adminMap';
import { fetchAllClothitems, addClothItem, fetchClothesByNameAndCategory ,deleteClothItem,editClothItem,searchItems} from '../services/adminClothitems';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt'
import { IAdmin ,Admin} from '../models/admin';
import { getAllOrders } from '../services/order';
import { GiveOrdersMonthlyEntry ,findOrderById,searchOrder,searchOrdersByDates,searchOrdersByModes} from '../services/adminOrder';
import { sendSMS } from '../services/notifyToUser';




const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const securePassword = async (password: string) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error);
  }
};

const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)

    const admin = await fetchAdmin(email) 
    if (admin) {
      const correctPassword = await comparePassword(password,admin.password)
      if (correctPassword) {
        return res.status(200).json({
          success: true,
          message: `Admin`,
          data: admin
        });
      }
    } else {
      const agent = await fetchAgent(email)
      if (agent) {
        const correctPassword = await comparePassword( password,agent.password)
        if (correctPassword) {
          return res.status(200).json({
            success: true,
            message: `Agent`,
            data: agent
          });
        }
      }
    }
    return res.status(400).json({
      success: false,
      message: `Incorrect login details entered`,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const dashboard = async (req: Request, res: Response) => {
  try {
       const MonthlyUsers =  await GiveOrdersMonthlyEntry()

      

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const usersDetails = async (req: Request, res: Response) => {
  try {
    const user = await fetchAllUser()
    if (user) {
      return res.status(200).json({
        success: true,
        message: `user`,
        data: user
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `error`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export const userDetailsblocking = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await fetchUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
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
    const orders = await getAllOrders()

    if (orders) {
      return res.status(200).json({
        success: true,
        message: `user`,
        data: orders
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `error`,
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
    if (items) {
      return res.status(200).json({
        success: true,
        message: `items`,
        data: items
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `error fetching cloth items`,
        data: []
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
// console.log(icons)
    // const icon: string = String(icons);
console.log(icon)
    const existingItem = await fetchClothesByNameAndCategory(name, category);

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

export const deleteItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deleteitems= await deleteClothItem(id);

    if (deleteitems) {
      return res.status(200).json({
        success: true,
        message: `map with ID ${id} deleted successfully.`,
        data: deleteitems,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `map with ID ${id} not found.`,
      });
    }
  } catch (error) {
   console.log('internal server error message :'+error)
  }
};


const map = async (req: Request, res: Response) => {
  try {

    const maps = await fetchAllMaps()

    if (maps) {
      return res.status(200).json({
        success: true,
        message: `items`,
        data: maps
      });
    } else {
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

    const { sl_no, place, latitude_longitude } = req.body;

    const existingmap = await fetchMapByPlace(place);


    if (existingmap) {
      return res.status(400).json({
        success: false,
        message: 'A map with the same place already exists.',
      });

    }
    const newMap = await addMap(sl_no, place, latitude_longitude)

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

export const deleteMaps = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deletemaps= await deleteMap(id);

    if (deletemaps) {
      return res.status(200).json({
        success: true,
        message: `map with ID ${id} deleted successfully.`,
        data: deletemaps,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `map with ID ${id} not found.`,
      });
    }
  } catch (error) {
   console.log('internal server error message :'+error)
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
    const agents = await fetchAllAgents()

    if (agents) {
      return res.status(200).json({
        success: true,
        message: `agents list`,
        data: agents
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `error`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const addAgents = async (req: Request, res: Response) => {
  try {
    const { name, email, password, mobile, map } = req.body;

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

    const hashedPassword = await securePassword(password as string)
    console.log(mapID, "ppppp")
    const newAgent = await addAgent(name, email, hashedPassword as string, mobile, mapID);
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

export const deleteAgents = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deleteagents = await deleteAgent(id);

    if (deleteagents) {
      return res.status(200).json({
        success: true,
        message: ` item with ID ${id} deleted successfully.`,
        data: deleteagents,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: ` item with ID ${id} not found.`,
      });
    }
  } catch (error) {
   console.log('internal server error message :'+error)
  }
};

export const rejectOrder = async (req: Request, res: Response)=> {
  try {
    const { orderId } = req.body;

    const updatedOrder = await findOrderById(orderId)


    // If the order doesn't exist, return a 404 error
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Order status updated to cancelled.',
      data: updatedOrder,
    });
  } catch (error) {
    console.error('Error cancelling the order:', error);
  }
};


const notifyLaundryPickUp = async (req: Request, res: Response) => {
  try {
   
   const {email} = req.body;

   if (!email) {
    return res.status(400).send('Email is required');
  }
  const emailSent = await sendSMS(email); 

  if (emailSent) {
    res.status(200).send('Notification sent successfully');
  } else {
    res.status(500).send('Failed to send notification');

  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const editAgents = async (req: Request, res: Response) => {
  try {

   const {id,name,age,email,password,map} = req.body;

   const editagent = await editAgent(id, name, age, email, password, map);


   if (!editagent) {
    return res.status(400).send('Email is required');
  }

  if (editagent) {
    res.status(200).send('Notification sent successfully');

  } else {
    res.status(500).send('Failed to send notification');

  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const editMaps = async (req: Request, res: Response) => {
  try {

   const {userId,sl_no,place, latitude_longitude} = req.body;

   const editagent = await editMap(userId,sl_no,place, latitude_longitude);


   if (!editagent) {
    return res.status(400).send('Email is required');
  }

  if (editagent) {
    res.status(200).send('Notification sent successfully');

  } else {
    res.status(500).send('Failed to send notification');

  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const editClothItems = async (req: Request, res: Response) => {
  try {

   const {userId,name, category, icon , prices} = req.body;

   const editagent = await editClothItem(userId,name, category, icon , prices);


   if (!editagent) {
    return res.status(400).send('userId,name, category, icon , prices is required');
  }

  if (editagent) {
    res.status(200).send('successfully');

  } else {
    res.status(500).send('Failed ');

  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const searchOrders = async (req: Request, res: Response) => {
  try {

   const { orderstatus } = req.body;

   const searchOrders = await searchOrder(orderstatus);


   if (!searchOrders) {
    return res.status(400).send('orderstatus is required');
  }
  if (searchOrders) {
    res.status(200).send(' successfully');

  } else {
    res.status(500).send('Failed ');
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const searchOrdersByDate = async (req: Request, res: Response) => {
  try {

   const { date1,date2 } = req.body;

   const searchOrders = await searchOrdersByDates( date1,date2);


   if (!searchOrders) {
    return res.status(400).send(' date1,date2 is required');
  }
  if (searchOrders) {
    res.status(200).send(' successfully');

  } else {
    res.status(500).send('Failed');
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const searchOrdersByMode = async (req: Request, res: Response) => {
  try {

   const { mode } = req.body;

   const searchOrders = await searchOrdersByModes( mode);


   if (!searchOrders) {
    return res.status(400).send('Mode is required');
  }
  if (searchOrders) {
    res.status(200).send('successfully');

  } else {
    res.status(500).send('Failed ');
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const searchMap = async (req: Request, res: Response) => {
  try {

   const { sl_no, place} = req.body;

   const searchmap = await searchMaps(sl_no, place);


   if (!searchmap) {
    return res.status(400).send('sl_no, place is required');
  }
  if (searchmap) {
    res.status(200).send(' successfully');

  } else {
    res.status(500).send(' notification');
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const searchItem = async (req: Request, res: Response) => {
  try {

   const { name, category} = req.body;

   const searchitem = await searchItems(name, category);


   if (!searchitem) {
    return res.status(400).send('Name ,category is required');
  }
  if (searchitem) {
    res.status(200).send(' successfully');

  } else {
    res.status(500).send('Failed');
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const searchAgent = async (req: Request, res: Response) => {
  try {

   const { name, email} = req.body;

   const searchAgent = await searchAgents(name, email);


   if (!searchAgent) {
    return res.status(400).send('Name ,Email is required');
  }
  if (searchAgent) {
    res.status(200).send(' successfully');

  } else {
    res.status(500).send('Failed');
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
export default {

  adminLogin,
  dashboard,
  usersDetails,
  userDetailsblocking,
  request,
  items,
  addItems,
  deleteItems,
  map,
  addMaps,
  deleteMaps,
  // offers,
  // addOffers,
  agents,
  addAgents,
  deleteAgents,
  rejectOrder,
  notifyLaundryPickUp,
  editAgents,
   editMaps,
  editClothItems,
  searchOrders,
  searchOrdersByDate,
  searchOrdersByMode,
  searchMap,
  searchItem,
  searchAgent



}