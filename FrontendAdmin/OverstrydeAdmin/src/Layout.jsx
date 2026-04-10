import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        <AppSidebar />

        <main className="flex-1 p-4 overflow-auto">
          <SidebarTrigger />
          <Outlet />
        </main>

      </div>
    </SidebarProvider>
  );
}