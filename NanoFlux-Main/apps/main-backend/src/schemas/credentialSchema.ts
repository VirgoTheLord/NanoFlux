import mongoose, { Model } from "mongoose";

interface credential {
  userId: string;
  name: string;
  type: string;
  data: Record<string, any>;
}

const credentialSchema = new mongoose.Schema<credential>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Map,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const credentialModel: Model<credential> =
  mongoose.models.Credentials ||
  mongoose.model<credential>("Credentials", credentialSchema);
