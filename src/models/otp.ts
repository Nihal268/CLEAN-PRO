import mongoose, { Schema, Document, Model } from 'mongoose';

interface IOtp extends Document {
  mobile: number;
  otp: string;
  createdAt: Date;
}

const otpSchema: Schema<IOtp> = new Schema({
  mobile: {
    type: Number,
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