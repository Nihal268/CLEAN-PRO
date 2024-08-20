import mongoose, { Schema, Document, Model, Types } from 'mongoose';

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

interface IOrderItem {
  clothItemId: Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  service: 'wash' | 'dryClean' | 'iron';
  unitPrice: number;
}

const orderItemSchema: Schema<IOrderItem> = new Schema({
  clothItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothItem',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  service: {
    type: String,
    enum: ['wash', 'dryClean', 'iron'],
    required: true
  },
  unitPrice: {
    type: Number,
    required: true,
  },
});

const orderSchema: Schema<IOrder> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clothItems: [orderItemSchema],
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
