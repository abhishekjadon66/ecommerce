const mongoose = require("mongoose");

const OrderShema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    OrderId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, required: true },

    address: { type: String, required: true },
    ammount: { type: Number, required: true },
    status: { type: String, default: "Initiated", required: true },
  },
  { timestamps: true }
);
export default mongoose.Order || mongoose.model("Order", OrderShema);
