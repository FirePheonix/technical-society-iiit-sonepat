import { Node, MarkerType } from '@xyflow/react';
import { RoadmapCollection } from '../types';
import { COLORS, EDGE_STYLES } from '../constants';

const createNode = (
  id: string,
  label: string,
  x: number,
  y: number,
  color: { bg: string; border: string }
): Node => ({
  id,
  type: 'custom',
  position: { x, y },
  data: { label, color: color.bg, borderColor: color.border },
  draggable: true,
});

const createEdge = (id: string, source: string, target: string, style?: any) => ({
  id,
  source,
  target,
  animated: true,
  style: style || EDGE_STYLES.DEFAULT,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: style?.stroke || '#6366f1'
  }
});

export const initialRoadmapData: RoadmapCollection = {
  ai: {
    nodes: [
      createNode('1', 'Python Basics', 250, 50, COLORS.GREEN),
      createNode('2', 'Mathematics & Statistics', 250, 150, COLORS.YELLOW),
      createNode('3', 'NumPy & Pandas', 100, 250, COLORS.BLUE),
      createNode('4', 'Data Visualization', 400, 250, COLORS.TEAL),
      createNode('5', 'Machine Learning', 250, 350, COLORS.PURPLE),
      createNode('6', 'Deep Learning', 100, 450, COLORS.INDIGO),
      createNode('7', 'Neural Networks', 400, 450, COLORS.VIOLET),
      createNode('8', 'AI Projects', 250, 550, COLORS.PINK),
    ],
    edges: [
      createEdge('e1-2', '1', '2', { strokeWidth: 5, stroke: COLORS.GREEN.bg }),
      createEdge('e2-3', '2', '3', { strokeWidth: 5, stroke: COLORS.YELLOW.bg }),
      createEdge('e2-4', '2', '4', { strokeWidth: 5, stroke: COLORS.YELLOW.bg }),
      createEdge('e3-5', '3', '5', { strokeWidth: 5, stroke: COLORS.BLUE.bg }),
      createEdge('e4-5', '4', '5', { strokeWidth: 5, stroke: COLORS.TEAL.bg }),
      createEdge('e5-6', '5', '6', { strokeWidth: 5, stroke: COLORS.PURPLE.bg }),
      createEdge('e5-7', '5', '7', { strokeWidth: 5, stroke: COLORS.PURPLE.bg }),
      createEdge('e6-8', '6', '8', { strokeWidth: 5, stroke: COLORS.INDIGO.bg }),
      createEdge('e7-8', '7', '8', { strokeWidth: 5, stroke: COLORS.VIOLET.bg }),
    ],
  },
  dsa: {
    nodes: [
      createNode('1', 'Programming Basics', 250, 50, COLORS.GREEN),
      createNode('2', 'Arrays & Strings', 250, 150, COLORS.ORANGE),
      createNode('3', 'Linked Lists', 100, 250, COLORS.CYAN),
      createNode('4', 'Stacks & Queues', 400, 250, COLORS.TEAL),
      createNode('5', 'Trees & Graphs', 250, 350, COLORS.PURPLE),
      createNode('6', 'Sorting Algorithms', 100, 450, COLORS.EMERALD),
      createNode('7', 'Dynamic Programming', 400, 450, COLORS.VIOLET),
      createNode('8', 'Advanced Algorithms', 250, 550, COLORS.PINK),
    ],
    edges: [
      createEdge('e1-2', '1', '2', { strokeWidth: 5, stroke: COLORS.GREEN.bg }),
      createEdge('e2-3', '2', '3', { strokeWidth: 5, stroke: COLORS.ORANGE.bg }),
      createEdge('e2-4', '2', '4', { strokeWidth: 5, stroke: COLORS.ORANGE.bg }),
      createEdge('e3-5', '3', '5', { strokeWidth: 5, stroke: COLORS.CYAN.bg }),
      createEdge('e4-5', '4', '5', { strokeWidth: 5, stroke: COLORS.TEAL.bg }),
      createEdge('e5-6', '5', '6', { strokeWidth: 5, stroke: COLORS.PURPLE.bg }),
      createEdge('e5-7', '5', '7', { strokeWidth: 5, stroke: COLORS.PURPLE.bg }),
      createEdge('e6-8', '6', '8', { strokeWidth: 5, stroke: COLORS.EMERALD.bg }),
      createEdge('e7-8', '7', '8', { strokeWidth: 5, stroke: COLORS.VIOLET.bg }),
    ],
  },
  webdev: {
    nodes: [
      createNode('1', 'HTML & CSS', 250, 50, COLORS.GREEN),
      createNode('2', 'JavaScript', 250, 150, COLORS.YELLOW),
      createNode('3', 'React.js', 100, 250, COLORS.CYAN),
      createNode('4', 'TypeScript', 400, 250, COLORS.BLUE),
      createNode('5', 'Next.js', 250, 350, COLORS.PURPLE),
      createNode('6', 'State Management', 100, 450, COLORS.TEAL),
      createNode('7', 'Testing', 400, 450, COLORS.EMERALD),
      createNode('8', 'Deployment', 250, 550, COLORS.PINK),
    ],
    edges: [
      createEdge('e1-2', '1', '2', { strokeWidth: 5, stroke: COLORS.GREEN.bg }),
      createEdge('e2-3', '2', '3', { strokeWidth: 5, stroke: COLORS.YELLOW.bg }),
      createEdge('e2-4', '2', '4', { strokeWidth: 5, stroke: COLORS.YELLOW.bg }),
      createEdge('e3-5', '3', '5', { strokeWidth: 5, stroke: COLORS.CYAN.bg }),
      createEdge('e4-5', '4', '5', { strokeWidth: 5, stroke: COLORS.BLUE.bg }),
      createEdge('e5-6', '5', '6', { strokeWidth: 5, stroke: COLORS.PURPLE.bg }),
      createEdge('e5-7', '5', '7', { strokeWidth: 5, stroke: COLORS.PURPLE.bg }),
      createEdge('e6-8', '6', '8', { strokeWidth: 5, stroke: COLORS.TEAL.bg }),
      createEdge('e7-8', '7', '8', { strokeWidth: 5, stroke: COLORS.EMERALD.bg }),
    ],
  },
};