import { Request, Response } from 'express';
import { manageAddToCart } from '../services/cart';


const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, service, items } = req.body;
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


export default {
  addToCart
}