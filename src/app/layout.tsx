import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gorilla Game — Tech Investment Intelligence",
  description: "Track US tech companies through Geoffrey Moore's Gorilla Game framework. Identify gorillas, potential gorillas, and avoid the rest.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <TooltipProvider>
          <NavBar />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-zinc-800 py-6 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-600">
              Based on Geoffrey Moore&apos;s <em>Gorilla Game</em>, <em>Inside the Tornado</em>, and <em>Crossing the Chasm</em> · Mock data only · Not financial advice
            </div>
          </footer>
        </TooltipProvider>
      </body>
    </html>
  );
}
