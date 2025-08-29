import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Paperclip,
  Send,
  ThumbsDown,
  ThumbsUp,
  User,
  Bot,
  Image as ImageIcon,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot" | "agent";
  text: string;
  ts: number;
  attachments?: string[];
  actions?: { label: string; intent: string }[];
}

export default function SupportChat() {
  const location = useLocation();
  const ctx = (location.state as any) || {};
  const orderId = ctx.orderId || null;
  const initialIntent = ctx.intent || null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const storageKey = useMemo(
    () => `riki-chat-${orderId ?? "general"}`,
    [orderId],
  );

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setMessages(JSON.parse(saved));
    else greet();
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, storageKey]);

  function greet() {
    const actions = [
      { label: "Cancel Order", intent: "cancel" },
      { label: "Start Return", intent: "return" },
      { label: "Track Refund", intent: "refund" },
      { label: "Payment Issue", intent: "payment" },
    ];
    const text = orderId
      ? `Hi, I’m Riki Assistant. How can I help with order ${orderId} today?`
      : `Hi, I’m Riki Assistant. How can I help today?`;
    botReply(text, actions);
    if (initialIntent) handleIntent(initialIntent);
  }

  function botReply(text: string, actions?: Message["actions"]) {
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "bot", text, ts: Date.now(), actions },
    ]);
  }

  function agentReply(text: string) {
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "agent", text, ts: Date.now() },
    ]);
  }

  function userSend(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", text, ts: Date.now() },
    ]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      routeMessage(text);
    }, 800);
  }

  function routeMessage(text: string) {
    const t = text.toLowerCase();
    if (t.includes("human") || t.includes("agent")) {
      setEscalated(true);
      agentReply(
        "You are now connected with a human agent. How may I assist you?",
      );
      return;
    }
    if (t.includes("cancel")) return handleIntent("cancel");
    if (t.includes("return")) return handleIntent("return");
    if (t.includes("refund")) return handleIntent("refund");
    if (t.includes("payment")) return handleIntent("payment");
    setFailCount((c) => {
      const n = c + 1;
      if (n >= 2) {
        setEscalated(true);
        agentReply("Escalating you to a human agent...");
        setTimeout(
          () =>
            agentReply("Hi, agent here. I see your context. How can I help?"),
          900,
        );
      } else {
        botReply(
          "Sorry, I didn’t get that. You can choose an option below or type your issue.",
          [
            { label: "Cancel Order", intent: "cancel" },
            { label: "Start Return", intent: "return" },
            { label: "Track Refund", intent: "refund" },
          ],
        );
      }
      return n;
    });
  }

  function handleIntent(intent: string) {
    if (intent === "cancel")
      botReply(
        "Cancel options: If order is Placed/Processing/Packed, you can cancel now. Shipped/Out for Delivery cannot be cancelled. Want me to try cancelling?",
      );
    else if (intent === "return")
      botReply(
        "Return help: You can initiate return from Orders → Actions → Return / Exchange. Need me to open it for you?",
      );
    else if (intent === "refund")
      botReply(
        "Refund tracking: Prepaid 3–7 business days, Wallet instant–24h, COD 5–7 business days. Want to check a specific order?",
      );
    else if (intent === "payment")
      botReply(
        "Payment issues: Card charged but order failed, duplicate charge, UPI pending. Please share a screenshot and we’ll review.",
      );
  }

  function onAction(a: { label: string; intent: string }) {
    handleIntent(a.intent);
  }

  function uploadFiles(files: File[]) {
    if (!files.length) return;
    const urls = files.map((f) => URL.createObjectURL(f));
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        role: "user",
        text: "(attachments)",
        ts: Date.now(),
        attachments: urls,
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-lg py-4">
        <h1 className="text-xl font-semibold mb-3">Live Chat</h1>
        <Card>
          <CardContent className="p-0">
            <div
              ref={chatRef}
              className="h-[60vh] overflow-y-auto p-3 space-y-3"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-white border rounded-bl-sm"}`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    {msg.attachments && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {msg.attachments.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            className="w-full h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                    {msg.actions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.actions.map((a) => (
                          <Button
                            key={a.label}
                            size="sm"
                            variant="secondary"
                            onClick={() => onAction(a)}
                          >
                            {a.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    <div className="mt-1 text-[10px] opacity-60">
                      {new Date(msg.ts).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-2xl px-3 py-2 text-sm shadow">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      Riki Assistant is typing…
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 border-t space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileRef.current?.click()}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    uploadFiles(Array.from(e.target.files || []))
                  }
                />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      userSend(input);
                    }
                  }}
                />
                <Button
                  onClick={() => userSend(input)}
                  className="bg-blue-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEscalated(true);
                    agentReply("Connecting you to a human agent…");
                    setTimeout(
                      () => agentReply("Hi, agent here. I can help."),
                      900,
                    );
                  }}
                >
                  Talk to a Human
                </Button>
                <div className="flex items-center gap-2">
                  <span>Was this helpful?</span>
                  <Button variant="outline" size="icon">
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
