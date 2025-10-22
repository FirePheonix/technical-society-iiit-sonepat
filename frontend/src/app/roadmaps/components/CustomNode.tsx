import { Handle, Position } from '@xyflow/react';
import { CustomNodeData } from '../types';

interface CustomNodeProps {
  data: CustomNodeData;
}

export function CustomNode({ data }: CustomNodeProps) {
  const backgroundColor = data.color || '#3b82f6';
  const borderColor = data.borderColor || '#2563eb';

  return (
    <div style={{
      backgroundColor,
      color: '#ffffff',
      border: `3px solid ${borderColor}`,
      borderRadius: '12px',
      boxShadow: `0 4px 12px ${backgroundColor}30`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '140px',
      height: '50px',
      fontSize: '14px',
      fontWeight: '600',
      textAlign: 'center',
      padding: '8px'
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <div style={{ padding: '0 8px', lineHeight: '1.2' }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
}