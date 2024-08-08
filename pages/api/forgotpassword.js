// Import necessary modules
import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
import CryptoJS from 'crypto-js';

const handler = async (req, res) => {
    await connectDb();

    if (req.method === 'POST') {
        try {
            const { email, password, newPassword, isLoggedIN } = req.body;

            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json({ error: "Invalid Credentials" });
            }

            if (isLoggedIN === true) {
                if (user.isVerified === true) {
                    const hashedPassword = CryptoJS.SHA256(password).toString();

                    if (hashedPassword === user.password) {
                        await User.findByIdAndUpdate(user._id, { password: CryptoJS.SHA256(newPassword).toString() });
                        return res.status(200).json({ success: "Password Changed Successfully, Please Re-Login ." });
                    } else {
                        return res.status(400).json({ error: "Invalid Password" });
                    }
                } else {
                    return res.status(400).json({ error: "Please verify your email" });
                }
            } else {
                if (user.isVerified === true) {
                    await User.findByIdAndUpdate(user._id, { password: CryptoJS.SHA256(newPassword).toString() });
                    return res.status(200).json({ success: "Password Changed Successfully, Redirecting to Login Page." });
                } else {
                    return res.status(400).json({ error: "Please verify your email" });
                }
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
