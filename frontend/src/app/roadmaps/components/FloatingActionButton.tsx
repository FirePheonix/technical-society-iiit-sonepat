import { useState, useEffect } from 'react';

interface FloatingActionButtonProps {
  onReset: () => void;
  onFullscreen: () => void;
}

export function FloatingActionButton({ onReset, onFullscreen }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.floating-action-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const actions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      label: 'Reset View',
      onClick: onReset,
      color: 'from-orange-500 to-red-500',
      glow: 'rgba(249, 115, 22, 0.4)'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      label: 'Fullscreen',
      onClick: onFullscreen,
      color: 'from-purple-500 to-indigo-500',
      glow: 'rgba(168, 85, 247, 0.4)'
    }
  ];

  return (
    <div className="floating-action-button fixed bottom-6 right-6 z-50">
      <div className={`flex flex-col-reverse items-end space-y-reverse space-y-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => {
              action.onClick();
              setIsOpen(false); // Close menu after action
            }}
            className={`
              group relative w-12 h-12 bg-gradient-to-r ${action.color} 
              rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 
              transition-all duration-300 flex items-center justify-center text-white
              backdrop-blur-sm
            `}
            style={{ 
              boxShadow: `0 4px 12px ${action.glow}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            title={action.label}
          >
            {/* Subtle hover effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            {action.icon}
            <div className="absolute right-14 bg-black/90 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 border border-border backdrop-blur-sm transform translate-y-1 group-hover:translate-y-0">
              {action.label}
            </div>
          </button>
        ))}
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full 
          shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 
          flex items-center justify-center text-white
          backdrop-blur-sm border border-white/10
        `}
        style={{
          boxShadow: '0 4px 15px rgba(139, 92, 246, 0.5)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Clean static background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <svg className={`w-6 h-6 relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
}