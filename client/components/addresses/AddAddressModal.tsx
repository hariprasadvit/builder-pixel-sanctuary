import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { MapPin, Home, Building2, Map, Crosshair } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

interface AddAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddAddressModal({ open, onOpenChange }: AddAddressModalProps) {
  const { addAddress, setCurrentAddress } = useLocation();

  const [type, setType] = useState<"home" | "office" | "other">("home");
  const [label, setLabel] = useState("Home");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loadingLocate, setLoadingLocate] = useState(false);

  useEffect(() => {
    if (!open) {
      // reset
      setType("home");
      setLabel("Home");
      setAddress("");
      setPincode("");
      setCity("");
      setState("");
      setLoadingLocate(false);
    }
  }, [open]);

  const canSave = useMemo(() => address.trim() !== "" && (city.trim() !== "" || pincode.trim() !== ""), [address, city, pincode]);

  async function detectMyLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setLoadingLocate(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        const data = await resp.json();
        const addr = data.address || {};
        setPincode(addr.postcode || "");
        setCity(addr.city || addr.town || addr.village || "");
        setState(addr.state || "");
        setAddress(data.display_name || `${addr.road || "Pinned"}, ${addr.suburb || addr.city || ""}`);
      } catch (e) {
        console.error(e);
        alert("Failed to resolve address");
      } finally {
        setLoadingLocate(false);
      }
    }, () => { setLoadingLocate(false); alert("Permission denied for location"); });
  }

  function save() {
    if (!canSave) return;
    const created = addAddress({ type, label, address, pincode, city, state, isDefault: false });
    setCurrentAddress(created);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Add new address</DialogTitle>
          <DialogDescription>Select how you want to add your address</DialogDescription>
        </DialogHeader>

        <div className="px-6">
          {/* Type chips */}
          <div className="flex gap-2 mb-4">
            <Button variant={type === "home" ? "default" : "outline"} className={type === "home" ? "bg-brand-blue hover:bg-brand-blue/90" : ""} size="sm" onClick={() => { setType("home"); setLabel("Home"); }}>
              <Home className="w-4 h-4 mr-2" /> Home
            </Button>
            <Button variant={type === "office" ? "default" : "outline"} className={type === "office" ? "bg-brand-blue hover:bg-brand-blue/90" : ""} size="sm" onClick={() => { setType("office"); setLabel("Office"); }}>
              <Building2 className="w-4 h-4 mr-2" /> Office
            </Button>
            <Button variant={type === "other" ? "default" : "outline"} className={type === "other" ? "bg-brand-blue hover:bg-brand-blue/90" : ""} size="sm" onClick={() => { setType("other"); setLabel("Other"); }}>
              <MapPin className="w-4 h-4 mr-2" /> Other
            </Button>
          </div>
        </div>

        <Tabs defaultValue="map" className="px-6">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="map">Choose on map</TabsTrigger>
            <TabsTrigger value="manual">Add manually</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border bg-muted">
              {/* Provided map image */}
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75750016a6ad406da4059886b10be4f1?format=webp&width=800"
                alt="Map"
                className="w-full h-56 object-cover"
              />
              {/* Centered pin visual */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="relative">
                  <MapPin className="w-8 h-8 text-brand-blue drop-shadow-md" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-7 w-2 h-2 bg-brand-blue rounded-full animate-ping" />
                </div>
              </div>
              <div className="absolute left-3 bottom-3 flex gap-2">
                <Button size="sm" onClick={detectMyLocation} disabled={loadingLocate} className="bg-brand-blue hover:bg-brand-blue/90">
                  <Crosshair className="w-4 h-4 mr-2" /> {loadingLocate ? "Locating..." : "Use my location"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label>Label</Label>
                <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Home / Office / Friend's place" />
              </div>
              <div>
                <Label>Address</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Detected or pinned location" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Pincode</Label>
                  <Input value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
                <div>
                  <Label>City</Label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                  <Label>State</Label>
                  <Input value={state} onChange={(e) => setState(e.target.value)} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label>Label</Label>
                <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Home / Office / Other" />
              </div>
              <div>
                <Label>Address</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat, Street, Area" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Pincode</Label>
                  <Input value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
                <div>
                  <Label>City</Label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                  <Label>State</Label>
                  <Input value={state} onChange={(e) => setState(e.target.value)} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-6 pt-4 flex items-center justify-between border-t mt-4">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Map className="w-4 h-4" /> Your address is used to show availability and delivery options
          </div>
          <Button onClick={save} disabled={!canSave} className="bg-brand-blue hover:bg-brand-blue/90">Save address</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
