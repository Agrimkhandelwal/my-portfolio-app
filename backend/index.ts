import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/UserApi.js";
import connectDB from "./config/connectDb.js";

// Load environment variables
dotenv.config();

const app: Express = express();

// --- Advanced CORS Configuration with Debugging ---
const allowedOrigins = [process.env.FRONTEND_URL];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // The 'origin' is the URL of the site making the request (your frontend)
    // We check if this origin is in our list of allowed sites.
    // The '!origin' part allows requests from tools like Postman that don't have an origin.
    if (!origin || (allowedOrigins.indexOf(origin) !== -1)) {
      callback(null, true); // Allow the request
    } else {
      // If the origin is not allowed, log it and reject the request.
      console.error(`CORS Error: The origin '${origin}' was blocked.`);
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());


// --- Routes ---
app.use("/api", apiRoutes);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Portfolio API is running!");
});


// --- Server Startup ---
const PORT: number = Number(process.env.PORT) || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

