import express, {} from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Import routes and DB connection
import apiRoutes from "./routes/UserApi.js";
import connectDB from "./config/connectDb.js";
// Import models and their corresponding types
import ProfileModel, {} from "./models/Profile.js";
import ProjectModel, {} from "./models/Projects.js";
import SkillModel, {} from "./models/Skills.js";
// Load environment variables
dotenv.config();
const app = express();
// Middleware setup
app.use(cors());
app.use(express.json());
// Main API routes from your router file
app.use("/api", apiRoutes);
// ----- Standalone Routes (See suggestion below) -----
// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
// Get Profile
app.get("/profile", async (req, res) => {
    try {
        const profile = await ProfileModel.findOne(); // only one profile
        res.json(profile);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
// Get all Projects
app.get("/projects", async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
// Get all Skills
app.get("/skills", async (req, res) => {
    try {
        const skills = await SkillModel.find();
        res.json(skills);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
// Root route
app.get("/", (req, res) => {
    res.send("🚀 Portfolio API is running!");
});
const PORT = Number(process.env.PORT) || 5000;
// Connect to the database and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port: ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map