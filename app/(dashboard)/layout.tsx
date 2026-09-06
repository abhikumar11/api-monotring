import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f8f9fc]">
            <Sidebar />
            <div className="ml-64">
                <Navbar />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
