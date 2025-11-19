const { Schema, model } = require("mongoose");
const confirmOrderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    orders: {
      type: Array,
      default: [],
    },
    address: {
      type: Array,
      default: [],
    },
    status: {
      type: String,

      default: "pending",
    },
    seen: {
      type: String,
      default: "unseen",
    },
  },
  { timestamps: true }
);
const ConfirmOrder = model("ConfirmOrder", confirmOrderSchema);
module.exports = ConfirmOrder;
