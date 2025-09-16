import React, { useState } from 'react';
import { MainDashboard } from './screens/MainDashboard';
import { BrandAccessDialog } from './screens/BrandAccessDialog';
import { HCPTargetingScreen } from './screens/HCPTargetingScreen';
import { HCPTargetingDialog } from './screens/HCPTargetingDialog';

type Screen = 'dashboard' | 'brand-access' | 'hcp-targeting' | 'hcp-dialog';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [showDialog, setShowDialog] = useState(false);

  const handleNavigation = (screen: Screen) => {
    if (screen === 'brand-access' || screen === 'hcp-dialog') {
      setShowDialog(true);
      setCurrentScreen(screen);
    } else {
      setShowDialog(false);
      setCurrentScreen(screen);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setCurrentScreen('dashboard');
  };

  return (
    <>
      {currentScreen === 'dashboard' && (
        <MainDashboard onNavigate={handleNavigation} />
      )}
      
      {currentScreen === 'brand-access' && showDialog && (
        <BrandAccessDialog 
          open={showDialog} 
          onOpenChange={handleCloseDialog}
          onDone={() => handleNavigation('hcp-targeting')}
        />
      )}
      
      {currentScreen === 'hcp-targeting' && (
        <HCPTargetingScreen onNavigate={handleNavigation} />
      )}
      
      {currentScreen === 'hcp-dialog' && showDialog && (
        <HCPTargetingDialog
          open={showDialog}
          onOpenChange={handleCloseDialog}
          onDone={handleCloseDialog}
        />
      )}
    </>
  );
}

export default App;