import { ClothItem ,IClothItem ,IPrice} from "../models/clothItem"


export const addClothItem = async (name: string, category: string, icon: string, prices: IPrice[]) => {
  const newClothItem = await ClothItem.create({ name, category, icon, prices });
  return newClothItem;
}


export const fetchClothesByNameAndCategory = async (name: string, category: string) => {
  const clothItems = await ClothItem.find({
    name: name,
    category: category
  });
  
  return clothItems;
};

export const fetchAllClothitems = async ()=>{
    const clothitems = await ClothItem.find()
    return clothitems
}