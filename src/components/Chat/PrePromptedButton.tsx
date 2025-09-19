import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { PrePrompt } from '../../store/chatStore';

interface PrePromptedButtonProps {
  prompt: PrePrompt;
}

export const PrePromptedButton: React.FC<PrePromptedButtonProps> = ({ prompt }) => {
  if (!prompt.visible) return null;
  
  return (
    <div style={{
      animation: 'slideIn 0.3s ease-out'
    }}>
      <button
        onClick={prompt.action}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '12px 14px',
          backgroundColor: 'var(--bg-input)',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          fontSize: '13px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          transition: 'all 200ms',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
          e.currentTarget.style.borderColor = '#3b82f6';
          e.currentTarget.style.transform = 'translateX(2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-input)';
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <span>{prompt.text}</span>
        <ArrowRight size={14} style={{ color: '#3b82f6' }} />
      </button>
      
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};