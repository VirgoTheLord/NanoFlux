import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import jwt from "jsonwebtoken";
import workflowRouter from "./routes/workflowRouter.js";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
      headers?: any;
    }
  }
}

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

connectDB();

app.use("/user", authRouter);
app.use("/workflow", workflowRouter);

app.get("/verify", (req, res) => {
  const token = req.query.token as string | undefined;
  if (!token) {
    console.log("Invalid URI");
    return res.status(400).json({ message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

    return res
      .status(201)
      .json({ message: "The login is valid, please redirect" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server Listening at PORT:${PORT}`);
});
