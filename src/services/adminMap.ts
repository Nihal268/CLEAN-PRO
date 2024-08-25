import { Map } from "../models/map"


export const addMap = async (sl_no:number,place: string, latitude_longitude: [number, number][]) => {
    const newMap = await Map.create({ sl_no , place, latitude_longitude })
    return newMap
  }

  export const fetchMapByPlace = async (place: string) => {
    const map = await Map.aggregate([
      {
        $match: {
          place: place
        }
      }
    ]);
    
    return map;
  };

  
  export const fetchAllMaps = async () => {
    const map = await Map.find()
    return map
  }