import mongoose, { Model } from "mongoose";

interface user {
  id: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<user>(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel: Model<user> =
  mongoose.models.User || mongoose.model("User", userSchema);
