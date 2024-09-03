import { Order } from "../models/order";


export const fetchAllUserOrders = async () => {
  const orders = await Order.find()
  return orders
}

export const GiveOrdersMonthlyEntry = async () => {

  const result = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }
        },
        orderCount: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1
      }
    }
  ]);
  
  console.log(result);
  return result
  }

  
  export const findOrderById = async (orderId:string) => {
    const orders = await Order.findByIdAndUpdate(
      orderId,
      { status: 'cancelled' },
      { new: true } 
    );

    return orders
  }