import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    throw new Error("Please provide MONGODB_URL in the .env file.");
}
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("✅ Successfully connected to MongoDB.");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=connectDb.js.map