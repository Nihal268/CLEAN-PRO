import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  name: string;
  mobile: number;
  email: string;
  password: string;
  userStatus:boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userStatus:{type: Boolean, default: false}
  },
  {
    timestamps: true
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export { User, IUser };
