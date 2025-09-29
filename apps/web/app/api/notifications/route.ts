import ApiResponse from "@/lib/apiResponse";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    try {
        const user = await currentUser();
        const email = user?.emailAddresses?.[0].emailAddress;
        if (!email) {
            return NextResponse.json(new ApiResponse(
                false,
                400,
                "Invalid user"
            ), { status: 400 });
        };

        const userId = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        const notifications = await prisma.notifications.findMany({
            where: { userId: userId?.id },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Notifications fetched successfully",
            notifications
        ), { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error fetching notifications",
        ), { status: 500 });
    }
};

const POST = async (req: NextRequest) => {
    try {
        const { notificationId } = await req.json();
        if (!notificationId) {
            return NextResponse.json(new ApiResponse(
                false,
                404,
                "Notification id not found"
            ), { status: 404 });
        };

        const user = await currentUser();
        const email = user?.emailAddresses?.[0].emailAddress;
        if (!email) {
            return NextResponse.json(new ApiResponse(
                false,
                400,
                "Invalid user"
            ), { status: 400 });
        };

        const notificationResult = await prisma.notifications.update({
            where: { id: notificationId },
            data: { isRead: true },
            select: { isRead: true }
        });
        if (!notificationResult.isRead) {
            return NextResponse.json(new ApiResponse(
                false,
                400,
                "Failed to update notification"
            ), { status: 400 });
        }

        return NextResponse.json(new ApiResponse(
            true,
            201,
            "Notification updated successfully"
        ));
    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error updating notification"
        ), { status: 500 });
    }
};

export {
    GET,
    POST
};