import { ObjectId } from "mongoose"
import { Agent } from "../models/agent"



export const addAgent = async (name: string, email: string, password: string, mobile: number, map: ObjectId) => {
  const newAgent = await Agent.create({ name, mobile, password, email, map })
  return newAgent
}

export const editAgent = async (userId: string, name?: string, age?: number, email?: string, password?:string, map?:ObjectId) => {
  const editAgent = await Agent.findByIdAndUpdate(
    userId, 
    {
      name, 
      age, 
      email, 
      password, 
      map 
    }           
  );
   return editAgent
}

export const fetchAllAgents = async () => {
  const agent = await Agent.find()
  return agent
}

export const deleteAgent = async (id: ObjectId) => {

  const result = await Agent.findByIdAndDelete(id);
 return result
};

export const fetchAgent = async (email: string) => {
  const agent = await Agent.findOne({ email })
  return agent
}

export const findAgentByMapId = async (mapId: string) => {
  const agent = await Agent.findOne({ map: mapId })
  return agent
}