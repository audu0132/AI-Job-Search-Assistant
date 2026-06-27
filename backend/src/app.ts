import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";

const app = express();

// Security
app.use(helmet.default());

// CORS
app.use(cors());

// Logger
app.use(morgan("dev"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Job Search Assistant API Running 🚀",
  });
});

export default app;