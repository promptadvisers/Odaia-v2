import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { useAppStore } from '../store/appStore';
import { ProductTreeModal } from '../components/Setup/ProductTreeModal';
import { TotalMarketTreeModal } from '../components/Setup/TotalMarketTreeModal';

interface SetupTabProps {
  onNavigateToReport?: () => void;
}

export const SetupTab: React.FC<SetupTabProps> = ({ onNavigateToReport }) => {
  const { productConfig, updateProductConfig, hasUploadedFiles } = useAppStore();
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCompetitiveModal, setShowCompetitiveModal] = useState(false);
  const [showMarketTreeModal, setShowMarketTreeModal] = useState(false);

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
          No configuration available
        </h3>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)'
        }}>
          Please upload brand strategy documents first in the Brand tab
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <CardTitle>Product Configuration</CardTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {productConfig.basketName}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    • Weight: {productConfig.basketWeight}/10
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    • {productConfig.therapeuticArea}
                  </span>
                </div>
              </div>
              <Badge variant="warning">Configuration Required</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Establish product portfolio, configure baskets, and assign metric weights for optimal targeting.
            </p>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Current Configuration:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', minWidth: '120px' }}>
                    Product:
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    {productConfig.product || 'Not configured'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', minWidth: '120px' }}>
                    Indication:
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    {productConfig.indication || 'Not configured'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', minWidth: '120px' }}>
                    Metrics:
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    {productConfig.metrics.filter(m => m.weight > 0).length} configured
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => setShowProductModal(true)}
              >
                Establish Product
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  if (onNavigateToReport) {
                    onNavigateToReport();
                  }
                }}
              >
                Run a Simulation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Competitive Products Card */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <CardTitle>Competitive Products</CardTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Market Analysis
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    • Total Market Tree
                  </span>
                </div>
              </div>
              <Badge variant="warning">Not Configured</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Define competitive landscape, market segments, and product positioning within the total market tree.
            </p>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Market Segments:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', minWidth: '120px' }}>
                    Primary Market:
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    Not configured
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', minWidth: '120px' }}>
                    Competitors:
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    0 identified
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', minWidth: '120px' }}>
                    Market Share:
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    Not analyzed
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => setShowMarketTreeModal(true)}
              >
                Configure Market
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMarketTreeModal(true)}
              >
                View Market Tree
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ProductTreeModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSave={(data) => {
          updateProductConfig(data);
          setShowProductModal(false);
        }}
      />
      
      <TotalMarketTreeModal
        isOpen={showMarketTreeModal}
        onClose={() => setShowMarketTreeModal(false)}
      />
    </>
  );
};