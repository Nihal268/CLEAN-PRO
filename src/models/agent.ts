import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAgent extends Document {
  name: string;
  mobile: number;
  email: string;
  password: string;
  map: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const agentSchema: Schema<IAgent> = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    map: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Map',
      required: true
    }
   
  },
  {
    timestamps: true
  }
);

const Agent: Model<IAgent> = mongoose.model<IAgent>('Agent', agentSchema);

export { Agent, IAgent };
