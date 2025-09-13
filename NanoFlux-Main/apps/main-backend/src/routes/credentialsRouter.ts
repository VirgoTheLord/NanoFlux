import express from "express";
import { credentialModel } from "../schemas/credentialSchema.js";

const credentialsRouter = express.Router();

credentialsRouter.post("/", async (req, res) => {
  try {
    const id = req.user.id;
    const { type, name, data } = req.body;
    const newCredential = await credentialModel.create({
      userId: id,
      type: type,
      name: name,
      data: data,
    });
    return res
      .status(200)
      .json({ message: "New credential added", credential: newCredential });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

credentialsRouter.delete("/", async (req, res) => {
  try {
    const id = req.user.id;
    const { type, name } = req.body;
    if (!id) {
      console.log("Not authorized to delete");
      return res.status(401).json({ message: "Not authorized to delete" });
    }
    await credentialModel.deleteOne({ userId: id, type: type, name: name });
    return res
      .status(200)
      .json({ message: "Successfully deleted the credential" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default credentialsRouter;
