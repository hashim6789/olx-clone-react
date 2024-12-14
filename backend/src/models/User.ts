import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
}

const userSchema = new Schema<IUser>(
  {
    googleId: { type: String },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
