const mongoose = require("mongoose");

const OrderShema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    ammount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);
export default mongoose.Order || mongoose.model("Order", OrderShema);
