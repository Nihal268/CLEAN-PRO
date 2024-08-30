import { IDeliveryModeParams } from "../interface/interface";
import { ICartItem } from "../models/cart";
import { IClothItem } from "../models/clothItem";
import { DeliveryMode, IDeliveryMode } from "../models/deliveryMode";
import { Order } from "../models/order";
import { getAddressById } from "./address";
import { findAgentByMapId } from "./adminAgent";
import { fetchUserCartItems } from "./cart";
import { findMapContainingCoordinates } from "./map";



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

    // finding the agent for this order
    const address = await getAddressById(addressId)
    if (!address) { return false }

    const latitudeLongitude = address.location.coordinates;
    const mapId = await findMapContainingCoordinates(latitudeLongitude) as string
    if (!mapId) { return false }

    const agent = await findAgentByMapId(mapId)
    if (!agent) { return false }

    const newOrder = await Order.create({ userId, addressId, deliveryMode, totalPrice, clothItems: itemsWithPrices, agentId: agent._id })
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



