import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers?.["token"];

    // Ensure token is a string
    const tokenStr = Array.isArray(token) ? token[0] : token;

    if (!tokenStr) {
      console.log("NO TOKEN");
      return res.status(401).json({ message: "No token found" });
    }
    const decoded = jwt.verify(tokenStr, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
