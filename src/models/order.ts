import mongoose, { Schema, Document, Model } from 'mongoose';

interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  clothItems: mongoose.Types.ObjectId[];
  addressId: mongoose.Types.ObjectId;
  status: string;
  totalPrice: number;
  deliveryMode: string;
  createdAt: Date;
  updatedAt: Date;
}


const orderSchema: Schema<IOrder> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clothItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothItem',
    required: true
  }],
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['orderPlaced', 'orderConfirmed', 'inProgress', 'readyForPickup', 'delivered', 'paymentCollected', 'cancelled'],
    default: 'orderPlaced'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  deliveryMode: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);

export { Order, IOrder };
