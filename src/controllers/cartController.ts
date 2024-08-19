import { Request, Response } from 'express';
import { manageAddToCart, manageChangeItemCount, manageRemoveFromCart } from '../services/cart';

const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, service, items } = req.body;

    if (!userId || !service || !items) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const addedToCart = await manageAddToCart(userId, items, service)

    if (addedToCart) {
      return res.status(200).json({
        success: false,
        message: 'Items added to cart',
        data: addedToCart
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Failed adding to cart. Please try again.',
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, itemId, service } = req.body;

    if (!userId || !itemId || !service) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const validServices = ['wash', 'dryClean', 'iron'];
    if (!validServices.includes(service)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service type.',
      });
    }

    const removedItem = await manageRemoveFromCart(userId, itemId, service)
    if (removedItem) {
      return res.status(200).json({
        success: true,
        message: 'Item removed from cart.',
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Failed to remove from cart. Please try again.',
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


const changeItemCount = async (req: Request, res: Response) => {
  try {
    const { userId, itemId, service, count } = req.body;

    if (!userId || !itemId || !service || !count) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const validServices = ['wash', 'dryClean', 'iron'];
    if (!validServices.includes(service)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service type.',
      });
    }
    const updatedCount = await manageChangeItemCount(userId, itemId, service, count)
    if (updatedCount) {
      return res.status(200).json({
        success: true,
        message: 'Item count changed.',
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Failed to update count. Please try again.',
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}



export default {
  addToCart,
  removeFromCart,
  changeItemCount,
}