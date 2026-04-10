import Providers from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <main className="min-h-screen py-8 px-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
