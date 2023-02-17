// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      "Abhishekjadon8964893164"
    );
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        var token = jwt.sign({ email: user.email, name: user.name }, "abhi" ); //JWT_secret
        res.status(200).json({ success: true, token, email: user.email });
      } else {
        res.status(200).json({ success: false, email: "Invalid crendentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user found" });
    }
  } else {
    res.status(400).json({ error: "This methid is not allowed" });
  }
};

export default connectDb(handler);
