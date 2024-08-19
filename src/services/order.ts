import { IDeliveryModeParams } from "../interface/interface";
import { ICartItem } from "../models/cart";
import { IClothItem } from "../models/clothItem";
import { DeliveryMode, IDeliveryMode } from "../models/deliveryMode";
import { Order } from "../models/order";
import { fetchUserCart, fetchUserCartItems } from "./cart";



export const calculateTotalAmount = async (userId: string, deliveryMode: IDeliveryModeParams): Promise<number> => {
  const cartItems = await fetchUserCartItems(userId) as ICartItem[]
  if (!cartItems) return 0;

  let totalAmount = 0;
  for (const item of cartItems) {
    const service = item.service;
    const clothItem = item.clothItemId as unknown as IClothItem
    const price = clothItem.prices[0][service]
    const itemTotal = price * item.quantity
    totalAmount += itemTotal;
  }

  if (deliveryMode === 'express') {
    const deliveryModeDetails = await DeliveryMode.findOne({ mode: 'express' }) as IDeliveryMode;
    totalAmount += deliveryModeDetails.rate;
  }
  return totalAmount;
}

// SMALL ISSUES IN THIS PART TO BE CHECKED
export const createOrder = async (userId: string, addressId: string, deliveryMode: IDeliveryModeParams) => {
  const cart = await fetchUserCart(userId)
  console.log('CART CART ', cart);
  
  const clothItems = await fetchUserCartItems(userId)
  const totalPrice = await calculateTotalAmount(userId, deliveryMode)
  const newOrder = await Order.create({ userId, addressId, deliveryMode, totalPrice, clothItems })
  return newOrder
}


export const fetchAllUserOrders = async (userId: string) => {
  const orders = await Order.find({ userId })
  .populate({
    path: 'clothItems', // Field to populate
    model: 'ClothItem' // Model to populate with
  });
  return orders
}