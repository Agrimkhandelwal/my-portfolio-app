import express, { type Express, type Request, type Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes and DB connection
import apiRoutes from "./routes/UserApi.js";
import connectDB from "./config/connectDb.js";

// Import models and their corresponding types
import ProfileModel, { type IProfile } from "./models/Profile.js";
import ProjectModel, { type IProject } from "./models/Projects.js";
import SkillModel, { type ISkill } from "./models/Skills.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup

app.use(express.json());
const corsOptions = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsOptions));


// Main API routes from your router file
app.use("/api", apiRoutes);

// ----- Standalone Routes (See suggestion below) -----

// Health check route
app.get("/health", (req: Request, res: Response<{ status: string }>) => {
  res.status(200).json({ status: "ok" });
});

// Get Profile
app.get("/profile", async (req: Request, res: Response<IProfile | { error: string } | null>) => {
  try {
    const profile = await ProfileModel.findOne(); // only one profile
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all Projects
app.get("/projects", async (req: Request, res: Response<IProject[] | { error: string }>) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all Skills
app.get("/skills", async (req: Request, res: Response<ISkill[] | { error: string }>) => {
  try {
    const skills = await SkillModel.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Root route
app.get("/", (req: Request, res: Response<string>) => {
  res.send("🚀 Portfolio API is running!");
});

const PORT: number = Number(process.env.PORT) || 5000;

// Connect to the database and then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port: ${PORT}`);
  });
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
});