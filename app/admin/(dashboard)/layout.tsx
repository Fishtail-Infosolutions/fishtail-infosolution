import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { verifyToken } from "@/lib/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
        redirect("/admin/login");
    }

    const user = await verifyToken(token);

    if (!user) {
        redirect("/admin/login");
    }

    // Casting user as any for now, ideally we should have a proper type
    const userData = user as { email: string; role: string };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F1A] flex transition-colors duration-300">
            <AdminSidebar user={userData} />

            <main className="flex-1 lg:ml-72 min-h-screen min-w-0 w-full overflow-hidden">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8 min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
