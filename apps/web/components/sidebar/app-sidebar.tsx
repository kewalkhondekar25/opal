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
import { fetchSubscription } from "@/service/subscription";

export function AppSidebar() {

    const {
        dispatch,
        setNotification,
        setIsNotificationLoading,
        isActive,
        setIsActive,
        setSubscriptionStatus
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

    const getSubscription = async () => {
        try {
            const response = await fetchSubscription();
            dispatch(setIsActive(response?.isActive));
            dispatch(setSubscriptionStatus(response?.subscriptionStatus))
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        getSubscription();
        //long-pooling
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

                {!isActive && <Upgrade />}
                <Seperation />

                {/* <SidebarGroup />
                <SidebarGroup /> */}
            </SidebarContent>
            <Console />
            <SidebarFooter />
        </Sidebar>
    )
}