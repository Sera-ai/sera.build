import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './index.css';

// Define the Custom Node Component outside of HomeFlow
const ImageNode = ({ data }) => {
    return (
            <img src={data.src} alt="" style={{ maxWidth: '60%', height: 'auto' }} />
    );
};

const HomeFlow = ({ img }) => {
    // Use useMemo to re-calculate initialNodes only when img changes
    const nodeTypes = useMemo(() => ({
        imageNode: ImageNode,
    }), []);

    const initialNodes = useMemo(() => [
        {
            id: '1',
            type: 'imageNode', // Custom node type
            position: { x: 0, y: 200 },
            data: { src: img }, // Use img prop here
        },
        // Add more nodes here if needed
    ], [img]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
            ),
        [setEdges]
    );

    return (
        <div className="container" style={{ height: window.innerHeight }}>
            <div className="floatingedges">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    preventScrolling={false}
                    defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                    fitView
                    nodeTypes={nodeTypes} // Register the Custom Node Type
                >
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

export default HomeFlow;
