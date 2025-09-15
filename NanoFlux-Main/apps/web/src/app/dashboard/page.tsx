"use client";

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Import your node types
import { ManualTrigger } from "@/components/Nodes/TriggerNodes/ManualTrigger";
import { WebhookTrigger } from "@/components/Nodes/TriggerNodes/WebhookTrigger";

// -------- Node Types -------- //
export type FlowNodeData = { label: string };
export type FlowNode = Node<FlowNodeData>;
export type FlowEdge = Edge;

const nodeTypes = {
  manualTrigger: ManualTrigger,
  webhook: WebhookTrigger,
} as const;

// Updated palette to include both node types
const palette = [
  { type: "manualTrigger", label: "Manual Trigger" },
  { type: "webhook", label: "Webhook Trigger" },
];

// -------- Outer Provider -------- //
export default function WorkflowBuilder() {
  return (
    <ReactFlowProvider>
      <BuilderInner />
    </ReactFlowProvider>
  );
}

// -------- Inner Canvas -------- //
function BuilderInner() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const { screenToFlowPosition, toObject } = useReactFlow<FlowNode>();

  const onNodesChange = useCallback(
    (changes: NodeChange<FlowNode>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (conn: Connection) =>
      setEdges((eds) => addEdge({ ...conn, animated: true }, eds)),
    []
  );

  // --- Drag & Drop --- //
  const onDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // Get the bounding rect of the ReactFlow wrapper
      const reactFlowBounds = (e.target as Element).getBoundingClientRect();

      const position = screenToFlowPosition({
        x: e.clientX - reactFlowBounds.left,
        y: e.clientY - reactFlowBounds.top,
      });

      const newNode: FlowNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: palette.find((p) => p.type === type)?.label || `${type} node`,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // --- Save/Load Helpers --- //
  const saveFlow = () => {
    const json = toObject(); // includes nodes, edges, viewport
    console.log("Flow JSON →", JSON.stringify(json, null, 2));
    // send `json` to your DB
  };

  const clearFlow = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r p-4">
        <h2 className="font-semibold mb-4">Trigger Nodes</h2>
        {palette.map((p) => (
          <div
            key={p.type}
            draggable
            onDragStart={(e) => onDragStart(e, p.type)}
            className="cursor-move p-3 mb-3 bg-white border rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all select-none"
          >
            <div className="font-medium">{p.label}</div>
            <div className="text-sm text-gray-500 mt-1">
              {p.type === "manualTrigger"
                ? "Start workflow manually"
                : "HTTP webhook trigger"}
            </div>
          </div>
        ))}
        <div className="mt-6 space-y-2">
          <button
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={saveFlow}
          >
            Save Flow
          </button>
          <button
            className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            onClick={clearFlow}
          >
            Clear Flow
          </button>
        </div>
      </aside>

      {/* Canvas */}
      <div className="flex-1">
        <ReactFlow<FlowNode>
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          className="bg-teal-50"
        >
          <Background gap={16} color="#aaa" />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
