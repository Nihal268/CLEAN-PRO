import { IDeliveryModeParams } from "../interface/interface";
import { ICartItem } from "../models/cart";
import { IClothItem } from "../models/clothItem";
import { DeliveryMode, IDeliveryMode } from "../models/deliveryMode";
import { Order } from "../models/order";
import { fetchUserCartItems } from "./cart";



export const calculateTotalAmount = async (userId: string, deliveryMode: IDeliveryModeParams): Promise<number> => {
  const cartItems = await fetchUserCartItems(userId) as ICartItem[]
  if (!cartItems) return 0;

  let totalAmount = 0;
  for (const item of cartItems) {
    const service = item.service;
    const clothItem = item.clothItemId as unknown as IClothItem
    const price = clothItem.prices[service]
    const itemTotal = price * item.quantity
    totalAmount += itemTotal;
  }

  if (deliveryMode === 'express') {
    const deliveryModeDetails = await DeliveryMode.findOne({ mode: 'express' }) as IDeliveryMode;
    totalAmount += deliveryModeDetails.rate;
  }
  return totalAmount;
}



export const createOrder = async (userId: string, addressId: string, deliveryMode: IDeliveryModeParams) => {
  const clothItems = await fetchUserCartItems(userId)

  if (clothItems) {
    const itemsWithPrices = clothItems.map(item => {
      const clothItem = item.clothItemId as unknown as IClothItem
      const price = clothItem.prices[item.service];

      return {
        clothItemId: clothItem._id,
        name: clothItem.name,
        category: clothItem.category,
        quantity: item.quantity,
        service: item.service,
        unitPrice: price,
      };
    })
    console.log(itemsWithPrices)

    const totalPrice = await calculateTotalAmount(userId, deliveryMode)
    const newOrder = await Order.create({ userId, addressId, deliveryMode, totalPrice, clothItems: itemsWithPrices })
    return newOrder
  }
}


export const fetchAllUserOrders = async (userId: string) => {
  const orders = await Order.find({ userId })
  return orders
}

export const getAllOrders = async () => {
  const orders = Order.find()
    .populate("userId")
    .populate("addressId")
    .sort({ createdAt: -1 });
  return orders
}



