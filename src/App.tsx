import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { useAppStore } from './store/appStore';

// Screens
import { MainDashboard } from './screens/MainDashboard';
import { TeamScreen } from './screens/TeamScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { LiveAnalytics } from './screens/LiveAnalytics';

// Dialogs
import { BrandAccessDialog } from './dialogs/BrandAccessDialog';
import { HCPTargetingDialog } from './dialogs/HCPTargetingDialog';
import { NewProjectDialog } from './dialogs/NewProjectDialog';

function App() {
  const [activeTab, setActiveTab] = useState('brand');
  const { 
    activeSidebarItem, 
    setActiveSidebarItem, 
    activeModal, 
    setActiveModal,
    theme 
  } = useAppStore();

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const tabs = [
    { id: 'brand', label: 'Brand' },
    { id: 'setup', label: 'Setup' },
    { id: 'live', label: 'Live' }
  ];

  // Function to handle navigation from main dashboard
  const handleNavigate = (screen: string) => {
    setActiveModal(screen);
  };

  const renderContent = () => {
    // If sidebar item is selected, show that screen
    if (activeSidebarItem === 'team') {
      return <TeamScreen />;
    }
    if (activeSidebarItem === 'documents') {
      return <DocumentsScreen />;
    }
    if (activeSidebarItem === 'settings') {
      return <SettingsScreen />;
    }
    if (activeSidebarItem === 'profile') {
      return <ProfileScreen />;
    }

    // Otherwise show main dashboard with tabs
    if (activeTab === 'live') {
      return <LiveAnalytics />;
    }

    return (
      <div style={{ flex: 1, backgroundColor: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
        <Header tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <MainDashboard onNavigate={handleNavigate} activeTab={activeTab} />
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-main)' }}>
        <Sidebar 
          activeSection={activeSidebarItem} 
          onSectionChange={setActiveSidebarItem} 
        />
        
        {renderContent()}

        {/* Dialogs */}
        <BrandAccessDialog 
          isOpen={activeModal === 'brand-access'} 
          onClose={() => setActiveModal(null)} 
        />
        
        <HCPTargetingDialog 
          isOpen={activeModal === 'hcp-targeting'} 
          onClose={() => setActiveModal(null)} 
        />
        
        <NewProjectDialog 
          isOpen={activeModal === 'new-project'} 
          onClose={() => setActiveModal(null)} 
        />
      </div>
    </Router>
  );
}

export default App;