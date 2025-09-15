import { Handle, Position } from "@xyflow/react";
import React from "react";

export function WebhookTrigger() {
  return (
    <div className="text-updater-node bg-black p-10 border-1 border-black rounded-xl">
      <div>
        <label className="text-xl font-hellosin text-white" htmlFor="text">
          Webhook Trigger
        </label>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}
