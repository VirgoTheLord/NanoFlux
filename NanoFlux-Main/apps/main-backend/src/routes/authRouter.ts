import express from "express";
import { userModel } from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";
import sendMail from "../config/mail.js";
import { v4 as uuidV4 } from "uuid";

const authRouter = express.Router();

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email, password: password });
    if (!user) {
      console.log("User does not exist.");
      return res.status(400).json({ message: "User does not exist." });
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string
    );
    const url = `http://localhost:5000/verify?token=${token}`;
    sendMail(url, user.email);

    return res
      .status(201)
      .json({ message: "The mail has been sent check your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email, password: password });
    if (user) {
      console.log("User Already Exists");
      return res.status(400).json({ message: "User Already Exists" });
    }
    const id = uuidV4();
    await userModel.create({
      id: id,
      email: email,
      password: password,
    });
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET as string);
    const url = `http://localhost:5000/verify?token=${token}`;
    await sendMail(url, email);

    return res
      .status(201)
      .json({ message: "The mail has been sent check your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default authRouter;
