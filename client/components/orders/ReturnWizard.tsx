import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ReturnTimeline from "./ReturnTimeline";

interface OrderItem { id: string|number; name: string; price: number; quantity: number; image?: string; category?: string }

interface ReturnWizardProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  orderId: string;
  items: OrderItem[];
  orderDate: string;
  currency: string;
}

const CATEGORY_WINDOWS: Record<string, number> = { apparel: 10, electronics: 7, home: 15 };
const NON_RETURNABLE = new Set(["perishable", "hygiene", "digital"]);
const WINDOWS_TEXT = "Return window: apparel 10d, electronics 7d, home 15d";

export default function ReturnWizard({ open, onOpenChange, orderId, items, orderDate, currency }: ReturnWizardProps) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Record<string|number, number>>({});
  const [reason, setReason] = useState("Defective");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [method] = useState<'pickup'>('pickup');
  const [slotDay, setSlotDay] = useState<'today'|'tomorrow'|'select'>('today');
  const [slotDate, setSlotDate] = useState<string>("");
  const [slotWindow, setSlotWindow] = useState("10:00–12:00");
  const [refund] = useState<'original'>('original');
  const [submitted, setSubmitted] = useState(false);
  // removed hub code
  // removed qr state

  const progress = (step / 5) * 100;

  const eligibleItems = useMemo(() => items.map(it => {
    const cat = it.category || 'electronics';
    const days = CATEGORY_WINDOWS[cat] ?? 7;
    const returnBy = new Date(new Date(orderDate).getTime() + days*24*60*60*1000);
    const eligible = !NON_RETURNABLE.has(cat);
    return { ...it, cat, returnBy, eligible };
  }), [items, orderDate]);

  const totalSelected = useMemo(() => Object.entries(selected).reduce((s, [id, q]) => s + q, 0), [selected]);

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(f => URL.createObjectURL(f));
    setPhotos(prev => [...prev, ...urls].slice(0, 6));
  };

  const submit = () => {
    setSubmitted(true);
  };

  const slotLabel = slotDay === 'select' && slotDate ? new Date(slotDate).toDateString() : (slotDay === 'today' ? 'Today' : 'Tomorrow');

  // removed hub QR generation

  // removed qr payload

  // removed qr url

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Return / Exchange — {orderId}</DialogTitle>
            </DialogHeader>
            <Progress value={progress} />
            {step === 1 && (
              <div className="space-y-3 mt-3">
                <p className="text-xs text-gray-600">{WINDOWS_TEXT}</p>
                {eligibleItems.map(it => (
                  <Card key={String(it.id)} className="overflow-hidden">
                    <CardContent className="p-3 flex items-center gap-3">
                      <img src={it.image || '/placeholder.svg'} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{it.name}</p>
                        <p className="text-xs text-gray-600">Return by {it.returnBy.toLocaleDateString()}</p>
                        {!it.eligible && <p className="text-xs text-red-600">Non-returnable</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" disabled={!it.eligible || (selected[it.id]||0)===0} onClick={() => setSelected({ ...selected, [it.id]: Math.max(0,(selected[it.id]||0)-1) })}>-</Button>
                        <span className="min-w-[1.5rem] text-center text-sm">{selected[it.id]||0}</span>
                        <Button variant="outline" size="icon" disabled={!it.eligible || (selected[it.id]||0)===it.quantity} onClick={() => setSelected({ ...selected, [it.id]: Math.min(it.quantity,(selected[it.id]||0)+1) })}>+</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <p className="text-xs text-gray-500">Non-returnables: perishable, hygiene-sensitive, digital codes.</p>
                <Button className="w-full" disabled={totalSelected===0} onClick={() => setStep(2)}>Continue</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3 mt-3">
                <Label className="text-sm">Reason</Label>
                <select className="w-full border rounded h-10 px-3 text-sm" value={reason} onChange={e=>setReason(e.target.value)}>
                  {['Defective','Wrong item','Size/fit','Changed mind','Damaged','Other'].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <Label className="text-sm">Photos (optional)</Label>
                <Input type="file" accept="image/*" multiple onChange={handlePhotos} />
                {photos.length>0 && (
                  <div className="grid grid-cols-5 gap-2">
                    {photos.map((src,i)=>(<img key={i} src={src} className="w-full h-16 object-cover rounded" />))}
                  </div>
                )}
                <Label className="text-sm">Notes (optional)</Label>
                <Textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Add any details..." />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={()=>setStep(1)}>Back</Button>
                  <Button className="flex-1" onClick={()=>setStep(3)}>Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3 mt-3">
                <Label className="text-sm">Method</Label>
                <div className="flex gap-2">
                  <Button>Doorstep Pickup</Button>
                </div>
                <div className="space-y-2">
                    <p className="text-xs text-gray-600">Agent will verify with OTP; have item packed and accessories included. No printer? Agent brings label. Up to 2 pickup attempts before request auto-closes.</p>
                    <Label className="text-sm">Pickup Slot</Label>
                    <div className="flex gap-2">
                      {(['today','tomorrow','select'] as const).map(d=> (
                        <Button key={d} variant={slotDay===d?'default':'outline'} onClick={()=>setSlotDay(d)} className="flex-1 capitalize">{d}</Button>
                      ))}
                    </div>
                    {slotDay==='select' && (
                      <Input type="date" value={slotDate} onChange={e=>setSlotDate(e.target.value)} />
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      {['10:00–12:00','12:00–14:00','14:00–16:00','16:00–18:00'].map(w=> (
                        <Button key={w} variant={slotWindow===w?'default':'outline'} onClick={()=>setSlotWindow(w)}>{w}</Button>
                      ))}
                    </div>
                  </div>
                                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={()=>setStep(2)}>Back</Button>
                  <Button className="flex-1" onClick={()=>setStep(4)}>Continue</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3 mt-3">
                <Label className="text-sm">Refund</Label>
                <div className="flex gap-2">
                  <Button>Refund to original method</Button>
                </div>
                <p className="text-xs text-gray-600">Prepaid 3–7 business days; COD to bank/UPI 5–7 business days.</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={()=>setStep(3)}>Back</Button>
                  <Button className="flex-1" onClick={()=>setStep(5)}>Continue</Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-3 mt-3">
                <h4 className="font-semibold">Summary</h4>
                <div className="space-y-2">
                  {eligibleItems.filter(it=> (selected[it.id]||0)>0).map(it=> (
                    <div key={String(it.id)} className="flex justify-between text-sm">
                      <span>{it.name} × {selected[it.id]}</span>
                      <span>{currency}{(it.price * selected[it.id]).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600">Method: Doorstep Pickup — {slotLabel} {slotWindow}. OTP verification. Agent brings label if needed. Up to 2 pickup attempts.</p>
                <p className="text-xs text-gray-600">Refund: Original method</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={()=>setStep(4)}>Back</Button>
                  <Button className="flex-1" onClick={submit}>Submit Return</Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="text-5xl">✅</div>
              <h3 className="text-lg font-semibold">Return initiated</h3>
              <p className="text-sm text-gray-600">Pickup scheduled for {slotLabel} {slotWindow}. Track below.</p>
            </div>
            <div className="mt-4">
              <ReturnTimeline steps={[
                { label: 'Request Received', completed: true },
                { label: 'Pickup Scheduled', current: true },
                { label: 'Picked Up' },
                { label: 'In Transit' },
                { label: 'QC Check' },
                { label: 'Refund/Exchange Completed' },
              ]} />
              <p className="text-xs text-gray-600 mt-3">QC outcomes: If pass, refund/exchange proceeds; if failed, we’ll send back to you with tracking.</p>
            </div>
            <DialogFooter>
              <Button onClick={()=>onOpenChange(false)}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
