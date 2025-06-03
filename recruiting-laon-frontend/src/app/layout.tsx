
import Providers from "./providers";
import Header from "@/components/Header"; 
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
        <Providers> 
          <Header /> 
          <main>{children}</main> 
          
        </Providers>
      </body>
    </html>
  );
}