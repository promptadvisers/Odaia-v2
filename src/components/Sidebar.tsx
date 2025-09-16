import React from 'react';
import { Users, FileText, Settings, User, Plus, Edit2 } from 'lucide-react';

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { icon: Users, label: 'Team', id: 'team' },
    { icon: FileText, label: 'Documents', id: 'documents' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: User, label: 'Profile', id: 'profile' }
  ];

  return (
    <div 
      style={{ 
        width: '50px',
        backgroundColor: 'var(--bg-main)',
        borderRight: '1px solid var(--border-subtle)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '12px',
        paddingBottom: '12px'
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '24px' }}>
        <div 
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'conic-gradient(from 0deg, #3b82f6 0deg, #0ea5e9 90deg, #14b8a6 180deg, #10b981 270deg, #3b82f6 360deg)'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              inset: '3px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #3b82f6 0deg, #0ea5e9 90deg, #14b8a6 180deg, #10b981 270deg, #3b82f6 360deg)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange?.(item.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'none'
            }}
            title={item.label}
          >
            <item.icon 
              style={{ 
                width: '20px',
                height: '20px',
                color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-muted)',
                strokeWidth: activeSection === item.id ? 2 : 1.5
              }} 
            />
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
        <button 
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Plus style={{ width: '20px', height: '20px', color: 'var(--text-muted)', strokeWidth: 1.5 }} />
        </button>
        <button 
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Edit2 style={{ width: '20px', height: '20px', color: 'var(--text-muted)', strokeWidth: 1.5 }} />
        </button>
      </div>
    </div>
  );
};