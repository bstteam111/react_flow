import React, { useState, useCallback } from 'react';
import { Background, Controls, ReactFlow } from '@xyflow/react';
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

const initialNodes = [];
const initialEdges = [];

const FlowRender = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

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

    const addTextNode = () => {
        const newNode = {
            id: uuidv4(), type: 'textNode',
            position: { x: Math.random() * 300, y: Math.random() * 300 }, data: { value: 'Text Node' },
        };
        setNodes((node) => [...node, newNode]);
    };

    const addCircleNode = () => {
        const newNode = {
            id: uuidv4(), data: {},
            type: 'circle', position: { x: Math.random() * 300, y: Math.random() * 300 },
        };
        setNodes((node) => [...node, newNode]);
    };

    const addSquareNode = () => {
        const newNode = {
            id: uuidv4(), data: {},
            type: 'square', position: { x: Math.random() * 300, y: Math.random() * 300 },
        };
        setNodes((node) => [...node, newNode]);
    };

    const addTriangleNode = () => {
        const newNode = {
            id: uuidv4(), data: {},
            type: 'triangle', position: { x: Math.random() * 300, y: Math.random() * 300 },
        }
        setNodes((node) => [...node, newNode]);
    }

    return (
        <div style={{ height: '97vh', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange}
                onConnect={onConnect} fitView nodeTypes={nodeTypes} edgeTypes={edgeTypes}
                onEdgesChange={onEdgesChange}
            >
                <Background />
                <Controls />
            </ReactFlow>

            <div className='container'>
                <div className='background'>
                    <div onClick={addTextNode} className='icon'>
                        <RiText style={{ marginTop: '23px' }} size={40} />
                    </div>

                    <div onClick={addCircleNode} className='icon'>
                        <RiCircleLine size={40} />
                    </div>

                    <div onClick={addSquareNode} className='icon'>
                        <RxSquare size={40} />
                    </div>

                    <div onClick={addTriangleNode} className='icon'>
                        <RiTriangleLine size={40} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowRender;