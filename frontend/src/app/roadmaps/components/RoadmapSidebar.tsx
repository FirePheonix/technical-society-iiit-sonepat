import { RoadmapTab } from '../types';

interface RoadmapSidebarProps {
  tabs: RoadmapTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export function RoadmapSidebar({ 
  tabs, 
  activeTab, 
  onTabChange, 
  isMobileMenuOpen = false,
  setIsMobileMenuOpen 
}: RoadmapSidebarProps) {
  // Removed isExpanded state since sidebar is always open now 
  const getTabGradient = (tabId: string) => {
    switch (tabId) {
      case 'ai': return 'from-purple-500 to-pink-500';
      case 'dsa': return 'from-blue-500 to-cyan-500';
      case 'webdev': return 'from-green-500 to-teal-500';
      default: return 'from-primary to-green-500';
    }
  };

  // Get glow color for each tab
  const getTabGlow = (tabId: string) => {
    switch (tabId) {
      case 'ai': return 'rgba(168, 85, 247, 0.4)';
      case 'dsa': return 'rgba(59, 130, 246, 0.4)';
      case 'webdev': return 'rgba(34, 197, 94, 0.4)';
      default: return 'rgba(34, 197, 94, 0.4)';
    }
  };

  return (
    <>
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 
          bg-black border-border
          backdrop-blur-xl border-r
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="px-4 py-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`
              transition-all duration-500 ease-out overflow-hidden
            `}>
              <h1 className={`text-xl font-bold whitespace-nowrap bg-clip-text bg-gradient-to-r from-black to-white`}>
                Roadmaps
              </h1>
              <p className={`text-xs text-muted-foreground/80 whitespace-nowrap`}>
                Interactive paths
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen?.(false)}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 px-2 py-6 overflow-y-auto">
          <div className="space-y-1 lg:space-y-2">
            <div className={`
              text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2
            `}>
              Learning Paths
            </div>
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              const tabGradient = getTabGradient(tab.id);
              const tabGlow = getTabGlow(tab.id);
              
              return (
                <div key={tab.id} className="relative group/tab">
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`
                      w-full flex items-center rounded-xl font-medium transition-all duration-300 text-left relative overflow-hidden
                      px-3 space-x-3 py-3
                      ${isActive
                        ? `bg-gradient-to-r ${tabGradient}/30 text-foreground border border-${tab.id === 'ai' ? 'purple' : tab.id === 'dsa' ? 'blue' : 'green'}-500/50 shadow-lg`
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }
                      transform hover:scale-105
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative flex-shrink-0">
                      <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : ''} group-hover/tab:scale-110`}>
                        {tab.icon}
                      </span>
                      {isActive && (
                        <div 
                          className="absolute -inset-1 rounded-full opacity-30 animate-ping"
                          style={{ background: `radial-gradient(circle, ${tabGlow}, transparent 70%)` }}
                        ></div>
                      )}
                    </div>
                    
                    <div className={`
                      flex-1 transition-all duration-500 ease-out overflow-hidden
                    `}>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {tab.label}
                      </span>
                    </div>
                    
                    {isActive && (
                      <div 
                        className="absolute inset-0 rounded-xl"
                        style={{ background: `linear-gradient(90deg, ${tabGlow}20, transparent)` }}
                      ></div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`
          px-2 py-4 border-t border-border
        `}>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen?.(false)}
        />
      )}
    </>
  );
}