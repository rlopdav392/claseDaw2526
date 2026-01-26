import type { Metadata } from "next";
import { Sidebar } from "@/app/_navigation/sidebar/components/sidebar1";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi App",
  description: "App con Sidebar deslizante",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
