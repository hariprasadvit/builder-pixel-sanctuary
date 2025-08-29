import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchCatalog, splitHighlight } from "@/lib/search";
import { SAMPLE_CATALOG } from "@/lib/catalog";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RECENT_KEY = "recent:searches:v1";

function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  const add = (q: string) => {
    const v = q.trim();
    if (!v) return;
    setRecent((prev) => {
      const next = [v, ...prev.filter((x) => x !== v)].slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };
  const clear = () => {
    setRecent([]);
    localStorage.removeItem(RECENT_KEY);
  };
  return { recent, add, clear };
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export default function SearchOverlay({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const { recent, add, clear } = useRecentSearches();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery("");
  }, [open]);

  const results = useMemo(
    () => (query ? searchCatalog(query, 8) : null),
    [query],
  );

  const submit = (q?: string) => {
    const s = (q ?? query).trim();
    if (!s) return;
    add(s);
    onOpenChange(false);
    navigate(`/search?q=${encodeURIComponent(s)}`);
  };

  /* removed voice search */
  const startVoice = () => {
    const SR: any =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    if (!SR) {
      alert("Voice search not supported on this browser");
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.onresult = (e: any) => {
      const t = e.results?.[0]?.[0]?.transcript || "";
      setQuery(t);
      submit(t);
    };
    rec.start();
  };

  /* removed barcode scan */
  const openScanner = () => {
    // Simple fallback: navigate to results with placeholder query
    onOpenChange(false);
    navigate("/search?q=barcode");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-2xl w-[100vw] md:w-[90vw] h-[100vh] md:h-auto md:max-h-[80vh] overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b sticky top-0 bg-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              ref={inputRef}
              placeholder="Search products, categories, brands"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-11 rounded-full shadow-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
            {/* voice and scan removed */}
          </div>
          <Button onClick={() => submit()} className="rounded-full">
            Search
          </Button>
        </div>

        {/* Suggestions / Recents */}
        <div className="p-4 space-y-4">
          {!query && recent.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">Recent searches</h4>
                <Button variant="ghost" size="sm" onClick={clear}>
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.map((r) => (
                  <button
                    key={r}
                    className="px-3 py-1 rounded-full border text-sm"
                    onClick={() => submit(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <h4 className="text-sm font-semibold">Products</h4>
                {results!.products.length > 0 ? (
                  results!.products.map((p) => (
                    <button
                      key={p.id}
                      className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-50 text-left"
                      onClick={() => submit(p.title)}
                    >
                      <img
                        src={p.image}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm">
                          {(() => {
                            const parts = splitHighlight(p.title, query);
                            return (
                              <>
                                <span>{parts.before}</span>
                                <strong>{parts.match}</strong>
                                <span>{parts.after}</span>
                              </>
                            );
                          })()}
                        </div>
                        <div className="text-xs text-gray-600">
                          £{p.price.toFixed(2)} • {p.brand}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No product matches</p>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold">Categories</h4>
                  {results!.categories.length > 0 ? (
                    results!.categories.map((c) => (
                      <button
                        key={c.name}
                        className="block w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                        onClick={() => submit(c.name)}
                      >
                        {(() => {
                          const parts = splitHighlight(c.name, query);
                          return (
                            <>
                              <span>{parts.before}</span>
                              <strong>{parts.match}</strong>
                              <span>{parts.after}</span>
                            </>
                          );
                        })()}{" "}
                        <span className="text-xs text-gray-500">
                          ({c.count})
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">—</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Brands</h4>
                  {results!.brands.length > 0 ? (
                    results!.brands.map((b) => (
                      <button
                        key={b}
                        className="block w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                        onClick={() => submit(b)}
                      >
                        {(() => {
                          const parts = splitHighlight(b, query);
                          return (
                            <>
                              <span>{parts.before}</span>
                              <strong>{parts.match}</strong>
                              <span>{parts.after}</span>
                            </>
                          );
                        })()}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">—</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!query && recent.length === 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Popular</h4>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_CATALOG.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    className="px-3 py-1 rounded-full border text-sm"
                    onClick={() => submit(p.title)}
                  >
                    {p.title.split(" ").slice(0, 3).join(" ")}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
