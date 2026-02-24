import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./src/routes/chatRoutes.js";
import { initDB } from "./src/config/db.js";
import { apiLimiter } from "./src/middleware/rateLimiter.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://weitredge-assignment-livid.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked Origin:", origin); 
        callback(new Error("CORS policy violation"), false);
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/", apiLimiter);

app.use("/api", chatRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development" ?
        err.message
      : "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(
        ` Server is running in ${process.env.NODE_ENV || "development"} mode`,
      );
      console.log(` Listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Critical Failure: Could not start server", error);
    process.exit(1);
  }
};

startServer();
