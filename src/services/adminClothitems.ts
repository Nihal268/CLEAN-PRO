import { ObjectId } from "mongoose";
import { ClothItem, IClothItem, IPrice } from "../models/clothItem"

function capitalizeFirstWord(sentence: string) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
}


export const addClothItem = async (name: string, category: string, icon: number[], prices: IPrice) => {
  const nameTitleCased = capitalizeFirstWord(name)
  const categoryTitleCased = capitalizeFirstWord(category)
  const newClothItem = await ClothItem.create({ name: nameTitleCased, category: categoryTitleCased, icon, prices });
  return newClothItem;
}

export const deleteClothItem = async (id: ObjectId) => {

    const result = await ClothItem.findByIdAndDelete(id);
   return result
};

export const fetchClothesByNameAndCategory = async (name: string, category: string) => {

  const nameTitleCased = capitalizeFirstWord(name)
  const categoryTitleCased = capitalizeFirstWord(category)

  const clothItem = await ClothItem.findOne({
    name: nameTitleCased,
    category: categoryTitleCased
  });

  return clothItem;
};

export const fetchAllClothitems = async () => {
  const clothitems = await ClothItem.find()
  return clothitems
}