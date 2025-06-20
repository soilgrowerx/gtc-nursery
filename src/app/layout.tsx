import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Greentree Co. | Tree Inventory Platform",
  description: "Professional tree inventory and client request management platform for The Greentree Co.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main>{children}</main>
        <footer className="bg-primary text-primary-foreground py-6 mt-auto">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">Professional Tree Services</h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span>(555) 123-TREE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>info@greentreeco.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Your City, State</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
