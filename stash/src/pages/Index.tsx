import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BookmarkViewer } from "@/components/BookmarkViewer";
import { Routes, Route } from "react-router-dom";
import { ExportPanel } from "@/components/ExportPanel";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full app-background">
        <AppSidebar />
        <main className="flex-1 bg-gradient-to-br from-background/50 to-background backdrop-blur-sm">
          <Routes>
            <Route path="/" element={<BookmarkViewer />} />
            <Route path="/export" element={<ExportPanel />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
