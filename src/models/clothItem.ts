import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPrice {
  dryClean: number;
  wash: number;
  iron: number;
}

interface IClothItem extends Document {
  name: string;
  category: string;
  icon: number[];
  prices: IPrice;
}

const clothItemSchema: Schema<IClothItem> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: [Number],
    required: true,
    trim: true
  },
  prices:
  {
    dryClean: {
      type: Number,
      required: true
    },
    wash: {
      type: Number,
      required: true
    },
    iron: {
      type: Number,
      required: true
    }
  }

}, {
  timestamps: true
});

const ClothItem: Model<IClothItem> = mongoose.model<IClothItem>('ClothItem', clothItemSchema);

export { ClothItem, IClothItem, IPrice };
