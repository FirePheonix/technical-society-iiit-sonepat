import { RoadmapTab } from '../types';

interface RoadmapSidebarProps {
  tabs: RoadmapTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function RoadmapSidebar({ tabs, activeTab, onTabChange }: RoadmapSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Roadmaps</h1>
        <p className="text-sm text-gray-600">Interactive learning paths</p>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
            Learning Paths
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 text-left ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}