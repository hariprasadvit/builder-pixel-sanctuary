import { createContext, useContext, useState, ReactNode } from "react";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Address {
  id: string;
  type: "home" | "office" | "other";
  label: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  isDefault: boolean;
}

interface LocationContextType {
  currentAddress: Address | null;
  savedAddresses: Address[];
  setCurrentAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, "id">) => Address;
  removeAddress: (id: string) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  getCurrentLocationName: () => string;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [currentAddress, setCurrentAddressState] = useState<Address | null>(
    () => {
      const saved = localStorage.getItem("currentAddress");
      return saved
        ? JSON.parse(saved)
        : {
            id: "default",
            type: "home" as const,
            label: "Home",
            address: "12 High Street, East Ham",
            pincode: "E6 1AA",
            city: "East Ham",
            state: "England",
            isDefault: true,
          };
    },
  );

  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem("savedAddresses");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "home1",
            type: "home" as const,
            label: "Home",
            address: "12 High Street, East Ham",
            pincode: "E6 1AA",
            city: "East Ham",
            state: "England",
            isDefault: true,
          },
          {
            id: "office1",
            type: "office" as const,
            label: "Office",
            address: "Town Hall, Barking Road",
            pincode: "E6 2RP",
            city: "East Ham",
            state: "England",
            isDefault: false,
          },
        ];
  });

  const setCurrentAddress = (address: Address) => {
    setCurrentAddressState(address);
    localStorage.setItem("currentAddress", JSON.stringify(address));
  };

  useEffect(() => {
    if (currentAddress && (currentAddress.city === "Mumbai" || currentAddress.pincode.startsWith("400"))) {
      const eastHam: Address = {
        id: currentAddress.id || "default",
        type: currentAddress.type,
        label: currentAddress.label,
        address: "12 High Street, East Ham",
        pincode: "E6 1AA",
        city: "East Ham",
        state: "England",
        isDefault: true,
      };
      setCurrentAddress(eastHam);
    }
  }, []);

  const addAddress = (newAddress: Omit<Address, "id">): Address => {
    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
    };
    const updated = [...savedAddresses, address];
    setSavedAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    return address;
  };

  const removeAddress = (id: string) => {
    const updated = savedAddresses.filter((addr) => addr.id !== id);
    setSavedAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
  };

  const updateAddress = (id: string, updatedFields: Partial<Address>) => {
    const updated = savedAddresses.map((addr) =>
      addr.id === id ? { ...addr, ...updatedFields } : addr,
    );
    setSavedAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
  };

  const getCurrentLocationName = () => {
    if (!currentAddress) return "Select location";
    return `${currentAddress.pincode} ${currentAddress.city}`;
  };

  return (
    <LocationContext.Provider
      value={{
        currentAddress,
        savedAddresses,
        setCurrentAddress,
        addAddress,
        removeAddress,
        updateAddress,
        getCurrentLocationName,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
