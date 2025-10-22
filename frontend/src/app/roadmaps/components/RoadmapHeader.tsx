import { RoadmapTab } from '../types';

interface RoadmapHeaderProps {
  currentTab: RoadmapTab | undefined;
}

export function RoadmapHeader({ currentTab }: RoadmapHeaderProps) {
  if (!currentTab) return null;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{currentTab.icon}</span>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {currentTab.label} Roadmap
          </h2>
          <p className="text-sm text-gray-600">
            Follow this path to master {currentTab.label.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}