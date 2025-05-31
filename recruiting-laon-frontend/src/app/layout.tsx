// src/app/layout.tsx
import Providers from "./providers";
import "./globals.css"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

export const metadata = { 
  title: 'Laon Recruiting App',
  description: 'Desafio de recrutamento Laon Labs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}