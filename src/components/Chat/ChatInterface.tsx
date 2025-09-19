import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/chatStore';
import { ChatMessage } from './ChatMessage';
import { PrePromptedButton } from './PrePromptedButton';
import { Send } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { 
    messages, 
    prePrompts, 
    isTyping, 
    executeDemoStep,
    currentStep 
  } = useChatStore();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, prePrompts]);
  
  // Start the demo on first load
  useEffect(() => {
    if (currentStep === 0 && messages.length === 0) {
      // Start the demo flow after a short delay
      setTimeout(() => {
        executeDemoStep(0);
      }, 1000);
    }
  }, []);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'transparent'
    }}>
      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 0',
          marginBottom: '16px',
          minHeight: 0
        }}
      >
        {/* Show messages */}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px',
            alignItems: 'center'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{
                fontSize: '12px',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                AI
              </span>
            </div>
            <div style={{
              padding: '8px 12px',
              backgroundColor: 'var(--bg-input)',
              borderRadius: '8px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#64748b',
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#64748b',
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: '0.2s'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#64748b',
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: '0.4s'
              }} />
            </div>
          </div>
        )}
        
        {/* Pre-prompted buttons */}
        {prePrompts.length > 0 && !isTyping && (
          <div style={{ 
            marginTop: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {prePrompts.map((prompt) => (
              <div key={prompt.id} style={{ flex: '0 0 auto', maxWidth: '100%' }}>
                <PrePromptedButton prompt={prompt} />
              </div>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area - Always visible */}
      <div style={{
        backgroundColor: 'var(--bg-input)',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        padding: '12px',
        position: 'relative',
        marginTop: 'auto'
      }}>
        <textarea
          placeholder="Ask Agent"
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '13px',
            resize: 'none',
            border: 'none',
            outline: 'none',
            minHeight: '60px',
            fontFamily: 'inherit'
          }}
          rows={3}
          disabled={currentStep < 7} // Disabled during demo
        />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '8px'
        }}>
          <button
            disabled={currentStep < 7} // Disabled during demo
            style={{
              padding: '6px 12px',
              backgroundColor: '#3b82f6',
              border: 'none',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '500',
              cursor: currentStep < 7 ? 'not-allowed' : 'pointer',
              opacity: currentStep < 7 ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={14} />
            Send
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};