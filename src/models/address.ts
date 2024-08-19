import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAddress extends Document {
  userId: mongoose.Types.ObjectId;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  isDefault: boolean;
}

const addressSchema: Schema<IAddress> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  street: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Address: Model<IAddress> = mongoose.model<IAddress>('Address', addressSchema);

export { Address, IAddress };