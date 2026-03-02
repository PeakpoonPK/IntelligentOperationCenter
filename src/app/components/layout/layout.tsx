import { Outlet } from 'react-router';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { FilterProvider } from '../../context/filter-context';
import { AuthProvider } from '../../context/auth-context';
import { SidebarProvider } from '../../context/sidebar-context';

export function Layout() {
  return (
    <AuthProvider>
      <FilterProvider>
        <SidebarProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
            <Sidebar />
            <Header />
            
            {/* Main Content - Adjust padding-top for mobile (2 rows header) and desktop (1 row header) */}
            <main className="lg:ml-[240px] pt-[110px] lg:pt-[60px] min-h-screen">
              <div className="p-3 sm:p-4 md:p-5">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarProvider>
      </FilterProvider>
    </AuthProvider>
  );
}