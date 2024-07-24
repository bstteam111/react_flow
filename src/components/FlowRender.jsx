import React, { useState, useCallback } from 'react';
import { Background, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import TextNode from '../CustomeNode/TextNode';
import CircleNode from '../CustomeNode/CircleNode';
import SquareNode from '../CustomeNode/SquareNode';
import CustomEdge from '../CustomeEdge/Edge';
import { applyEdgeChanges, applyNodeChanges, addEdge as addReactFlowEdge } from '@xyflow/react';
import { RiText, RiCircleLine } from "react-icons/ri";
import { RxSquare } from "react-icons/rx";
import { RiTriangleLine } from "react-icons/ri";
import TriangleNode from '../CustomeNode/TriangleNode';
import DownloadButton from './DownloadButton';

const initialNodes = [];
const initialEdges = [];

const FlowRender = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();

    const nodeTypes = {
        textNode: TextNode,
        circle: CircleNode, square: SquareNode, triangle: TriangleNode
    };
    const edgeTypes = { 'custom-edge': CustomEdge };

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addReactFlowEdge(params, eds)),
        []
    );

    const handleNodeLabelChange = useCallback((id, label) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, label } } : node
            )
        );
    }, []);

    const deleteNode = (id) => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    };

    const onDragStart = useCallback((event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault()
        const nodeType = event.dataTransfer.getData('application/reactflow');
        if (!nodeType) return;
        const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

        const newNode = {
            id: uuidv4(), type: nodeType,
            position, data: { label: 'Title', onChange: handleNodeLabelChange, deleteNode: deleteNode },
        };
        setNodes((nds) => [...nds, newNode]);
    },
        [screenToFlowPosition, handleNodeLabelChange],
    );

    return (
        <div style={{ height: '97vh', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange}
                onConnect={onConnect} fitView nodeTypes={nodeTypes} edgeTypes={edgeTypes}
                onEdgesChange={onEdgesChange} onDrop={onDrop} onDragOver={(e) => e.preventDefault()}
            >
                <Controls />
                <Background />
                <DownloadButton />
            </ReactFlow>

            <div className='container'>
                <div className='background'>
                    <div className='icon' draggable onDragStart={(event) => onDragStart(event, 'textNode')}>
                        <RiText style={{ marginTop: '20px' }} size={35} />
                    </div>

                    <div className='icon' draggable onDragStart={(event) => onDragStart(event, 'circle')}>
                        <RiCircleLine size={35} />
                    </div>

                    <div className='icon' draggable onDragStart={(event) => onDragStart(event, 'square')}>
                        <RxSquare size={35} />
                    </div>

                    <div className='icon' draggable onDragStart={(event) => onDragStart(event, 'triangle')}>
                        <RiTriangleLine size={35} />
                    </div>
                </div>
            </div>

            {/* <div className="container">
                <button onClick={() => nodes.forEach((node) => deleteNode(node.id))}>Delete All Nodes</button>
            </div> */}
        </div>
    );
};

export default FlowRender;