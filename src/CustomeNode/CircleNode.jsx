import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CircleNode = ({ data, isConnectable }) => {

    return (
        <div className="circle_node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} id="circleT_id" />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} id="circleB_id" />
        </div>
    );
};

export default CircleNode;
