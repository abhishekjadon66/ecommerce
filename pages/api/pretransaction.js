const https = require("https");
const PaytmChecksum = require("PaytmChecksum");
import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import pincode from '../../pincode.json'
import Product from "../../models/Product";
const handler = async (req, res) => {
  if (req.method == "POST") {

   //Check if the pincode is serviceable
    if (!Object.keys(pincode).includes(req.body.pincode)) {
      res.status(200).json({ success: false, "error": "The pincode you have enter is not serviceable", cartClear: false })
      return
      
    }



    //Check if the cart is tamperd with
    let product,
      sumTotal = 0;
    let cart = req.body.cart;
    if (req.body.subTotal < 0) {
      res.status(200).json({
        success: false,
        error: "Cart Empty! Please build your cart and try again.",
        cartClear: false,
      });
      return;
    }
    for (let item in cart) {
      sumTotal += cart[item].price * cart[item];
      product = await Product.findOne({ slug: item });
      //Check if the cart items are out of stocks
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          success: false,
          error: "Some items in your cart went out of stock. Please try again", cartClear: true
        });
      }
      if (product.price != cart[item].price) {
        res.status(200).json({
          success: false,
          error:
            "The price of some items in your cart have changed. Please try again",
          cartClear: true,
        });
        return;
      }
    }
    if (sumTotal !== req.body.subTotal) {
      res.status(200).json({
        success: false,
        error: "Please Enter your 10 digit number",
        cartClear: true,
      });
      return;
    }

    //Check if the details are valid
    if (
      req.body.phone.length !== 1 ||
      !Number.isInteger(Number(req.body.phone))
    ) {
      res.status(200).json({
        success: false,
        error: "Please enter your 10 digit phone number",
        cartClear: false,
      });
      return;
    }
    if (
      req.body.pincode.length !== 6 ||
      !Number.isInteger(Number(req.body.pincode))
    ) {
      res.status(200).json({
        success: false,
        error: "Please enter your 6 digit Pincode",
        cartClear: false,
      });
      return;
    }

    // Initiate an order correcsponding  to this order id
    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      address: req.body.address,
      subTotal: req.body.subTotal,
      products: req.body.cart,
    });
    await order.save();

    var paytmParams = {};

    paytmParams.body = {
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "Your_website_name",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.eamil,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );
    var post_data = JSON.stringify(paytmParams);
    const requestAsync = () => {
      return new Promise((resolve, rejects) => {
        var options = {
          // hostname: "securegw-stage.paytm.in",

          port: 443,
          path: `/v3/order/${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            let ress = JSON.parse(response);
            ress.success = true;
            ress.cartClear= false;
            resolve(ress);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };
    let myr = await requestAsync();
    res.status(200).json(myr);
  }
};

export default connectDb(handler);
