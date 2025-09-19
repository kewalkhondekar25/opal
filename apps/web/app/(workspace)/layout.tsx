import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import Header from "@/components/workspace/header"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="relative">
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <div className="fixed z-10 right-0 top-0">
                    <Header />
                </div>
                {children}
            </SidebarProvider>
        </section>
    )
}