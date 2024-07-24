import React, { useCallback, useState } from 'react';
import { Handle, NodeResizer, Position } from '@xyflow/react';

const CircleNode = ({ id, data, isConnectable, selected }) => {
    const [label, setLabel] = useState(data.label || '');
    const [size, setSize] = useState(100);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setLabel(newValue);
        data.onChange(id, newValue);
    };

    const onResize = useCallback( (event, { width, height }) => {
        const newSize = Math.max(width, height);
        setSize(newSize);
        if (data.onChangeSize) {
            data.onChangeSize(data.id, { width: newSize, height: newSize });
        }
    }, [data]);

    return (
        <div className="circle_node" style={{ width: size, height: size }}>
            <NodeResizer minWidth={50} minHeight={50} onResize={onResize} isVisible={selected} />
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <input type="text" value={label} onChange={handleChange} className="input" />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </div>
    );
};

export default CircleNode;