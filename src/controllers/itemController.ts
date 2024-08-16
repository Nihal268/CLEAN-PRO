import { Request, Response } from 'express';
import { fetchClothesByCategory } from '../services/clothItem';

export const getAllClothItems = async (req: Request, res: Response) => {
  const clothItems = await fetchClothesByCategory()
  if (clothItems) {
    return res.status(200).json({
      success: true,
      data: clothItems
    });
  }

  return res.status(400).json({
    success: false,
    message: 'Unable to fetch items'
  });
}

export default {
  getAllClothItems
}