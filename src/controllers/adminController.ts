import { Request, Response } from 'express';
import { fetchAdmin } from '../services/adminLogin';
import { fetchAllUser, fetchUserById } from '../services/adminUser';
import { fetchAllAgents, addAgent, fetchAgent } from '../services/adminAgent';
import { addMap, fetchMapByPlace, fetchAllMaps, fetchMapById } from '../services/adminMap';
import { fetchAllClothitems, addClothItem, fetchClothesByNameAndCategory } from '../services/adminClothitems';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt'
import { IAdmin ,Admin} from '../models/admin';
import { getAllOrders } from '../services/order';
import { GiveOrdersMonthlyEntry } from '../services/adminOrder';

  const createAdmin = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await securePassword('nihal');

    const admin = new Admin({
      name: 'Muhammed Nihal',
      mobile: 1234567890,
      email: 'nihal@gmail.com',
      password: hashedPassword
    });

    const savedAdmin = await admin.save();
    console.log('Admin saved successfully:', savedAdmin);
  } catch (error) {
    console.error('Error saving admin:', error);
  }
}

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
        const correctPassword = await comparePassword(agent.password, password)
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

export default {

  createAdmin,
  adminLogin,
  dashboard,
  usersDetails,
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