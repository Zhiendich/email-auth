import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error-middleware.js";

const app: Application = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api/user", userRouter);
app.use(errorMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || "4000").then(() => {
      console.log("Db connected");
    });
    app.listen(process.env.PORT, () => {
      console.log("Server started on port", process.env.PORT);
    });
  } catch (error) {
    console.log("Ошибка в бд", error as Error);
  }
};

startApp();
