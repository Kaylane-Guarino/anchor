import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/lib/react-query";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Anchor - Encontre as melhores ofertas de hotéis",
  description: "Seu site de busca de hotéis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
