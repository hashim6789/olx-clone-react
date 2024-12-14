import mongoose, { Schema, Document, Types } from "mongoose";

interface IProduct extends Document {
  title: string;
  price: number;
  userId: string;
  // isFeatured: boolean;
  imageUrl?: string;
  location: string;
  // description: string;
  sellerName: string;
  contactNo: string;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: Types.ObjectId, required: true, ref: "Users" },
    // isFeatured: { type: Boolean, default: false },
    imageUrl: { type: String },
    location: { type: String, required: true },
    // description: { type: String, required: true },
    sellerName: { type: String, required: true },
    contactNo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
