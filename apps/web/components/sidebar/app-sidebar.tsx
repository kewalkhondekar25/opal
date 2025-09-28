"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import Logo from "./logo";
import MyWorkspace from "./my-workspace";
import Menu from "./menu";
import { Separator } from "@/components/ui/separator"
import SharedWorkspace from "./shared-workspace";
import Upgrade from "./upgrade";
import Seperation from "./seperate-line";
import Console from "./console";
import { fetchAllNotifications } from "@/service/notifications";
import useRedux from "@/hooks/use-redux";

export function AppSidebar() {

    const {
        dispatch,
        setNotification,
        setIsNotificationLoading
    } = useRedux();

    const fetchNotifications = async () => {
        try {
            dispatch(setIsNotificationLoading());
            const notifications = await fetchAllNotifications();
            dispatch(setNotification(notifications));
            dispatch(setIsNotificationLoading());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        setInterval(() => {
            fetchNotifications();
        }, 30000);
    }, []);

    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center items-center">
                <Logo />
                <MyWorkspace />
            </SidebarHeader>
            <SidebarContent >
                <Menu />
                <Seperation />

                <SharedWorkspace />
                <Seperation />

                <Upgrade />
                <Seperation />

                {/* <SidebarGroup />
                <SidebarGroup /> */}
            </SidebarContent>
            <Console />
            <SidebarFooter />
        </Sidebar>
    )
}