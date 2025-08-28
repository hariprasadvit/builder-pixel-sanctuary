import { createContext, useContext, useState, ReactNode } from 'react';

export type MarketplaceType = 'nearbuy' | 'uk' | 'china';

interface MarketplaceContextType {
  currentMarketplace: MarketplaceType;
  setMarketplace: (marketplace: MarketplaceType) => void;
  getMarketplaceLabel: (marketplace: MarketplaceType) => string;
  getDeliveryTime: (marketplace: MarketplaceType) => string;
  getCurrencySymbol: () => string;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [currentMarketplace, setCurrentMarketplace] = useState<MarketplaceType>('nearbuy');

  const setMarketplace = (marketplace: MarketplaceType) => {
    setCurrentMarketplace(marketplace);
    // Store in localStorage for persistence
    localStorage.setItem('selectedMarketplace', marketplace);
  };

  const getMarketplaceLabel = (marketplace: MarketplaceType): string => {
    const labels = {
      nearbuy: 'Nearbuy',
      uk: 'UK',
      china: 'China'
    };
    return labels[marketplace];
  };

  const getDeliveryTime = (marketplace: MarketplaceType): string => {
    const times = {
      nearbuy: 'Same day',
      uk: '1-2 days',
      china: '7-14 days'
    };
    return times[marketplace];
  };

  const getCurrencySymbol = () => '£'; // Always GBP as specified

  return (
    <MarketplaceContext.Provider value={{
      currentMarketplace,
      setMarketplace,
      getMarketplaceLabel,
      getDeliveryTime,
      getCurrencySymbol
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
