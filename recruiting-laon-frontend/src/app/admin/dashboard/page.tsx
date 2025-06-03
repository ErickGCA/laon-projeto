// src/app/admin/dashboard/page.tsx
import { auth } from "@/lib/auth"; // Ajuste o caminho se o seu alias @ for diferente ou se auth.ts não estiver em src/lib
import { redirect } from 'next/navigation';
import styles from "./dashboard.module.css"; // CSS Module para esta página de admin, se necessário
import AdminDashboardPageClient from './adminDashboardPageClient';

// Este Server Component não precisa das interfaces Titulo, ApiResponseTitulos,
// nem da função fetchTitulosFromLaravel ou TitulosRow,
// pois o AdminDashboardPageClient cuidará da busca e exibição dos dados.

export default async function AdminDashboardPageServer() {
  const session = await auth();

  // Verificação robusta:
  // 1. Usuário precisa estar logado (session e session.user existem)
  // 2. Usuário precisa ter a propriedade isAdmin na sessão
  // 3. session.user.isAdmin precisa ser true
  if (!session?.user || session.user.isAdmin !== true) {
    // Se não atender a qualquer uma das condições, redireciona para o login.
    // O middleware já deve ter feito um primeiro filtro, mas esta é uma segurança adicional.
    redirect('/login'); 
  }

  // Se chegou aqui, o usuário é um administrador autenticado.
  // Renderizamos o Client Component que conterá toda a lógica de UI e interações do dashboard de admin.
  return (
    <div className={styles.adminDashboardWrapper}> {/* Uma classe wrapper se precisar de estilização geral para a página */}
      <AdminDashboardPageClient />
    </div>
  );
}
