import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import router from "./routes/router";

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api", router);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;
