import { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    MiniMap,
    addEdge,
    Connection,
    Node,
    Edge,
    NodeChange,
    EdgeChange,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';
import { CustomNode } from './CustomNode';
import { ParticleBackground } from './ParticleBackground';
import '@xyflow/react/dist/style.css';

interface RoadmapFlowProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onEdgesSet: (callback: (edges: Edge[]) => Edge[]) => void;
    onResetView?: () => void;
}

const nodeTypes = {
    custom: CustomNode,
};

function RoadmapFlowInner({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onEdgesSet,
    onResetView
}: RoadmapFlowProps) {
    const { fitView } = useReactFlow();
    
    const onConnect = useCallback(
        (params: Connection) => onEdgesSet((eds: Edge[]) => addEdge(params, eds)),
        [onEdgesSet]
    );

    useEffect(() => {
        const handleResetView = () => {
            fitView({ padding: 0.1, duration: 800 });
        };

        if (onResetView) {
            window.addEventListener('reset-view', handleResetView);
            return () => window.removeEventListener('reset-view', handleResetView);
        }
    }, [fitView, onResetView]);

    return (
        <div className="h-full flex-1 relative" style={{ 
            height: 'calc(100vh - 60px)', 
            width: '100%',
            minHeight: '400px'
        }}>
            <div className="absolute inset-0 bg-black z-0"></div>
            <ParticleBackground />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView={true}
                fitViewOptions={{ padding: 0.1 }}
                nodesDraggable={true}
                nodesConnectable={true}
                elementsSelectable={true}
                attributionPosition="bottom-left"
                className="bg-black"
                style={{
                    backgroundColor: '#000000', // Pure black background
                    width: '100%',
                    height: '100%'
                }}
                connectionLineStyle={{
                    stroke: '#6366f1',
                    strokeWidth: 4,
                    strokeDasharray: '5,5'
                }}
                defaultEdgeOptions={{
                    style: { 
                        strokeWidth: 5,
                        stroke: '#6366f1'
                    },
                    markerEnd: {
                        type: 'arrowclosed',
                        color: '#6366f1'
                    }
                }}
            >
                <Controls className="bg-black/80 backdrop-blur-lg shadow-lg rounded-lg !left-2 !bottom-2 lg:!left-4 lg:!bottom-4 border border-border" 
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
                <MiniMap
                    className="backdrop-blur-lg shadow-lg rounded-lg border border-gray-300 !right-2 !top-2 lg:!right-4 lg:!top-4 !w-32 !h-24 lg:!w-40 lg:!h-32"
                    nodeColor={(node) => {
                        // Get color from node data or use default
                        if (!node || !node.data) {
                            console.warn('MiniMap node missing data:', node);
                            return '#22c55e';
                        }
                        const nodeData = node.data as { color?: string };
                        return nodeData.color || '#22c55e';
                    }}
                    maskColor="rgba(255, 255, 255, 0.1)"
                    pannable={true}
                    zoomable={true}
                    style={{
                      backgroundColor: 'rgba(240, 240, 240, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(200, 200, 200, 0.8)'
                    }}
                />
                <Background 
                    gap={20} 
                    size={1} 
                    color="#333333" // Grid color for better visibility on black
                    className="bg-black"
                />
            </ReactFlow>
        </div>
    );
}

export function RoadmapFlow(props: RoadmapFlowProps) {
    return (
        <ReactFlowProvider>
            <RoadmapFlowInner {...props} />
        </ReactFlowProvider>
    );
}