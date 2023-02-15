// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    let u = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        "Abhishekjadon8964893164"
      ).toString(),
    });
    await u.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This methid is not allowed" });
  }
};

export default connectDb(handler);
