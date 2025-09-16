import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { FileText, Plus, Edit2 } from 'lucide-react';

interface MainDashboardProps {
  onNavigate?: (screen: any) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('brand');
  const [activeSection, setActiveSection] = useState('documents');

  const tabs = [
    { id: 'brand', label: 'Brand' },
    { id: 'setup', label: 'Setup' },
    { id: 'live', label: 'Live' }
  ];

  const documents = [
    {
      name: 'odaiazol_strategy_H2_2025.pdf',
      size: '3.4 MB'
    },
    {
      name: 'Notes: "Brand Strategy H2 2025 Overview".docx',
      size: '3.4 MB'
    }
  ];

  const brandItems = [
    {
      title: 'Brand',
      tags: ['Oncology', 'Solid Tumors', 'Breast Cancer'],
      description: 'Within the oncology vertical, the therapeutic area of breast cancer includes the HER2+ indication, where the antibody-drug conjugate (ADC) drug class competes, and products progress through a life cycle from launch in 2L metastatic disease to expansion into earlier lines and adjacent populations',
      status: 'Ready',
      approved: true
    },
    {
      title: 'Brand Access Strategy',
      tags: ['OncoConnect PSP', 'OncoThera Copay Card', 'OncoPortal web'],
      description: 'The access strategy for OncoThera includes the OncoConnect PSP to streamline patient access, the OncoThera Copay Card for eligible patients, and the OncoPortal web platform for real-time prior authorization and patient tracking.',
      status: 'Missing info',
      approved: true
    },
    {
      title: 'Sales Goals',
      tags: ['XPO TRx', 'Increase volume by 20%', 'Breast Cancer'],
      description: 'Focus on driving a sustained increase in TRx volume in the 2L HER2+ metastatic breast cancer segment by expanding adoption among high-volume oncologists, capturing switches from T-DM1, and supporting persistence through PSP and copay programs',
      status: 'Ready',
      approved: true
    },
    {
      title: 'Competitive Landscape',
      status: 'Ready',
      approved: false
    }
  ];

  const suggestions = [
    'Add Copay Card PSP',
    'Change Sales goals to NBRx increase by 10%'
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div style={{ flex: 1, display: 'flex' }}>
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
            
            {/* Documents */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <FileText style={{ width: '16px', height: '16px', color: 'var(--text-muted)' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  2 documents uploaded
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {documents.map((doc, index) => (
                  <div key={index} style={{ 
                    backgroundColor: 'var(--bg-input)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <FileText style={{ width: '16px', height: '16px', color: 'var(--text-muted)', marginTop: '2px' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ 
                        fontSize: '13px',
                        color: 'var(--text-primary)',
                        fontWeight: '400',
                        margin: 0,
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{doc.name}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{doc.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Suggestions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
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
                  <button style={{
                    padding: '6px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 200ms'
                  }}>
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
        <div style={{ flex: 1, backgroundColor: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
          <Header tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div style={{ padding: '24px', overflow: 'auto' }}>
            <div>
              {activeTab === 'brand' && brandItems.map((item, index) => (
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
                        onClick={() => item.title === 'Brand Access Strategy' && onNavigate?.('brand-access')}
                      >
                        Approve
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {activeTab === 'setup' && (
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
                          onClick={() => onNavigate?.('hcp-dialog')}
                        >
                          Approve
                        </Button>
                        <Button variant="ghost" size="sm">View</Button>
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
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              {activeTab === 'live' && (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Live monitoring and analytics will appear here once setup is complete.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};