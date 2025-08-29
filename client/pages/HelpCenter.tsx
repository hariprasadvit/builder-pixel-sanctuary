import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, RotateCcw, CreditCard, UserCircle, FileText, MessageCircle } from "lucide-react";

interface FAQ { q: string; a: string; cat: string }

export default function HelpCenter(){
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState<Record<number, boolean|null>>({});

  const faqs: FAQ[] = [
    { cat:'Orders & Delivery', q:'How do I cancel my order?', a:'Go to Orders → select order → Actions → Cancel. If already shipped, you can refuse delivery or return after delivery.' },
    { cat:'Returns & Refunds', q:'How to start a return?', a:'From Orders → Actions → Return / Exchange. Choose items, reason, pickup slot or Hub drop. Refund to Original or Riki Wallet.' },
    { cat:'Payments', q:'Refund timelines', a:'Prepaid 3–7 business days; Wallet instant–24h; COD to bank/UPI 5–7 business days.' },
    { cat:'Account', q:'Change my address', a:'Go to Profile → Addresses to add or edit saved addresses.' },
    { cat:'Policies', q:'Non-returnable items', a:'Perishables, hygiene-sensitive products, and digital codes are not eligible for return.' },
  ];

  const filtered = useMemo(()=> faqs.filter(f => (f.q+f.a+f.cat).toLowerCase().includes(query.toLowerCase())), [faqs, query]);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-lg space-y-4">
        <h1 className="text-2xl font-bold">Help Center</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search help articles..." className="pl-10" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['Orders & Delivery','Returns & Refunds','Payments','Account','Policies'].map(cat => (
            <Card key={cat}><CardContent className="p-3 text-sm">{cat}</CardContent></Card>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((f, idx) => (
            <div key={idx} className="flex justify-start">
              <div className="bg-white border rounded-2xl px-3 py-2 text-sm shadow max-w-[90%]">
                <p className="font-medium">{f.q}</p>
                <details className="mt-1">
                  <summary className="text-xs text-gray-600 cursor-pointer">View answer</summary>
                  <p className="text-sm mt-1">{f.a}</p>
                </details>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                  <span>Was this helpful?</span>
                  <Button size="sm" variant="outline" onClick={()=>setFeedback({...feedback, [idx]: true})}>Yes</Button>
                  <Button size="sm" variant="outline" onClick={()=>setFeedback({...feedback, [idx]: false})}>No</Button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length===0 && (
            <div className="text-center text-sm text-gray-600">
              No results. Would you like to connect with support?
              <div className="mt-2"><Button onClick={()=>navigate('/support/chat')}>Open Live Chat</Button></div>
            </div>
          )}
        </div>

        <Button className="fixed bottom-20 right-4 shadow-lg" onClick={()=>navigate('/support/chat')}>
          <MessageCircle className="w-4 h-4 mr-2" /> Contact Support
        </Button>
      </div>
    </div>
  );
}
