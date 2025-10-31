import { useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CustomNodeData } from '../types';

// Helper function to convert Tailwind classes to actual colors
const getColorFromTailwind = (className: string): string => {
  const colorMap: Record<string, string> = {
    'bg-primary': '#22c55e', // hsl(142 84% 58%) from globals.css
    'border-primary': '#22c55e',
    'bg-green-500': '#22c55e',
    'bg-yellow-500': '#eab308',
    'bg-purple-500': '#a855f7',
    'bg-pink-500': '#ec4899',
    'bg-blue-500': '#3b82f6',
    'bg-indigo-500': '#6366f1',
    'bg-teal-500': '#14b8a6',
    'bg-cyan-500': '#06b6d4',
    'bg-emerald-500': '#10b981',
    'bg-violet-500': '#8b5cf6'
  };
  
  return colorMap[className] || '#22c55e'; // default to primary green if not found
};

// Helper function to adjust color brightness
const adjustColorBrightness = (color: string, amount: number): string => {
  // Convert hex to RGB
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);
  
  // Adjust brightness
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

interface CustomNodeProps {
  data?: CustomNodeData;
  selected?: boolean;
}

export function CustomNode({ data, selected }: CustomNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  // Guard clause for undefined data with better error handling
  if (!data) {
    console.warn('CustomNode received undefined data, rendering fallback node');
    return (
      <div className="rounded-xl bg-red-500/20 border border-red-500/50 p-2 text-center">
        <div className="text-red-400 text-xs">Error: Missing node data</div>
      </div>
    );
  }

  // Use theme-based colors with fallbacks
  const backgroundColor = data?.color || 'bg-primary';
  const borderColor = data?.borderColor || 'border-primary';
  const label = data?.label || 'Untitled';

  const getSkillLevel = () => {
    if (backgroundColor === 'bg-green-500') return 'Beginner';
    if (backgroundColor === 'bg-yellow-500') return 'Intermediate';
    if (backgroundColor === 'bg-primary') return 'Advanced';
    if (backgroundColor === 'bg-purple-500') return 'Expert';
    if (backgroundColor === 'bg-pink-500') return 'Master';
    if (backgroundColor === 'bg-blue-500') return 'Specialist';
    if (backgroundColor === 'bg-indigo-500') return 'Professional';
    if (backgroundColor === 'bg-teal-500') return 'Skilled';
    if (backgroundColor === 'bg-cyan-500') return 'Practitioner';
    if (backgroundColor === 'bg-emerald-500') return 'Accomplished';
    if (backgroundColor === 'bg-violet-500') return 'Seasoned';
    return 'Advanced';
  };

  const skillLevel = getSkillLevel();

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setParticles(prev => [
          ...prev.slice(-5), 
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100
          }
        ]);
      }, 200);

      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  return (
    <div 
      className="creative-node-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: '4px',
            height: '4px',
            background: getColorFromTailwind(backgroundColor),
            borderRadius: '50%',
            opacity: 0.6,
            animation: 'floatUp 2s ease-out forwards',
            pointerEvents: 'none',
            zIndex: 10
          }}
        />
      ))}

      <div
        className={`absolute inset-[-4px] rounded-xl opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}
        style={{
          background: `conic-gradient(from 0deg, ${getColorFromTailwind(backgroundColor)}60, ${getColorFromTailwind(borderColor)}60, ${getColorFromTailwind(backgroundColor)}60)`,
          filter: 'blur(8px)',
          zIndex: 1
        }}
      />

      <div 
        className={`main-node relative rounded-xl flex items-center justify-center text-center font-bold min-w-[100px] min-h-[45px] transition-all duration-300 z-3 ${
          isHovered ? 'scale-105' : 'scale-100'
        } ${selected ? 'animate-pulse' : ''}`}
        style={{
          color: '#ffffff',
          border: `3px solid ${getColorFromTailwind(borderColor)}`,
          boxShadow: isHovered 
            ? `0 8px 25px ${getColorFromTailwind(backgroundColor)}cc, 0 0 0 1px ${getColorFromTailwind(backgroundColor)}aa`
            : `0 4px 12px ${getColorFromTailwind(backgroundColor)}80`,
          width: 'clamp(120px, 16vw, 160px)',
          height: 'clamp(50px, 8vh, 60px)',
          fontSize: 'clamp(11px, 2.2vw, 15px)',
          padding: 'clamp(6px, 1.2vw, 10px)',
          background: isHovered 
            ? `linear-gradient(135deg, ${getColorFromTailwind(backgroundColor)}, ${adjustColorBrightness(getColorFromTailwind(backgroundColor), -30)})`
            : `linear-gradient(145deg, ${getColorFromTailwind(backgroundColor)}, ${adjustColorBrightness(getColorFromTailwind(backgroundColor), -20)})`,
          position: 'relative',
          overflow: 'hidden',
          textShadow: '0 1px 3px rgba(0,0,0,0.3)'
        }}
      >
        {/* Animated background effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.2) 10px,
              rgba(255,255,255,0.2) 20px
            )`,
            animation: isHovered ? 'slide 2s linear infinite' : 'none'
          }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${getColorFromTailwind(backgroundColor)}cc, transparent 70%)`,
            filter: 'blur(15px)',
            transition: 'opacity 0.3s ease',
            opacity: isHovered ? 0.8 : 0
          }}
        />

        {/* Inner glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-20"
          style={{
            background: `linear-gradient(45deg, ${getColorFromTailwind(backgroundColor)}40, transparent)`,
            transition: 'opacity 0.3s ease',
            opacity: isHovered ? 0.6 : 0.3
          }}
        />

        {/* Border glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, transparent, ${getColorFromTailwind(borderColor)}80, transparent)`,
            transition: 'opacity 0.3s ease',
            opacity: isHovered ? 0.7 : 0
          }}
        />

        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-3 h-3 rounded-full shadow-md"
          style={{ 
            background: 'linear-gradient(45deg, #333333, #000000)',
            border: `2px solid ${getColorFromTailwind(borderColor)}`,
          }} 
        />

        <div
          className={`absolute top-[-8px] left-[-8px] text-foreground text-xs font-semibold rounded-full px-2 py-1 transition-opacity duration-300 shadow-lg ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } z-10`}
          style={{
            background: `linear-gradient(135deg, ${getColorFromTailwind(backgroundColor)}, ${adjustColorBrightness(getColorFromTailwind(backgroundColor), -20)})`,
            border: `1px solid ${getColorFromTailwind(borderColor)}`,
            boxShadow: `0 2px 8px ${getColorFromTailwind(backgroundColor)}80`
          }}
        >
          {skillLevel}
        </div>

        <div className="px-1.5 leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap text-shadow relative z-2 font-semibold"
          style={{
            animation: isHovered ? 'pulse 2s infinite' : 'none'
          }}>
          {label}
        </div>

        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-3 h-3 rounded-full shadow-md"
          style={{ 
            background: 'linear-gradient(45deg, #333333, #000000)',
            border: `2px solid ${getColorFromTailwind(borderColor)}`,
          }} 
        />
      </div>

      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black/90 border border-border text-foreground text-xs rounded-md py-2 px-3 mb-2 z-20 shadow-xl animate-tooltipSlideIn">
          <div className="font-semibold mb-0.5">{label}</div>
          <div className="opacity-80 text-[10px]">
            {skillLevel}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-border"></div>
        </div>
      )}
    </div>
  );
}