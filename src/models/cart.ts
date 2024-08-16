import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface ICartItem {
  clothItemId: Types.ObjectId;
  quantity: number;
  service: 'wash' | 'dryClean' | 'iron';
}

interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
}

const cartItemSchema: Schema<ICartItem> = new Schema({
  clothItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothItem',
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
  }
});

const cartSchema: Schema<ICart> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema]
}, {
  timestamps: true
});


const Cart: Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);

export { Cart, ICart, ICartItem };
