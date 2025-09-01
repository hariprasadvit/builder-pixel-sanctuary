import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Twitter, Music2 } from "lucide-react";

export default function FooterConnect() {
  const [email, setEmail] = useState("");
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl p-8 bg-white border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-extrabold mb-2 text-gray-900">Stay in the loop</h3>
              <p className="text-gray-600 mb-4">Get drops, creator picks, and sales. No spam.</p>
              <div className="flex gap-2 max-w-md">
                <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button className="bg-black text-white hover:bg-black/80">Subscribe</Button>
              </div>
            </div>
            <div className="flex md:justify-end gap-4 items-center">
              <a href="#" className="bg-gray-100 hover:bg-gray-200 rounded-full p-3"><Instagram /></a>
              <a href="#" className="bg-gray-100 hover:bg-gray-200 rounded-full p-3"><Music2 /></a>
              <a href="#" className="bg-gray-100 hover:bg-gray-200 rounded-full p-3"><Youtube /></a>
              <a href="#" className="bg-gray-100 hover:bg-gray-200 rounded-full p-3"><Twitter /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
