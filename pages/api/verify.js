// Import necessary modules
import connectDb from "../../middleware/mongoose";
import User from "../../models/user";

const handler = async (req, res) => {
    await connectDb();
    if (req.method === 'POST') {
        const { otp, email } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).json({ error: "This Email is Not Registered, Please Register First." });
            }

            console.log(existingUser.verifyOTP, otp, existingUser.verifyOTPExpiry, Date.now());

            if (existingUser.verifyOTP !== otp ) {
                await User.findOneAndUpdate({ email }, { verifyOTP: null, verifyOTPExpiry: null , isVerified: true});
                return res.status(200).json({ success: "Email Verified Successfully, Redirecting to Login Page" });
            }else{
                return res.status(400).json({ error: "Invalid OTP" });
            }

        } catch (error) {
            console.error('Error during signup:', error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(400).json({ error: "Bad request" });
    }
}

export default handler;
