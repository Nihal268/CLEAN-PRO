import { Order } from "../models/order";


export const fetchAllUserOrders = async () => {
  const orders = await Order.find()
  return orders
}


export const searchOrder = async ( orderstatus?: string) => {
  const searchCriteria: any = {};

  if (orderstatus) {
    searchCriteria.orderstatus = { $regex: new RegExp(orderstatus, 'i') };
  }else{
    return "No such order available"

  }
  const searchResult = await Order.find({status:searchCriteria});
   return searchResult

  }

export const searchOrdersByDates = async (date1: number, date2: number) => {
  const searchCriteria: any = {};

  if (date1 && date2) {
    searchCriteria.createdAt = {
      $gte: new Date(date1),
      $lte: new Date(date2),
    };
  } else  {
    return "No such order available"
  } 
  const searchResult = await Order.find(searchCriteria);
  return searchResult;
};

export const searchOrdersByModes = async (mode:string) => {
  const searchCriteria: any = {};

  if (mode) {
    searchCriteria.mode = { $regex: new RegExp(mode, 'i') };
  } else  {
    return "No such order available"
  } 
  const searchResult = await Order.find({deliveryMode:searchCriteria.mode});
  return searchResult;
};

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