import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div 
      className={cn('rounded-lg', className)}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        padding: '20px',
        marginBottom: '12px'
      }}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn('mb-3', className)}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <h3 
      className={cn(className)}
      style={{ 
        fontSize: '15px',
        fontWeight: '500',
        color: 'var(--text-primary)',
        marginBottom: '6px'
      }}
    >
      {children}
    </h3>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div 
      className={cn(className)}
      style={{ 
        fontSize: '13px',
        color: 'var(--text-secondary)',
        lineHeight: '1.5'
      }}
    >
      {children}
    </div>
  );
};