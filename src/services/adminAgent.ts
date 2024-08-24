import { Agent } from "../models/agent"



export const addAgent = async (name: string, email: string, password: string, mobile: number) => {
    const newAgent = await Agent.create({ name, mobile, password, email })
    return newAgent
  }

  export const fetchAllAgent = async () => {
    const agent = await Agent.find()
    return agent
  }

  export const fetchAgent = async (email: string) => {
    const agent = await Agent.findOne({ email })
    return agent
  }