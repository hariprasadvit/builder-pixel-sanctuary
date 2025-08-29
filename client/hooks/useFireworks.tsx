import React, { useCallback, useRef, useState } from "react";
import SimpleFireworks from "@/components/SimpleFireworks";

export function useFireworks() {
  const [isActive, setIsActive] = useState(false);
  const lastTriggerTime = useRef(0);
  const cooldownPeriod = 4000; // 4 seconds cooldown

  const triggerFireworks = useCallback(() => {
    const now = Date.now();

    // Prevent rapid successive triggers
    if (now - lastTriggerTime.current < cooldownPeriod) {
      console.log("Fireworks on cooldown, skipping trigger");
      return;
    }

    // Don't trigger if already active
    if (isActive) {
      console.log("Fireworks already active, skipping trigger");
      return;
    }

    lastTriggerTime.current = now;
    setIsActive(true);
  }, [isActive]);

  const handleComplete = useCallback(() => {
    setIsActive(false);
  }, []);

  const FireworksComponent = () => {
    return <SimpleFireworks isActive={isActive} onComplete={handleComplete} />;
  };

  return {
    isActive,
    triggerFireworks,
    FireworksComponent,
  };
}
