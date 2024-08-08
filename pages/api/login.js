// Import necessary modules
import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
import CryptoJS from 'crypto-js';
import { generateToken } from '../../utils/jwt'

const handler = async (req, res) => {
  await connectDb();

  if (req.method === 'POST') {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      if (user.isVerified === true) {
        const hashedPassword = CryptoJS.SHA256(req.body.password).toString();

        if (hashedPassword === user.password) {
          var token = generateToken({ email: user.email, id: user._id, name: user.name, image: user.image });
          return res.status(200).json({ token, success: "Successfully logged in, redirecting to homepage" });
        } else {
          return res.status(400).json({ error: "Invalid Password" });
        }
      } else {
        return res.status(400).json({ error: "Please verify your email" });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
