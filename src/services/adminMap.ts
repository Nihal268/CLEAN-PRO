import { ObjectId } from "mongoose";
import { Map } from "../models/map"


export const addMap = async (sl_no:number,place: string, latitude_longitude: [number, number][]) => {
    const newMap = await Map.create({ sl_no , place, latitude_longitude })
    return newMap
  }

  export const editMap = async (userId:string,sl_no?:number,place?: string, latitude_longitude?: [number, number][]) => {
    const editMap = await Map.findByIdAndUpdate(
      userId, 
      {
        sl_no, 
        place, 
        latitude_longitude
      }           
    );
     return editMap
  }

  export const fetchMapByPlace = async (place: string) => {
    const map = await Map.findOne({ place: place });
    return map;
  };

  export const deleteMap = async (id: ObjectId) => {

    const result = await Map.findByIdAndDelete(id);
   return result
};
  
  export const fetchAllMaps = async () => {
    const map = await Map.find()
    return map
  }

  export const fetchMapById = async (mapId: string) => {
    try {
      return await Map.findById(mapId).exec();
    } catch (error) {
      console.error('Error fetching map by ID:', error);
      return null;
    }
  };