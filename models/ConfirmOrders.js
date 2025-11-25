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
      default: "unconfirmed",
      trim: true,
    },
    seen: {
      type: String,
      default: "unseen",
      trim: true,
    },
    payType: {
      type: String,
      default: " ",
      trim: true,
    },
  },
  { timestamps: true }
);
const ConfirmOrder = model("ConfirmOrder", confirmOrderSchema);
module.exports = ConfirmOrder;
