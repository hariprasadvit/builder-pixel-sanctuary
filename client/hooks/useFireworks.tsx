import { useState, useCallback } from 'react';

export function useFireworks() {
  const [isActive, setIsActive] = useState(false);

  const triggerFireworks = useCallback(() => {
    setIsActive(true);
    
    // Auto-hide after animation completes
    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  }, []);

  const FireworksComponent = () => {
    if (!isActive) return null;

    return (
      <div className="firework-overlay active">
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </div>
    );
  };

  return {
    isActive,
    triggerFireworks,
    FireworksComponent
  };
}
