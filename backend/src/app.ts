import express from "express";
import productRouter from "./routes/productRoutes";
import authRouter from "./routes/authRoutes";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/db";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` in production with HTTPS
  })
);

// Initialize Passport and session handling
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/product", productRouter);

export default app;
