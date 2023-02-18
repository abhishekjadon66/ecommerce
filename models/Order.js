const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    OrderId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, required: true },
    transactionid: { type: String, default: ""},

    address: { type: String, required: true },
    ammount: { type: Number, required: true },
    status: { type: String, default: "Initiated", required: true },
    deliveryStatus: {type: String, default: 'unshipped', required: true}
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
// export default mongoose.Order || mongoose.models("Order", OrderSchema);
