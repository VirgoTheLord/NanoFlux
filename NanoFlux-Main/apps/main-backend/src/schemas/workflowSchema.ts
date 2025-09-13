import mongoose, { Model } from "mongoose";

interface workflow {
  userId: string;
  id: string;
  title: string;
  enabled: boolean;
  nodes: object[];
  connections: object[];
}
const nodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    parameters: { type: mongoose.Schema.Types.Mixed, default: {} },
    outputs: { type: Number, default: 1 },
  },
  { _id: false }
);

// Connection Schema
const connectionSchema = new mongoose.Schema(
  {
    sourceNodeId: { type: String, required: true },
    sourceOutput: { type: Number, default: 0 },
    targetNodeId: { type: String, required: true },
    targetInput: { type: Number, default: 0 },
  },
  { _id: false }
);

const workflowSchema = new mongoose.Schema<workflow>({
  userId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    required: true,
  },
  nodes: {
    type: [nodeSchema],
    required: true,
  },
  connections: {
    type: [connectionSchema],
    required: true,
  },
});

export const workflowModel: Model<workflow> =
  mongoose.models.Workflow ||
  mongoose.model<workflow>("Workflow", workflowSchema);
