import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";
import authRoutes from "./routes/authRoutes";


const app = express.default();

// Security
app.use(helmet.default());

// CORS
app.use(cors.default());

// Logger
app.use(morgan.default("dev"));



// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API IS RUNNING...",
  });
});

export default app;