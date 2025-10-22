'use client';

import { useState, useEffect } from 'react';
import { useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { RoadmapSidebar, RoadmapHeader, RoadmapFlow } from './components';
import { initialRoadmapData } from './data/roadmapData';
import { ROADMAP_TABS } from './constants';
import { RoadmapCollection } from './types';

export default function RoadmapsPage() {
  const [activeTab, setActiveTab] = useState('ai');
  
  const initialData = initialRoadmapData.ai;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  useEffect(() => {
    const roadmapKey = activeTab as keyof RoadmapCollection;
    const roadmapData = initialRoadmapData[roadmapKey];
    if (roadmapData) {
      setNodes(roadmapData.nodes);
      setEdges(roadmapData.edges);
    }
  }, [activeTab, setNodes, setEdges]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const currentTab = ROADMAP_TABS.find(tab => tab.id === activeTab);

  return (
    <div className="roadmaps-page h-screen w-full bg-white flex">
      <RoadmapSidebar 
        tabs={ROADMAP_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <div className="flex-1 bg-gray-50">
        <RoadmapHeader currentTab={currentTab} />
        <RoadmapFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgesSet={setEdges}
        />
      </div>
    </div>
  );
}