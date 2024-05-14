import { Document, Schema, model } from "mongoose";
import { Iadmin } from "../interface/interface";

interface admin extends Iadmin, Document {}

interface Alladmins extends Iadmin, Document {}

const adminSchema = new Schema<Alladmins>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Your email is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    name: {
      type: String,
      required: [true, "Your Name is required"],
    },
  },
  { timestamps: true }
);

const adminModels = model<admin>("admins", adminSchema);

export default adminModels;
