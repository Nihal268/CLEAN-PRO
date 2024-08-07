import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  name: string;
  mobile: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export { User, IUser };
