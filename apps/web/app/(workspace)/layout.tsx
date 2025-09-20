import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import Header from "@/components/workspace/header"
import { Input } from "@/components/ui/input"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="relative">
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger className="cursor-pointer" />
                <div className="fixed z-10 right-0 top-0">
                    <Header />
                </div>
                {children}
            </SidebarProvider>
        </section>
    )
}