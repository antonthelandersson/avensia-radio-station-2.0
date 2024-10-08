import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Avensia Radio Station 20.24",
  description: "Use API to call the music generation ai of suno.ai",
  keywords: ["suno", "suno api", "suno.ai", "api", "music", "generation", "ai"],
  creator: "@gcui.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-y-scroll`} style={{ width: '100vw'}} >
        <Header />
        <main style={{ height: 'calc(100vh - 75px)', display: 'flex', justifyContent: 'center'}} className="flex flex-col items-center m-auto w-full">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
