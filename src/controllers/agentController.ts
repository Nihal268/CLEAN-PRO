import { Request, Response } from 'express';
import { AgentOrders,fetchOrderById} from '../services/agentRequest';
import { sendSMS } from '../services/notifyToUser';



const agentRequestpage = async (req: Request, res: Response) => {
    try {
    
     const { agentid }= req.body; 

     const Agentorders = await AgentOrders(agentid)    

     if (Agentorders) {
      return res.status(200).json({
        success: true,
        message: `user`,
        data: Agentorders
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `error`,
      });
    }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  const acceptORreject = async (req: Request, res: Response) => {
    try {
      const { orderid, orderStatus } = req.body;
  
      const order = await fetchOrderById(orderid);
  
      if (!order) {
        return res.status(404).send('Order not found');
      }
  
      if (orderStatus == 'accept') {
        order.status = 'orderConfirmed';
      } else if (orderStatus == 'reject') {
        order.status = 'cancelled';
      } else {
        return res.status(400).send('Invalid request: Specify accept or reject.');
      }
      await order.save();
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const printInvoice = async (req: Request, res: Response) => {
    try {
     
     const {orderid} =req.body;

     const order = await fetchOrderById(orderid);

     if (order) {
      return res.status(200).json({
        success: true,
        message: `user`,
        data: order
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `error`,
      });
    }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  const notifyLaundryPickUp = async (req: Request, res: Response) => {
    try {
     
     const {email} = req.body;

     if (!email) {
      return res.status(400).send('Email is required');
    }
console.log(1)
    const emailSent = await sendSMS(email); 
    console.log(12)

    if (emailSent) {
      res.status(200).send('Notification sent successfully');
      console.log(13)

    } else {
      res.status(500).send('Failed to send notification');
      console.log(14)

    }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  export default {
    agentRequestpage,
    acceptORreject,
    printInvoice,
    notifyLaundryPickUp
  }