import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
import PaytmChecksum from "paytmchecksum";
const handler = async (req, res) => {
  let order;
  // Validate paytm checksum
  var paytmchecksum = "";
  var paytmParams = {};

  const recieved_data = req.body;
  for (var key in recieved_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = recieved_data[key];
    } else {
      paytmParams[key] = recieved_data[key];
    }
  }
  var isValidChecksum = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.PAYTM_MKEY,
    paytmchecksum
  );
  if (!isValidChecksum) {
    res.status(500).send("Some Error Occured");
    return;
  }

  // Update  status into orders table after checking the transaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID }
    );
    let products = order.products;
    for (let slug in products) {
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      {
        status: "pending",
        paymentInfo: JSON.stringify(req.body),
        transactionid: req.body.TXNID,
      }
    );
  }

  // Initiate Shipping
  //Redirect user to the order confirmation page
  res.redirect("/order?clearCart=1&id=" + order._id, 200);

  res.status(200).json({ body: req.body });
};

export default connectDb(handler);
