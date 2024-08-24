import { Order } from "../models/order";


export const fetchAllUserOrders = async () => {
  const orders = await Order.find()
  return orders
}