import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";
import Logo from "./logo";
import MyWorkspace from "./my-workspace";
import Menu from "./menu";
import { Separator } from "@/components/ui/separator"
import SharedWorkspace from "./shared-workspace";
import Upgrade from "./upgrade";
import Seperation from "./seperate-line";
import Console from "./console";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center items-center">
                <Logo/>
                <MyWorkspace/>
            </SidebarHeader>
            <SidebarContent >
                <Menu/>
                <Seperation/>

                <SharedWorkspace/>
                <Seperation/>
                
                <Upgrade/>
                <Seperation/>

                {/* <SidebarGroup />
                <SidebarGroup /> */}
            </SidebarContent>
                <Console/>
            <SidebarFooter />
        </Sidebar>
    )
}