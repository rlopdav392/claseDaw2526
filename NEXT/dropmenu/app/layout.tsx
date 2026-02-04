import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Aplicación de tickets",
  description: "pues eso movidas de tickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <main className="min-h-screen overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">
          {children}
        </main>
        <Toaster expand />
      </body>
    </html>
  );
}
