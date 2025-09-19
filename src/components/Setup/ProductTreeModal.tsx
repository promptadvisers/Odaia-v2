import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TreeSelector } from './TreeSelector';
import { MetricsTable } from './MetricsTable';
import { BasketSection } from './BasketSection';

interface ProductTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const ProductTreeModal: React.FC<ProductTreeModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [basketName, setBasketName] = useState('Odaiazol');
  const [basketWeight, setBasketWeight] = useState('7');
  const [therapeuticArea, setTherapeuticArea] = useState('Oncology');
  const [product, setProduct] = useState('Odaiazol');
  const [indication, setIndication] = useState('2L Therapy HER+');
  const [specialties, setSpecialties] = useState('');
  const [metrics, setMetrics] = useState([
    { name: 'XPO TRx Volume', weight: 100, visualize: true },
    { name: 'XPO NRx Volume', weight: 0, visualize: false },
    { name: 'XPO NBRx Volume', weight: 0, visualize: false }
  ]);

  if (!isOpen) return null;

  const handleSave = () => {
    const data = {
      basketName,
      basketWeight,
      therapeuticArea,
      product,
      indication,
      specialties,
      metrics
    };
    onSave(data);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1a1f2e',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #2a3441',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: 0
          }}>
            New Project: Odaiazol - Establish Product
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Portfolio Products Section */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center'
            }}>
              Portfolio Products
              <button style={{
                marginLeft: '8px',
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer'
              }}>
                ▲
              </button>
            </h3>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '8px'
                }}>
                  Basket Name
                </label>
                <input
                  type="text"
                  value={basketName}
                  onChange={(e) => setBasketName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: '#0f1419',
                    border: '1px solid #2a3441',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ width: '200px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '8px'
                }}>
                  Basket Scoring Weight (0-10)
                </label>
                <input
                  type="text"
                  value={basketWeight}
                  onChange={(e) => setBasketWeight(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: '#0f1419',
                    border: '1px solid #2a3441',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Basket Configurations Section */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '8px'
            }}>
              Basket Configurations
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#64748b',
              marginBottom: '16px'
            }}>
              Assign items to the configurations below to view available metrics
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Therapeutic Area */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '8px'
                }}>
                  Therapeutic Area
                </label>
                <select
                  value={therapeuticArea}
                  onChange={(e) => setTherapeuticArea(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#0f1419',
                    border: '1px solid #2a3441',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Oncology">Oncology</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                </select>
              </div>

              {/* Product */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '8px'
                }}>
                  Product
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#0f1419',
                    border: '1px solid #2a3441',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Odaiazol">Odaiazol</option>
                </select>
              </div>

              {/* Indications */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '8px'
                }}>
                  Indications
                </label>
                <select
                  value={indication}
                  onChange={(e) => setIndication(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#0f1419',
                    border: '1px solid #2a3441',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="2L Therapy HER+">2L Therapy HER+</option>
                  <option value="1L Therapy HER+">1L Therapy HER+</option>
                  <option value="3L Therapy HER+">3L Therapy HER+</option>
                </select>
              </div>

              {/* Specialties */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '8px'
                }}>
                  Specialties
                </label>
                <select
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#0f1419',
                    border: '1px solid #2a3441',
                    borderRadius: '6px',
                    color: '#94a3b8',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select Specialties (Optional)</option>
                  <option value="Medical Oncology">Medical Oncology</option>
                  <option value="Surgical Oncology">Surgical Oncology</option>
                </select>
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <MetricsTable metrics={metrics} setMetrics={setMetrics} />

          {/* Basket Sections */}
          <div style={{ marginTop: '32px' }}>
            <BasketSection title="Competitive Opportunities" />
            <BasketSection title="Precursor" />
            <BasketSection title="Analog" />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid #2a3441',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
              backgroundColor: 'transparent',
              border: '1px solid #2a3441',
              borderRadius: '6px',
              color: '#94a3b8',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 24px',
              backgroundColor: '#3b82f6',
              border: 'none',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Save objective
          </button>
        </div>
      </div>
    </div>
  );
};