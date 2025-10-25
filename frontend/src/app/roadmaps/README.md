# Roadmaps Feature

This directory contains the interactive roadmaps feature that displays learning paths for different technologies.

## Structure

```
roadmaps/
├── components/           # Reusable UI components
│   ├── CustomNode.tsx   # Custom ReactFlow node component
│   ├── RoadmapFlow.tsx  # ReactFlow wrapper component
│   ├── RoadmapHeader.tsx # Header with current roadmap info
│   ├── RoadmapSidebar.tsx # Navigation sidebar
│   └── index.ts         # Component exports
├── data/
│   └── roadmapData.ts   # Roadmap nodes and edges data
├── constants.ts         # App constants (tabs, colors, styles)
├── types.ts            # TypeScript type definitions
├── page.tsx            # Main page component
└── README.md           # This file
```

## Components

### CustomNode
- Renders individual roadmap steps with custom styling
- Handles different colors and labels
- Includes ReactFlow handles for connections

### RoadmapSidebar
- Navigation between different roadmaps (AI, DSA, Web Dev)
- Shows active state and hover effects

### RoadmapHeader
- Displays current roadmap title and description
- Shows roadmap icon

### RoadmapFlow
- Wraps ReactFlow with custom configuration
- Handles node/edge interactions
- Includes controls, minimap, and background

## Data Structure

Each roadmap contains:
- **nodes**: Array of learning steps with positions and styling
- **edges**: Array of connections between steps

## Adding New Roadmaps

1. Add new tab to `ROADMAP_TABS` in `constants.ts`
2. Add roadmap data to `initialRoadmapData` in `data/roadmapData.ts`
3. Use the `createNode()` and `createEdge()` helper functions

## Styling

Colors are defined in `constants.ts` using the `COLORS` object for consistency across all roadmaps.