import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    useNodesState,
    useEdgesState,
    Position,
    MarkerType,
    useStore,
    getBezierPath
} from 'reactflow';
import 'reactflow/dist/style.css';

import './index.css';
import TurboNode from './nodes/TurboNode';

const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges();

const edgeTypes = {
    floating: FloatingEdge,
    turbo: TurboEdge,
};

const nodeTypes = {
    turbo: TurboNode,
};

const NodeAsHandleFlow = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
            ),
        [setEdges]
    );

    return (
        <div className="container" style={{ "height": window.innerHeight - 170 }}>
            <div className="floatingedges">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    preventScrolling={false}
                    defaultViewport={{ x: 350, y: 0, zoom: 1 }}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    connectionLineComponent={FloatingConnectionLine}
                >
                    <Background />
                </ReactFlow>
            </div>
        </div >
    );
};

export default NodeAsHandleFlow;



function FloatingEdge({ id, source, target, markerEnd, style }) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

    const [edgePath] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
    });

    return (
        <path
            id={id}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            style={style}
        />
    );
}







// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode, targetNode) {
    // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
    const {
        width: intersectionNodeWidth,
        height: intersectionNodeHeight,
        positionAbsolute: intersectionNodePosition,
    } = intersectionNode;
    const targetPosition = targetNode.positionAbsolute;

    const w = intersectionNodeWidth / 2;
    const h = intersectionNodeHeight / 2;

    const x2 = intersectionNodePosition.x + w;
    const y2 = intersectionNodePosition.y + h;
    const x1 = targetPosition.x + targetNode.width / 2;
    const y1 = targetPosition.y + targetNode.height / 2;

    const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
    const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
    const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
    const xx3 = a * xx1;
    const yy3 = a * yy1;
    const x = w * (xx3 + yy3) + x2;
    const y = h * (-xx3 + yy3) + y2;

    return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
    const n = { ...node.positionAbsolute, ...node };
    const nx = Math.round(n.x);
    const ny = Math.round(n.y);
    const px = Math.round(intersectionPoint.x);
    const py = Math.round(intersectionPoint.y);

    if (px <= nx + 1) {
        return Position.Left;
    }
    if (px >= nx + n.width - 1) {
        return Position.Right;
    }
    if (py <= ny + 1) {
        return Position.Top;
    }
    if (py >= n.y + n.height - 1) {
        return Position.Bottom;
    }

    return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
function getEdgeParams(source, target) {
    const sourceIntersectionPoint = getNodeIntersection(source, target);
    const targetIntersectionPoint = getNodeIntersection(target, source);

    const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
    const targetPos = getEdgePosition(target, targetIntersectionPoint);

    return {
        sx: sourceIntersectionPoint.x,
        sy: sourceIntersectionPoint.y,
        tx: targetIntersectionPoint.x,
        ty: targetIntersectionPoint.y,
        sourcePos,
        targetPos,
    };
}

function createNodesAndEdges() {
    const nodes = [];
    const edges = [];
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    nodes.push({ id: 'target', data: { title: 'Sera', subline: [] }, position: center, type: 'turbo' });
    const names = ["WAF", "Gateway", "Proxy", "Database", "Backend", "SOAR", "IAM", "Monitors"]
    const lists = [
        ["AWS", "Cloudflare", "F5"],
        ["AWS API Gateway", "Kong", "Apigee"],
        ["NGINX", "HAProxy"],
        ["MySQL", "Postgres", "Mongo"],
        ["K8s", "Docker", "Web Apps"],
        ["Splunk", "Sentinel"],
        ["Okta", "Azure", "AWS IAM"],
        ["Noname", "Datadog", "Prometheus"]
    ]

    for (let i = 0; i < 8; i++) {
        const degrees = i * (360 / 8);
        const radians = degrees * (Math.PI / 180);
        const x = 250 * Math.cos(radians) + center.x;
        const y = 250 * Math.sin(radians) + center.y;

        nodes.push({ id: `${i}`, data: { title: names[i], subline: lists[i] || [] }, position: { x, y }, type: 'turbo' });

        edges.push({
            id: `edge-${i}`,
            target: 'target',
            source: `${i}`,
            className: "react-flow__edge-path",
            type: 'floating',
        });
    }

    return { nodes, edges };
}
function TurboEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;

    const [edgePath] = getBezierPath({
        // we need this little hack in order to display the gradient for a straight line
        sourceX: xEqual ? sourceX + 0.0001 : sourceX,
        sourceY: yEqual ? sourceY + 0.0001 : sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
        </>
    );
}


function FloatingConnectionLine({
    toX,
    toY,
    fromPosition,
    toPosition,
    fromNode,
    id,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd, }) {
    if (!fromNode) {
        return null;
    }

    const targetNode = {
        id: 'connection-target',
        width: 1,
        height: 1,
        positionAbsolute: { x: toX, y: toY }
    };


    const { sx, sy } = getEdgeParams(fromNode, targetNode);

    const xEqual = sx === targetX;
    const yEqual = sy === targetY;

    const [edgePath] = getBezierPath({
        sourceX: xEqual ? sx + 0.0001 : sx,
        sourceY: yEqual ? sy + 0.0001 : sy,
        sourcePosition: fromPosition,
        targetPosition: toPosition,
        targetX: toX,
        targetY: toY
    });

    return (
        <g>

            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
            />
        </g>
    );
}