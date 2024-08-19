import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAdmin extends Document {
  name: string;
  mobile: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

  },
  {
    timestamps: true
  }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema);

export { Admin, IAdmin };
