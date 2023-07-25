import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    const external_id = searchParams.get('external_id') || ""

    try {
        const developer = await prisma.developer.findUnique({
            where: {
                externalId: external_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                location: true,
                bio: true,
                avatar: true,
                website: true,
                github: true,
                linkedin: true,
            }
        })
        if (!developer) {
            throw new Error("Developer not found")
        }
        return new NextResponse(JSON.stringify({success: true, developer}))
    }
    catch (error: any) {
        return new NextResponse(JSON.stringify({ success: false, message: error.message}), { status: 404 })
    }
}