import { Handle, Position } from '@xyflow/react'
import React, { useState } from 'react'
import { RiDeleteBinLine, RiFileCopyLine } from "react-icons/ri";

const TriangleNode = ({ id, data, isConnectable }) => {
    const [label, setLabel] = useState(data.label || '');
    const [showDelete, setShowDelete] = useState(false);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setLabel(newValue);
        data.onChange(id, newValue);
    };

    const handleNodeClick = (event) => {
        event.stopPropagation();
        setShowDelete(!showDelete);
    };

    // const handleCopy = (event) => {
    //     event.stopPropagation();
    //     const newId = `${id}_copy`; 
    //     data.copyNode(id, newId); 
    // };

    return (
        <div className="traingle_node" onClick={handleNodeClick}>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable}
                id="triangleT_id"
            />
            <input type="text" value={label} onChange={handleChange} className="traingle_input" />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable}
                id="triangleB_id"
            />

            {showDelete && (
                <div className='delete-container'>
                    <RiDeleteBinLine size={15} className='delete_icon' onClick={() => data.deleteNode(id)} />
                    <RiFileCopyLine size={15} className="delete_icon" onClick={() => data.copyNode(id)} />
                </div>
            )}


            {/* {showDelete && (
                <div
                    onClick={handleCopy}
                    className="delete-container"
                    style={{ position: 'absolute', top: 20, right: 0 }} 
                >
                    <RiFileCopyLine size={15} className="copy_icon" />
                </div>
            )} */}
        </div>
    )
}

export default TriangleNode