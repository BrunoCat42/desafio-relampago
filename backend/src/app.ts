import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router";
import cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/", router);

export default app;
