import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Rocket, Shield, TrendingUp, Store, Package, CreditCard, Globe2 } from "lucide-react";

export default function Sell() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">Become a seller on Riky</h1>
            <p className="text-gray-600 mb-6">Start, manage and grow your business with powerful tools, nationwide delivery, and secure payments. Join thousands of sellers building their brand with Riky.</p>
            <div className="flex gap-3">
              <Button className="h-11 px-6 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/20">Register for free</Button>
              <Button variant="outline" className="h-11 px-6 rounded-full">Talk to sales</Button>
            </div>
            <div className="mt-4 text-xs text-gray-500">No long-term contracts • Low fees • UK‑based support</div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">VAT‑ready invoices</span>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">GBP payouts</span>
              <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">UK shipping partners</span>
            </div>
          </div>
          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -top-8 -left-6 w-40 h-40 rounded-full bg-blue-200/60 blur-2xl" />
            <div className="absolute -bottom-10 -right-6 w-48 h-48 rounded-full bg-purple-200/60 blur-2xl" />
            <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-xl">
              <img src="https://images.pexels.com/photos/3906984/pexels-photo-3906984.jpeg" alt="British small business owner in a café" className="w-full h-full object-cover" />
            </div>
            <Card className="absolute left-4 top-4 shadow-lg">
              <CardContent className="p-3 text-xs">
                <div className="font-semibold">GBP payouts</div>
                <div className="text-gray-600">Next‑day to UK banks</div>
              </CardContent>
            </Card>
            <Card className="absolute right-4 bottom-4 shadow-lg">
              <CardContent className="p-3 text-xs">
                <div className="font-semibold">Low shipping rates</div>
                <div className="text-gray-600">Royal Mail • DPD • Evri</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why sell */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold mb-6">Why sell on Riky?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[{
            icon: <TrendingUp className="w-6 h-6"/>, title: "High-intent audience", desc: "Tap into buyers actively searching for products like yours."
          },{
            icon: <Rocket className="w-6 h-6"/>, title: "Tools to scale", desc: "Ads, coupons, analytics, and integrations to grow faster."
          },{
            icon: <Shield className="w-6 h-6"/>, title: "Seller protection", desc: "Transparent policies and support that has your back."
          }].map((f, i) => (
            <Card key={i} className="bg-white/80">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="text-brand-blue">{f.icon}</div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-600">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <h2 className="text-2xl font-bold mb-6">How it works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {["Create account","List products","Ship orders","Get paid"].map((s, i) => (
              <Card key={s}>
                <CardContent className="p-5">
                  <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold mb-3">{i+1}</div>
                  <div className="font-semibold mb-1">{s}</div>
                  <div className="text-sm text-gray-600">{i===0?"Register your business and verify UK company/VAT details.":i===1?"Use our tools or CSV to publish products.":i===2?"Use Royal Mail, DPD, Evri or your own courier.":"Fast payouts to your UK bank via Faster Payments."}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* UK Benefits */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold mb-6">Built for UK sellers</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5">
              <div className="font-semibold mb-1">GBP payouts</div>
              <div className="text-sm text-gray-600">Next‑business‑day transfers to UK bank accounts via Faster Payments.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="font-semibold mb-1">VAT‑ready invoices</div>
              <div className="text-sm text-gray-600">Automatically add VAT and export records for HMRC.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="font-semibold mb-1">UK shipping partners</div>
              <div className="text-sm text-gray-600">Royal Mail, DPD, Evri and more with negotiated rates.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold mb-6">Simple pricing</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[{name:"Starter", price:"0% + £0.20/order", features:["No monthly fees","Up to 50 orders/month","Basic analytics"]}, {name:"Growth", price:"5% + £0.10/order", features:["Priority placements","Coupons & ads","Chat support"]}, {name:"Pro", price:"8% flat", features:["Lower shipping rates","Advanced analytics","Dedicated manager"]}].map((plan)=> (
            <Card key={plan.name} className="relative">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="text-brand-blue font-extrabold text-xl">{plan.price}</div>
              </CardHeader>
              <CardContent className="space-y-2">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600"/>{f}</div>
                ))}
                <Button className="mt-4 w-full bg-brand-blue hover:bg-brand-blue/90">Choose {plan.name}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="container relative mx-auto px-4 py-10 md:py-14 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to start?</h3>
          <p className="text-gray-600 mb-5">Launch your store today. It only takes a few minutes.</p>
          <div className="flex items-center justify-center gap-3">
            <Button className="h-11 px-8 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/20">Register now</Button>
            <Button variant="outline" className="h-11 px-8 rounded-full">Schedule a demo</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
