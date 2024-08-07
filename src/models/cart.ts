import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICartItem {
  clothItemId: mongoose.Types.ObjectId;
  quantity: number;
}

interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema: Schema<ICart> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    clothItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClothItem',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
}, {
  timestamps: true
});


const Cart: Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);

export { Cart, ICart };
