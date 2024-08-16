import { ICartItemsListRequest } from "../interface/interface";
import { Cart } from "../models/cart"
import { Types } from 'mongoose';


export const manageAddToCart = async (userId: string, items: ICartItemsListRequest[], service: 'wash' | 'dryClean' | 'iron') => {
  let cart = await Cart.findOne({ userId })
  if (!cart) {
    cart = await Cart.create({ userId, items: [] })
  }

  for (const item of items) {
    const existingItemIndex = cart.items.findIndex(cartItem =>
      cartItem.clothItemId.toString() === item.itemId && cartItem.service === service
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      const itemIdObj = new Types.ObjectId(item.itemId);
      cart.items.push({ clothItemId: itemIdObj, quantity: item.quantity, service })
    }
  }
  await cart.save()
  return cart
}