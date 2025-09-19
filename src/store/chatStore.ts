import { create } from 'zustand';
import { useAppStore } from './appStore';

export interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export interface PrePrompt {
  id: string;
  text: string;
  action: () => void;
  visible: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  prePrompts: PrePrompt[];
  currentStep: number;
  isTyping: boolean;
  
  // Actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setPrePrompts: (prompts: PrePrompt[]) => void;
  setCurrentStep: (step: number) => void;
  setIsTyping: (typing: boolean) => void;
  clearChat: () => void;
  
  // Demo flow actions
  executeDemoStep: (step: number) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  prePrompts: [],
  currentStep: 0,
  isTyping: false,
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    }]
  })),
  
  setPrePrompts: (prompts) => set({ prePrompts: prompts }),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setIsTyping: (typing) => set({ isTyping: typing }),
  
  clearChat: () => set({ messages: [], prePrompts: [], currentStep: 0 }),
  
  executeDemoStep: (step) => {
    const { addMessage, setPrePrompts, setIsTyping, setCurrentStep } = get();
    const appStore = useAppStore.getState();
    
    // Simulate typing delay
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      switch(step) {
        case 0:
          // Initial state - show multiple prompt options
          setPrePrompts([
            {
              id: '1',
              text: 'List missing or disapproved configurations',
              action: () => get().executeDemoStep(1),
              visible: true
            },
            {
              id: '1b',
              text: 'Show incomplete brand settings',
              action: () => get().executeDemoStep(1),
              visible: true
            },
            {
              id: '1c',
              text: 'Review configuration status',
              action: () => get().executeDemoStep(1),
              visible: true
            }
          ]);
          break;
          
        case 1:
          // Step 1: List missing configs
          addMessage({ type: 'user', content: 'List missing or disapproved configurations' });
          
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: `I've identified the following items that need attention:

**Missing Information:**
• Brand Access Strategy - Web Portal configuration needed
• Brand Access Strategy - Market Access details required

**Pending Approval:**
• Medical Objectives configuration
• Sales Goals targets
• Competitive Landscape analysis

Would you like me to help configure any of these items?`
            });
            
            // Show next prompt options
            setPrePrompts([
              {
                id: '2',
                text: 'Change trx_indication weight to 0.5',
                action: () => get().executeDemoStep(2),
                visible: true
              },
              {
                id: '2b',
                text: 'Adjust metric weights',
                action: () => get().executeDemoStep(2),
                visible: true
              },
              {
                id: '2c',
                text: 'Update PowerScore configuration',
                action: () => get().executeDemoStep(2),
                visible: true
              }
            ]);
          }, 1000);
          break;
          
        case 2:
          // Step 2: Change metric weight
          addMessage({ type: 'user', content: 'Change trx_indication weight to 0.5' });
          
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: 'Done. The weight for trx_indication has been updated to 0.5.'
            });
            
            // Actually update the metric in the store
            const currentMetrics = appStore.productConfig.metrics;
            const updatedMetrics = currentMetrics.map(m => 
              m.name === 'XPO TRx Volume' ? { ...m, weight: 50 } : m
            );
            appStore.updateProductConfig({ metrics: updatedMetrics });
            
            // Show next prompt options
            setPrePrompts([
              {
                id: '3',
                text: 'Add xpo_dollars metric with no weight',
                action: () => get().executeDemoStep(3),
                visible: true
              },
              {
                id: '3b',
                text: 'Include new metric in basket',
                action: () => get().executeDemoStep(3),
                visible: true
              }
            ]);
          }, 1000);
          break;
          
        case 3:
          // Step 3: Add metric with warning
          addMessage({ type: 'user', content: 'Add xpo_dollars metric with no weight' });
          
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: `I've added xpo_dollars to the target basket. However, this metric looks important. Are you sure you don't want to assign it a weight for the PowerScore?`
            });
            
            // Add the metric to the store
            const currentMetrics = appStore.productConfig.metrics;
            appStore.updateProductConfig({
              metrics: [...currentMetrics, { name: 'xpo_dollars', weight: 0, visualize: false }]
            });
            
            // Show next prompt options
            setPrePrompts([
              {
                id: '4',
                text: 'Assign weight of 0.2',
                action: () => get().executeDemoStep(4),
                visible: true
              },
              {
                id: '4b',
                text: 'Update metric weight',
                action: () => get().executeDemoStep(4),
                visible: true
              }
            ]);
          }, 1000);
          break;
          
        case 4:
          // Step 4: Update weight based on suggestion
          addMessage({ type: 'user', content: 'Assign weight of 0.2' });
          
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: 'Updated. xpo_dollars now has a weight of 0.2.'
            });
            
            // Update the metric weight
            const currentMetrics = appStore.productConfig.metrics;
            const updatedMetrics = currentMetrics.map(m => 
              m.name === 'xpo_dollars' ? { ...m, weight: 20 } : m
            );
            appStore.updateProductConfig({ metrics: updatedMetrics });
            
            // Show simulation prompt
            setPrePrompts([{
              id: '5',
              text: 'Run a Simulation',
              action: () => get().executeDemoStep(5),
              visible: true
            }]);
          }, 1000);
          break;
          
        case 5:
          // Step 5: Initiate simulation
          addMessage({ type: 'user', content: 'Run a Simulation' });
          
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: 'Great. What scenarios would you like to run?'
            });
            
            // Show scenario definition prompt options
            setPrePrompts([
              {
                id: '6',
                text: 'Run simulation with current and modified configs',
                action: () => get().executeDemoStep(6),
                visible: true
              },
              {
                id: '6b',
                text: 'Compare multiple scenarios',
                action: () => get().executeDemoStep(6),
                visible: true
              }
            ]);
          }, 1000);
          break;
          
        case 6:
          // Step 6: Define scenarios
          addMessage({ 
            type: 'user', 
            content: 'Run simulation with current config and xpo_dollars at 0.4, trx_indication at 0.3' 
          });
          
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: 'Setting up simulations. This may take a moment...'
            });
            
            // Navigate to Report tab
            setTimeout(() => {
              // This would trigger navigation to Report tab
              window.location.hash = '#report';
              
              addMessage({
                type: 'agent',
                content: 'Simulations are now running. You can view the progress in the Report tab.'
              });
              
              // Show result selection prompt after delay
              setTimeout(() => {
                setPrePrompts([
                  {
                    id: '7',
                    text: 'Select simulated configuration',
                    action: () => get().executeDemoStep(7),
                    visible: true
                  },
                  {
                    id: '7b',
                    text: 'Apply winning parameters',
                    action: () => get().executeDemoStep(7),
                    visible: true
                  }
                ]);
              }, 5000);
            }, 2000);
          }, 1000);
          break;
          
        case 7:
          // Step 7: Select winning scenario
          addMessage({ 
            type: 'user', 
            content: 'Select simulated configuration as winning option' 
          });
          
          setTimeout(() => {
            addMessage({
              type: 'agent',
              content: `Excellent choice. I've updated the master configuration with the winning parameters. The final template is now ready.`
            });
            
            // Update configuration with winning parameters
            const currentMetrics = appStore.productConfig.metrics;
            const updatedMetrics = currentMetrics.map(m => {
              if (m.name === 'xpo_dollars') return { ...m, weight: 40 };
              if (m.name === 'XPO TRx Volume') return { ...m, weight: 30 };
              return m;
            });
            appStore.updateProductConfig({ metrics: updatedMetrics });
            
            setCurrentStep(7);
          }, 1000);
          break;
      }
    }, 500);
  }
}));