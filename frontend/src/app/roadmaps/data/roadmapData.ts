import { Node } from '@xyflow/react';
import { RoadmapCollection } from '../types';
import { COLORS, EDGE_STYLE } from '../constants';

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

const createEdge = (id: string, source: string, target: string) => ({
  id,
  source,
  target,
  animated: true,
  style: EDGE_STYLE,
});

export const initialRoadmapData: RoadmapCollection = {
  ai: {
    nodes: [
      createNode('1', 'Python Basics', 400, 100, COLORS.GREEN),
      createNode('2', 'Mathematics & Statistics', 400, 200, COLORS.ORANGE),
      createNode('3', 'NumPy & Pandas', 200, 300, COLORS.BLUE),
      createNode('4', 'Data Visualization', 600, 300, COLORS.BLUE),
      createNode('5', 'Machine Learning', 400, 400, COLORS.PURPLE),
      createNode('6', 'Deep Learning', 200, 500, COLORS.PINK),
      createNode('7', 'Neural Networks', 600, 500, COLORS.PINK),
      createNode('8', 'AI Projects', 400, 600, COLORS.INDIGO),
    ],
    edges: [
      createEdge('e1-2', '1', '2'),
      createEdge('e2-3', '2', '3'),
      createEdge('e2-4', '2', '4'),
      createEdge('e3-5', '3', '5'),
      createEdge('e4-5', '4', '5'),
      createEdge('e5-6', '5', '6'),
      createEdge('e5-7', '5', '7'),
      createEdge('e6-8', '6', '8'),
      createEdge('e7-8', '7', '8'),
    ],
  },
  dsa: {
    nodes: [
      createNode('1', 'Programming Basics', 400, 100, COLORS.GREEN),
      createNode('2', 'Arrays & Strings', 400, 200, COLORS.ORANGE),
      createNode('3', 'Linked Lists', 200, 300, COLORS.BLUE),
      createNode('4', 'Stacks & Queues', 600, 300, COLORS.BLUE),
      createNode('5', 'Trees & Graphs', 400, 400, COLORS.PURPLE),
      createNode('6', 'Sorting Algorithms', 200, 500, COLORS.PINK),
      createNode('7', 'Dynamic Programming', 600, 500, COLORS.PINK),
      createNode('8', 'Advanced Algorithms', 400, 600, COLORS.INDIGO),
    ],
    edges: [
      createEdge('e1-2', '1', '2'),
      createEdge('e2-3', '2', '3'),
      createEdge('e2-4', '2', '4'),
      createEdge('e3-5', '3', '5'),
      createEdge('e4-5', '4', '5'),
      createEdge('e5-6', '5', '6'),
      createEdge('e5-7', '5', '7'),
      createEdge('e6-8', '6', '8'),
      createEdge('e7-8', '7', '8'),
    ],
  },
  webdev: {
    nodes: [
      createNode('1', 'HTML & CSS', 400, 100, COLORS.GREEN),
      createNode('2', 'JavaScript', 400, 200, COLORS.ORANGE),
      createNode('3', 'React.js', 200, 300, COLORS.BLUE),
      createNode('4', 'TypeScript', 600, 300, COLORS.BLUE),
      createNode('5', 'Next.js', 400, 400, COLORS.PURPLE),
      createNode('6', 'State Management', 200, 500, COLORS.PINK),
      createNode('7', 'Testing', 600, 500, COLORS.PINK),
      createNode('8', 'Deployment', 400, 600, COLORS.INDIGO),
    ],
    edges: [
      createEdge('e1-2', '1', '2'),
      createEdge('e2-3', '2', '3'),
      createEdge('e2-4', '2', '4'),
      createEdge('e3-5', '3', '5'),
      createEdge('e4-5', '4', '5'),
      createEdge('e5-6', '5', '6'),
      createEdge('e5-7', '5', '7'),
      createEdge('e6-8', '6', '8'),
      createEdge('e7-8', '7', '8'),
    ],
  },
};