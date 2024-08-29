import { Order } from "../models/order";


  export const AgentOrders = async (agentid: string) => {
    const agentorders = await Order.find({ agentId: agentid })
    return agentorders
  }


  export const fetchOrderById = async (orderid: string) => {
    const order = await Order.findById(orderid)
    return order
  }