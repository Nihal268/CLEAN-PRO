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


export const manageRemoveFromCart = async (userId: string, itemId: string, service: 'wash' | 'dryClean' | 'iron') => {
  let cart = await Cart.findOne({ userId })
  if (!cart) {
    return false
  }

  const existingItemIndex = cart.items.findIndex(cartItem =>
    cartItem.clothItemId.toString() === itemId && cartItem.service === service
  );

  if (existingItemIndex > -1) {
    cart.items.splice(existingItemIndex, 1)
    await cart.save()
    return true
  }
  return false
}


export const manageChangeItemCount = async (userId: string, itemId: string, service: 'wash' | 'dryClean' | 'iron', count: number) => {
  let cart = await Cart.findOne({ userId })
  if (!cart) {
    return false
  }

  const existingItemIndex = cart.items.findIndex(cartItem =>
    cartItem.clothItemId.toString() === itemId && cartItem.service === service
  );

  if (existingItemIndex > -1) {
    if(count > 1){
      cart.items[existingItemIndex].quantity = count;
    }else{
      cart.items[existingItemIndex].quantity += count;
    }
    await cart.save()
    return true
  }
  return false
}