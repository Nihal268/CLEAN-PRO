import { ClothItem } from "../models/clothItem"

export const fetchClothesByCategory = async () => {
  const clothItems = await ClothItem.aggregate([
    {
      $group: {
        _id: "$category",
        items: { $push: "$$ROOT" },
        totalItems: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 } 
    }
  ])
  
  return clothItems
}