import mongoose, { Schema, Document, Model } from 'mongoose';


interface IDeliveryMode extends Document {
  mode: 'default' | 'express';
  rate: number;
}

const deliverySchema: Schema<IDeliveryMode> = new Schema({
  mode: {
    type: String,
    required: true,
    enum: ['default', 'express'],
    default: 'default'
  },
  rate: {
    type: Number,
    required: true
  },
})

const DeliveryMode: Model<IDeliveryMode> = mongoose.model<IDeliveryMode>('DeliveryMode', deliverySchema);

export { DeliveryMode, IDeliveryMode };