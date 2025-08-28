import { useState, useCallback } from 'react';
import SimpleFireworks from '@/components/SimpleFireworks';

export function useFireworks() {
  const [isActive, setIsActive] = useState(false);

  const triggerFireworks = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsActive(false);
  }, []);

  const FireworksComponent = () => {
    return (
      <SimpleFireworks 
        isActive={isActive} 
        onComplete={handleComplete}
      />
    );
  };

  return {
    isActive,
    triggerFireworks,
    FireworksComponent
  };
}
