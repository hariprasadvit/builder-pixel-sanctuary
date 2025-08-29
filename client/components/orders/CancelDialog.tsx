import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

interface OrderItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CancelDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  orderId: string;
  status: string;
  items: OrderItem[];
  currency: string;
  onConfirm: (payload: { reason: string }) => void;
}

const REASONS = [
  "Ordered by mistake",
  "Found better price",
  "Delay",
  "Changed mind",
  "Other",
];

export default function CancelDialog({ open, onOpenChange, orderId, status, items, currency, onConfirm }: CancelDialogProps) {
  const [reason, setReason] = useState(REASONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items]);

  const isCancelable = status === "placed" || status === "processing" || status === "packed";
  const packedWarning = status === "packed";
  const shippedOrOut = status === "shipped" || status === "out-for-delivery";

  const handleConfirm = async () => {
    setSubmitting(true);
    onConfirm({ reason });
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
    }, 400);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Order {orderId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              {items.map((it) => (
                <div key={String(it.id)} className="flex items-center gap-3">
                  <img src={it.image || "/placeholder.svg"} alt={it.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">{it.name}</p>
                    <p className="text-xs text-gray-600">Qty: {it.quantity}</p>
                  </div>
                  <div className="text-sm font-semibold">{currency}{(it.price * it.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t">
                <span>Total</span>
                <span className="font-semibold">{currency}{total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {isCancelable ? (
            <div className="space-y-2">
              {packedWarning && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">We’ll try to stop dispatch.</p>
              )}
              <Label className="text-sm">Reason for cancellation</Label>
              <RadioGroup value={reason} onValueChange={setReason}>
                {REASONS.map((r) => (
                  <div key={r} className="flex items-center space-x-2">
                    <RadioGroupItem value={r} id={r} />
                    <Label htmlFor={r} className="text-sm">{r}</Label>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-xs text-gray-600 mt-2">Refunds: Prepaid → original method; COD → bank/UPI. Refund 3–7 business days.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {shippedOrOut && (
                <p className="text-sm text-gray-700">You can refuse delivery or return after delivery.</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handleConfirm} disabled={!isCancelable || submitting}>{submitting ? "..." : "Confirm"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
