import { AppSidebar } from "@/components/app-sidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <AppSidebar />

      <main className="w-full">
        <AdminNavbar />
        <div
        className="overflow-y-auto overflow-x-auto h-[90%] "
        >{children}</div>
      </main>
    </div>
  );
}
