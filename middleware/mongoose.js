import mongoose from "mongoose";

let cachedDb = null;

const connectDb = async (req, res) => {
  try {
    if (!cachedDb) {
      // Connect to MongoDB if not already connected
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB Connected");
      cachedDb = mongoose.connection;
    }

    // return handler(req, res);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    console.log("DB not Connected");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDb;
