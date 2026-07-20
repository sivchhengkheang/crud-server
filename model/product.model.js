import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter product name"],
    },

    quantity: {
      type: Number,
      require: true,
      default: 0,
    },

    price: {
      type: Number,
      require: true,
      default: 0,
    },

    img: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  },
);
export const Products = mongoose.model("Products", ProductSchema);
