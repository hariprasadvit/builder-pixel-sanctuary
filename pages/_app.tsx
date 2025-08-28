import "@/client/global.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/client/components/ui/toaster";
import { Toaster as Sonner } from "@/client/components/ui/sonner";
import { TooltipProvider } from "@/client/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/client/components/Layout";
import { MarketplaceProvider } from "@/client/contexts/MarketplaceContext";
import { LocationProvider } from "@/client/contexts/LocationContext";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MarketplaceProvider>
          <LocationProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LocationProvider>
        </MarketplaceProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
