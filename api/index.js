import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Disable buffering and set buffer timeout
mongoose.set('bufferCommands', false);       // Disable Mongoose buffering
mongoose.set('bufferTimeoutMS', 60000);      // Set buffer timeout to 1 minute

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000, // 1 minute
    socketTimeoutMS: 60000,          // 1 minute
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Only start handling routes after successful connection
    app.use("/api/user", userRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/listing", listingRouter);

    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });

    app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
      });
    });

    // Start server after connection
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
