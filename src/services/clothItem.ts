import { ClothItem ,IClothItem ,IPrice} from "../models/clothItem"

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

export const addClothItem = async (name: string, category: string, icon: string, prices: IPrice[]) => {
  const newClothItem = await ClothItem.create({ name, category, icon, prices });
  return newClothItem;
}



export const fetchClothesByNameAndCategory = async (name: string, category: string) => {
  const clothItems = await ClothItem.aggregate([
    {
      $match: {
        name: name,
        category: category
      }
    }
  ]);
  
  return clothItems;
};
