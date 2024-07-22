import { Handle, Position } from '@xyflow/react'
import React from 'react'

const TriangleNode = ({ data, isConnectable }) => {
    return (
        <div className="traingle_node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} id="triangleT_id" />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} id="triangleB_id" />
        </div>
    )
}

export default TriangleNode