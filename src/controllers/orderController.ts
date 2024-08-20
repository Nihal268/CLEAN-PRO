import { Request, Response } from 'express';
import { deleteUserCart } from '../services/cart';
import { createOrder, fetchAllUserOrders } from '../services/order';

const confirmOrder = async (req: Request, res: Response) => {
  try {
    const { userId, addressId, deliveryMode } = req.body;

    if (!userId || !addressId || !deliveryMode) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const order = await createOrder(userId, addressId, deliveryMode)
    if (order) {
      // await deleteUserCart(userId)
      return res.status(200).json({
        success: true,
        data: order
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Failed to create order'
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


const fetchUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const userOrders = await fetchAllUserOrders(userId)
    console.log(userOrders);
    
    if (userOrders) {
      return res.status(200).json({
        success: true,
        data: userOrders
      }); 
    }

    return res.status(400).json({
      success: false,
      message: 'Failed to create order'
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}



export default {
  confirmOrder,
  fetchUserOrders
}