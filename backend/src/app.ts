import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";

const app = express.default();

// Security
app.use(helmet.default());

// CORS
app.use(cors.default());

// Logger
app.use(morgan.default("dev"));

// Body Parser & Cookie Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser.default());

// Routes
app.use("/api/auth", authRoutes);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Job Search Assistant API Running 🚀",
  });
});

export default app;