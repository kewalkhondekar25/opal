import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    return NextResponse.json({
        success: true,
        statusCode: 200,
        message: "Health check passed successfully",    
    }, { status: 200 })
};

export { GET }