import mongoose, { Schema, Document, Model } from 'mongoose';

interface IMap extends Document {
  sl_no:number;
  place: string; 
  latitude_longitude: [number, number][]; 
  createdAt: Date;
  updatedAt: Date;
}

const mapSchema: Schema<IMap> = new Schema(
  {
    sl_no:{ type: Number, required: true},
    place: { type: String, required: true },
    latitude_longitude: { type: [[Number]], required: true },
  },
  {
    timestamps: true, 
  }
);

const Map: Model<IMap> = mongoose.model<IMap>('Map', mapSchema);

export { Map, IMap };
