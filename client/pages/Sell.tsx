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
              <Button className="bg-brand-blue hover:bg-brand-blue/90 h-11 px-6">Start selling</Button>
              <Button variant="outline" className="h-11 px-6">Talk to sales</Button>
            </div>
            <div className="mt-4 text-xs text-gray-500">No long-term contracts • Low fees • Support in English/Hindi</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card className="shadow-sm"><CardContent className="p-4 flex items-center gap-3"><Store className="w-6 h-6 text-brand-blue"/><div><div className="font-semibold">Create your store</div><div className="text-xs text-gray-600">Set up in minutes</div></div></CardContent></Card>
            <Card className="shadow-sm"><CardContent className="p-4 flex items-center gap-3"><Package className="w-6 h-6 text-brand-blue"/><div><div className="font-semibold">Ship with Riky</div><div className="text-xs text-gray-600">Doorstep pickup</div></div></CardContent></Card>
            <Card className="shadow-sm"><CardContent className="p-4 flex items-center gap-3"><CreditCard className="w-6 h-6 text-brand-blue"/><div><div className="font-semibold">Secure payments</div><div className="text-xs text-gray-600">Fast settlements</div></div></CardContent></Card>
            <Card className="shadow-sm"><CardContent className="p-4 flex items-center gap-3"><Globe2 className="w-6 h-6 text-brand-blue"/><div><div className="font-semibold">Reach new customers</div><div className="text-xs text-gray-600">Nationwide discovery</div></div></CardContent></Card>
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
                  <div className="text-sm text-gray-600">{i===0?"Register your business and verify GST/PAN.":i===1?"Use our tools or CSV to publish products.":i===2?"Use Riky Logistics or your own courier.":"Weekly settlements to your bank account."}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold mb-6">Simple pricing</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[{name:"Starter", price:"0% + ₹10/order", features:["No monthly fees","Up to 50 orders/month","Basic analytics"]}, {name:"Growth", price:"5% + ₹5/order", features:["Priority placements","Coupons & ads","Chat support"]}, {name:"Pro", price:"8% flat", features:["Lower shipping rates","Advanced analytics","Dedicated manager"]}].map((plan)=> (
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
      <section className="bg-gradient-to-r from-brand-blue/10 to-purple-500/10">
        <div className="container mx-auto px-4 py-10 md:py-14 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to start?</h3>
          <p className="text-gray-600 mb-4">Launch your store today. It only takes a few minutes.</p>
          <Button className="bg-brand-blue hover:bg-brand-blue/90 h-11 px-8">Start selling</Button>
        </div>
      </section>
    </div>
  );
}
