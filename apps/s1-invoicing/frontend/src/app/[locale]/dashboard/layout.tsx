import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import AuthGuard from '../../../components/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <Topbar />
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
