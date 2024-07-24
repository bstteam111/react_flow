import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

const TextNode = ({ data, isConnectable }) => {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="text_node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <input type="text" placeholder="Titel" onChange={onChange} />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable}/>
        </div>
    );
};

export default TextNode;