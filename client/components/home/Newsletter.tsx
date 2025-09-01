import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="py-10 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border bg-white shadow p-6 md:p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Subscribe to our newsletter</h3>
          <p className="text-gray-600 mb-4">Get fresh drops, flash sales, and curated picks in your inbox.</p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            <Button className="whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
