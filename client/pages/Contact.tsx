import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill all required fields" });
      return;
    }
    setSubmitting(true);
    try {
      // In a real app, send to your API here
      await new Promise((r) => setTimeout(r, 600));
      toast({ title: "Message sent", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-6">We'd love to hear from you. Send us a message and our team will respond promptly.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 font-medium"><Mail className="w-4 h-4"/> Email</div>
          <div className="text-sm text-gray-600">support@riky.shop</div>
        </Card>
        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 font-medium"><Phone className="w-4 h-4"/> Phone</div>
          <div className="text-sm text-gray-600">+44 20 1234 5678</div>
        </Card>
        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 font-medium"><MapPin className="w-4 h-4"/> Address</div>
          <div className="text-sm text-gray-600">221B Baker Street, London</div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Subject</label>
            <Input name="subject" value={form.subject} onChange={onChange} placeholder="How can we help?" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea name="message" value={form.message} onChange={onChange} placeholder="Write your message" rows={6} required />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={submitting} className="bg-brand-blue hover:bg-brand-blue/90 text-white">
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
