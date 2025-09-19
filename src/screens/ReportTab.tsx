import React, { useState } from 'react';
import { SimulationRunner } from '../components/Report/SimulationRunner';
import { FinalReportView } from '../components/Report/FinalReportView';
import { useAppStore } from '../store/appStore';

export const ReportTab: React.FC = () => {
  const { hasUploadedFiles } = useAppStore();
  const [showFinalReport, setShowFinalReport] = useState(false);

  if (!hasUploadedFiles) {
    return (
      <div style={{
        padding: '60px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        margin: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          marginBottom: '8px'
        }}>
          No simulations available
        </h3>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)'
        }}>
          Please upload brand strategy documents and configure your product in the Setup tab first
        </p>
      </div>
    );
  }

  return (
    <>
      <SimulationRunner />
      
      <FinalReportView
        isOpen={showFinalReport}
        onClose={() => setShowFinalReport(false)}
        onApprove={() => {
          console.log('Report approved');
          setShowFinalReport(false);
        }}
      />
      
      {/* Button to show final report (for demo) */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 100
      }}>
        <button
          onClick={() => setShowFinalReport(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          View Final Report
        </button>
      </div>
    </>
  );
};