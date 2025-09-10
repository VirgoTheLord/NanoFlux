import mongoose from "mongoose";

let isConnected = false;
export const connectDB = async () => {
  if (isConnected) {
    console.log("DB connection already exists");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
