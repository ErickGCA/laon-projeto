// src/app/layout.tsx
import Providers from "./providers"; // Importe o componente Providers
import "./globals.css"; // Seus estilos globais

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers> {/* Envolva os children com Providers */}
      </body>
    </html>
  );
}