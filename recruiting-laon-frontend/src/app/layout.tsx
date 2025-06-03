// src/app/layout.tsx
import Providers from "./providers";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; // <<< IMPORTE SEU FOOTER GLOBAL
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
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> 
        <Providers>
          <Header />
          <main style={{ flexGrow: 1 }}> 
            {children}
          </main>
          <Footer /> 
        </Providers>
      </body>
    </html>
  );
}