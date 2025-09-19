import React, { useState, useEffect } from 'react';
import { SimulationCard } from './SimulationCard';
import { SimulationResults } from './SimulationResults';
import { useAppStore } from '../../store/appStore';

export interface Simulation {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed';
  progress: number;
  config: {
    establishedProduct: string;
    parameters: string[];
  };
  results?: {
    powerScoreData: Array<{
      segment: string;
      values: number[];
    }>;
    currentValue: string;
    potential: string;
    competitiveStrategy: string;
    patientMix: string;
  };
}

interface SimulationRunnerProps {
  simulations?: Simulation[];
}

export const SimulationRunner: React.FC<SimulationRunnerProps> = ({ simulations: initialSimulations }) => {
  const { productConfig } = useAppStore();
  
  // Default simulations based on the screenshots
  const defaultSimulations: Simulation[] = [
    {
      id: '1',
      name: 'Value Engine: HCP Targeting Option 1',
      status: 'running',
      progress: 0,
      config: {
        establishedProduct: productConfig.product || '70/30 Value Weighting',
        parameters: []
      }
    },
    {
      id: '2',
      name: 'Value Engine: HCP Targeting Option 2',
      status: 'running',
      progress: 0,
      config: {
        establishedProduct: productConfig.product || '70/30 Value Weighting',
        parameters: ['XPO TRx Weight to 0.2']
      }
    }
  ];

  const [simulations, setSimulations] = useState<Simulation[]>(initialSimulations || defaultSimulations);

  // Simulate progress for running simulations
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulations(prev => prev.map(sim => {
        if (sim.status === 'running' && sim.progress < 100) {
          const newProgress = Math.min(sim.progress + Math.random() * 15, 100);
          
          // Complete simulation when progress reaches 100
          if (newProgress >= 100) {
            return {
              ...sim,
              progress: 100,
              status: 'completed',
              results: generateMockResults(sim.id)
            };
          }
          
          return { ...sim, progress: newProgress };
        }
        return sim;
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const generateMockResults = (simId: string): Simulation['results'] => {
    const segments = ['A', 'B', 'C', 'D'];
    const powerScoreData = segments.map(segment => ({
      segment,
      values: Array.from({ length: 10 }, () => Math.random() * 40 + 10)
    }));

    return {
      powerScoreData,
      currentValue: '70%',
      potential: '30%',
      competitiveStrategy: simId === '1' ? '50%' : '80%',
      patientMix: '20%'
    };
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px'
    }}>
      {simulations.map(sim => (
        <div key={sim.id}>
          {sim.status === 'completed' && sim.results ? (
            <SimulationResults simulation={sim} />
          ) : (
            <SimulationCard simulation={sim} />
          )}
        </div>
      ))}
    </div>
  );
};