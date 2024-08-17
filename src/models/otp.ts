import mongoose, { Schema, Document, Model } from 'mongoose';

interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema: Schema<IOtp> = new Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 300 seconds = 5 minutes
  }
})

const Otp: Model<IOtp> = mongoose.model<IOtp>('Otp', otpSchema);

export { Otp, IOtp };