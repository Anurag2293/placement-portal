import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
    const user = await currentUser();
    try {
        const checkUser = await prisma.developer.findUnique({ where: { externalId: user?.id } });
        if (checkUser) {
            return NextResponse.json({success: true, message: "You already have a developer account!"});
        }

        const developer = await prisma.developer.create({
            data: {
                externalId: user?.id || "12345",
                name: user?.firstName + " " + user?.lastName || "John Doe",
                email: user?.emailAddresses[0].emailAddress || "",
                avatar: user?.profileImageUrl || "",
            }
        })
        return NextResponse.json({success: true, message: "Successfully Validated!", developer});
    } catch (error) {
        return NextResponse.json({success: false, message: "Their was an error in the Validation", error }, { status: 500 });
    }
}