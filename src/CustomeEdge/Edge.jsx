import React from 'react';
import { BaseEdge, getStraightPath } from '@xyflow/react';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) => {
    const [edgePath] = getStraightPath({
        sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition,
    });

    return (
        <BaseEdge id={id} path={edgePath} />
    );
};

export default CustomEdge;