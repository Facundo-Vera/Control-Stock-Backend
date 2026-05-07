import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    stockMin: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: String,
    },
    typeVehicle: {
      type: String,
      enum: ["Moto", "Auto"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default model("Product", ProductSchema);
