import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="relative">
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            {/* <div className="fixed right-0 bottom-0">kewal</div> */}
            {children}
        </SidebarProvider>
        </section>
    )
}