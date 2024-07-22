import React from 'react';
import { Handle, Position } from '@xyflow/react';

const SquareNode = ({ data, isConnectable }) => {
    return (
        <div className="square_node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </div>
    );
};

export default SquareNode;