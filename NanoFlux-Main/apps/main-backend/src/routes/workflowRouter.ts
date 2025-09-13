import express from "express";
import { workflowModel } from "../schemas/workflowSchema.js";
import { v4 as uuidv4 } from "uuid";

const workflowRouter = express.Router();

//POST create a single workflow
workflowRouter.post("/", async (req, res) => {
  try {
    const { title, enabled, nodes, connections } = req.body;
    const id = req.user.id;
    if (!id) {
      console.log("No user id found");
      return res.status(401).json({ message: "Unauthorized" });
    }
    const workflowId = uuidv4();
    await workflowModel.create({
      userId: id,
      id: workflowId,
      title: title,
      enabled: enabled,
      nodes: nodes,
      connections: connections,
    });

    return res.status(201).json({ message: "Workflow created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//GET all worflows a user as a list
workflowRouter.get("/", async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      console.log("No id found");
      return res.status(401).json({ message: "Unauthorized" });
    }
    const workflows = await workflowModel.find({
      userId: id,
    });
    if (!workflows) {
      console.log("No workflows found");
      return res
        .status(401)
        .json({ message: "No worflows found for user, create a new one" });
    }
    return res
      .status(201)
      .json({ message: "Worklows found", worflows: workflows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//GET the particular workflow of user

workflowRouter.get("/:id", async (req, res) => {
  try {
    const { id: workflowId } = req.params;
    const workflow = await workflowModel.findOne({
      id: workflowId,
    });
    if (!workflow) {
      console.log("No Workflow found");
      return res.status(401).json({ message: "No workflow found" });
    }

    return res
      .status(201)
      .json({ message: "Workflow found", workflow: workflow });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//PUT to update the workflow
workflowRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, enabled, nodes, connections } = req.body;
    const userId = req.user.id;
    const workflow = await workflowModel.findOne({
      userId: userId,
      id: id,
    });
    if (!workflow) {
      console.log("No workflow found");
      return res.status(401).json({ message: "No worflow" });
    }
    const updated = await workflowModel.updateOne(
      { id: id },
      {
        title: title,
        enabled: enabled,
        nodes: nodes,
        connections: connections,
      }
    );
    return res.status(201).json({ message: "Changes made", workflow: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default workflowRouter;
