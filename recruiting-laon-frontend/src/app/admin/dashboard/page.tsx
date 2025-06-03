
import { auth } from "@/lib/auth"; 
import { redirect } from 'next/navigation';
import styles from "./dashboard.module.css"; 
import AdminDashboardPageClient from './adminDashboardPageClient';





export default async function AdminDashboardPageServer() {
  const session = await auth();

  
  
  
  
  if (!session?.user || session.user.isAdmin !== true) {
    
    
    redirect('/login'); 
  }

  
  
  return (
    <div className={styles.adminDashboardWrapper}> 
      <AdminDashboardPageClient />
    </div>
  );
}
