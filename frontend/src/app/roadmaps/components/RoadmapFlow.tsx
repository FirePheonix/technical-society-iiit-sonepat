import { useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    MiniMap,
    addEdge,
    Connection,
    Node,
    Edge,
} from '@xyflow/react';
import { CustomNode } from './CustomNode';

interface RoadmapFlowProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: (changes: any) => void;
    onEdgesChange: (changes: any) => void;
    onEdgesSet: (callback: (edges: Edge[]) => Edge[]) => void;
}

const nodeTypes = {
    custom: CustomNode,
};

export function RoadmapFlow({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onEdgesSet
}: RoadmapFlowProps) {
    const onConnect = useCallback(
        (params: Connection) => onEdgesSet((eds: Edge[]) => addEdge(params, eds)),
        [onEdgesSet]
    );

    return (
        <div className="h-full" style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView={true}
                fitViewOptions={{ padding: 0.2 }}
                nodesDraggable={true}
                nodesConnectable={true}
                elementsSelectable={true}
                attributionPosition="bottom-left"
                className="bg-white"
                style={{
                    backgroundColor: '#ffffff',
                    width: '100%',
                    height: '100%'
                }}
            >
                <Controls className="bg-white shadow-lg rounded-lg" />
                <MiniMap
                    className="bg-white shadow-lg rounded-lg border border-gray-200"
                    nodeColor="#3b82f6"
                    maskColor="rgba(0, 0, 0, 0.1)"
                />
                <Background gap={20} size={1} color="#e5e7eb" />
            </ReactFlow>
        </div>
    );
}