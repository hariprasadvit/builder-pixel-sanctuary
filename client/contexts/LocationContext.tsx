import { createContext, useContext, useState, ReactNode } from "react";

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
            address: "10 Downing Street, Westminster",
            pincode: "SW1A 2AA",
            city: "London",
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
            address: "10 Downing Street, Westminster",
            pincode: "SW1A 2AA",
            city: "London",
            state: "England",
            isDefault: true,
          },
          {
            id: "office1",
            type: "office" as const,
            label: "Office",
            address: "1 Canada Square, Canary Wharf",
            pincode: "E14 5AB",
            city: "London",
            state: "England",
            isDefault: false,
          },
        ];
  });

  const setCurrentAddress = (address: Address) => {
    setCurrentAddressState(address);
    localStorage.setItem("currentAddress", JSON.stringify(address));
  };

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
