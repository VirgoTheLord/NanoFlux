import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server Listening at PORT:${PORT}`);
});
