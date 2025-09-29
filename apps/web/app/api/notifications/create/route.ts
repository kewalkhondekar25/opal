import ApiResponse from "@/lib/apiResponse";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
    try {
        const { title, subTitle } = await req.json();

        const user = await currentUser();
        const email = user?.emailAddresses?.[0].emailAddress;
        if (!email) {
            return NextResponse.json(new ApiResponse(
                false,
                400,
                "Invalid user"
            ), { status: 400 });
        };

        const updatedNotification = await prisma.$transaction( async (tx) => {

            const user = await prisma.user.findUnique({
                where: { email },
                select: { id: true }
            });
            
            const updatedNotification = await prisma.notifications.create({
                data: {
                    userId: user!?.id,
                    title,
                    subTitle
                },
            });

            return updatedNotification;

        });

        if (!updatedNotification) {
            return NextResponse.json(new ApiResponse(
                false,
                400,
                "Failed to create notification"
            ), { status: 400 });
        }

        return NextResponse.json(new ApiResponse(
            true,
            201,
            "Notification created successfully"
        ));
    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error creating notification"
        ), { status: 500 });
    }
};

export { POST };