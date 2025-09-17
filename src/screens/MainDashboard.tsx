import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { FileUpload, FileList } from '../components/FileUpload';
import { Plus, Edit2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';

interface MainDashboardProps {
  onNavigate?: (screen: string) => void;
  activeTab?: string;
  onEdit?: (item: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({ onNavigate, activeTab = 'brand', onEdit }) => {
  const { uploadedFiles, brandConfig, setActiveModal, isProcessingFile, hasUploadedFiles, setEditingCardType } = useAppStore();

  const suggestions = [
    'Add Copay Card PSP',
    'Change Sales goals to NBRx increase by 10%'
  ];

  const brandItems = [
    {
      title: 'Brand',
      tags: brandConfig.brand.tags,
      description: brandConfig.brand.description,
      status: brandConfig.brand.status,
      approved: brandConfig.brand.approved
    },
    {
      title: 'Brand Access Strategy',
      tags: ['OncoConnect PSP', 'OncoThera Copay Card', 'OncoPortal web'],
      description: 'The access strategy for OncoThera includes the OncoConnect PSP to streamline patient access, the OncoThera Copay Card for eligible patients, and the OncoPortal web platform for real-time prior authorization and patient tracking.',
      status: brandConfig.brandAccess.status,
      approved: brandConfig.brandAccess.approved,
      onClick: () => onNavigate?.('brand-access')
    },
    {
      title: 'Sales Goals',
      tags: ['XPO TRx', 'Increase volume by 20%', 'Breast Cancer'],
      description: 'Focus on driving a sustained increase in TRx volume in the 2L HER2+ metastatic breast cancer segment by expanding adoption among high-volume oncologists, capturing switches from T-DM1, and supporting persistence through PSP and copay programs',
      status: brandConfig.salesGoals.status,
      approved: brandConfig.salesGoals.approved
    },
    {
      title: 'Competitive Landscape',
      tags: brandConfig.competitiveLandscape.tags,
      description: brandConfig.competitiveLandscape.description,
      status: brandConfig.competitiveLandscape.status,
      approved: brandConfig.competitiveLandscape.approved
    },
    {
      title: 'Medical Objectives',
      tags: ['Target Product Nacida', `Score: ${brandConfig.medicalObjectives.basketScore}/10`, ...brandConfig.medicalObjectives.indications],
      description: `Configure primary objectives for ${brandConfig.medicalObjectives.basketName || 'medical products'}. This includes therapeutic area targeting, indication selection, and scoring weight configurations for optimal HCP targeting and engagement strategies.`,
      status: brandConfig.medicalObjectives.status,
      approved: brandConfig.medicalObjectives.approved
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Assistant Panel */}
      <div style={{ 
        width: '380px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px 20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '22px' }}>👋</span>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                lineHeight: '1.4',
                margin: 0
              }}>
                I'm your Maptual<br />
                Configuration Assistant
              </h1>
            </div>
          </div>
          
          {/* Instructions */}
          <p style={{ 
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '14px',
            lineHeight: '1.5'
          }}>
            To get started, upload any slide decks, documents, or meeting notes that outline your brand strategy.
          </p>
          
          <p style={{ 
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            lineHeight: '1.5'
          }}>
            I'll extract strategic insights to suggest optimal configurations for Maptual Field.
          </p>
          
          {/* File Upload or List */}
          {uploadedFiles.length === 0 ? (
            <FileUpload />
          ) : (
            <FileList />
          )}
          
          {/* Suggestions */}
          {uploadedFiles.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px', marginBottom: '24px' }}>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 14px',
                    backgroundColor: 'var(--bg-input)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 200ms'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-input)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          {/* Input Area */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ 
              backgroundColor: 'var(--bg-input)',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              padding: '12px'
            }}>
              <textarea
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  resize: 'none',
                  border: 'none',
                  outline: 'none',
                  minHeight: '80px',
                  fontFamily: 'inherit'
                }}
                placeholder="Ask Agent"
                rows={5}
              />
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px'
              }}>
                <button 
                  onClick={() => setActiveModal('new-project')}
                  style={{
                    padding: '6px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 200ms'
                  }}
                >
                  <Plus style={{ width: '18px', height: '18px', color: 'var(--text-muted)' }} />
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'background-color 200ms'
                }}>
                  <Edit2 style={{ width: '14px', height: '14px', color: 'var(--text-muted)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
        <div>
          {/* Show processing state */}
          {isProcessingFile && (
            <div style={{
              padding: '60px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 20px',
                border: '3px solid var(--border-primary)',
                borderTop: '3px solid var(--accent-blue)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <h3 style={{
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Processing your documents...
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'var(--text-secondary)'
              }}>
                Extracting strategic insights and generating configuration suggestions
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}
          
          {/* Show brand items only after file upload */}
          {activeTab === 'brand' && hasUploadedFiles && !isProcessingFile && brandItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <CardTitle>{item.title}</CardTitle>
                  <Badge variant={item.status === 'Ready' ? 'success' : 'warning'}>
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {item.tags && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} style={{
                        padding: '6px 12px',
                        backgroundColor: 'var(--border-primary)',
                        color: 'var(--text-secondary)',
                        fontSize: '12px',
                        fontWeight: '500',
                        borderRadius: '4px'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.description && (
                  <p style={{ 
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>{item.description}</p>
                )}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else if (item.title === 'Brand Access Strategy') {
                        setActiveModal('brand-access');
                      }
                    }}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      const itemKey = item.title === 'Brand' ? 'brand' : 
                                     item.title === 'Brand Access Strategy' ? 'brandAccess' :
                                     item.title === 'Sales Goals' ? 'salesGoals' :
                                     item.title === 'Competitive Landscape' ? 'competitiveLandscape' :
                                     item.title === 'Medical Objectives' ? 'medicalObjectives' : null;
                      
                      // Route specific cards to the ProjectObjectiveDialog
                      if (itemKey === 'medicalObjectives' || itemKey === 'brandAccess' || 
                          itemKey === 'salesGoals' || itemKey === 'competitiveLandscape') {
                        setEditingCardType(itemKey);
                        setActiveModal('project-objective');
                      } else if (itemKey && onEdit) {
                        onEdit(itemKey);
                      }
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Show prompt to upload files if none uploaded */}
          {activeTab === 'brand' && !hasUploadedFiles && !isProcessingFile && (
            <div style={{
              padding: '60px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                No insights available yet
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'var(--text-secondary)'
              }}>
                Upload brand strategy documents to generate configuration insights
              </p>
            </div>
          )}
          
          {activeTab === 'setup' && hasUploadedFiles && (
            <>
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      <CardTitle>Value Engine: HCP Targeting</CardTitle>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Established Product</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>• 70/30 Value Weighting</span>
                      </div>
                    </div>
                    <Badge variant="warning">Ready for Review</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    This defines how we value HCPs for scoring.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => setActiveModal('hcp-targeting')}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveModal('hcp-targeting')}
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      <CardTitle>Curation Engine: Call Plan</CardTitle>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>40 HCP/Week</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>• 12 Signals</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>• Reach & Frequency</span>
                      </div>
                    </div>
                    <Badge variant="warning">Ready for Review</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Define what, how and how often you would like our suggestions delivered to your sales reps.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="primary" size="sm">Approve</Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveModal('call-plan')}
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};