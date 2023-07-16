import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body = await request.json();
    try {
        const company = await prisma.company.create({
            data: {
                name: body.name,
                hrName: body.hrName,
                email: body.email,
                password: body.password,
            },
        })
        return NextResponse.json({success: true, message: "Successfully signed up! Please Login to Enter.", company});
    } catch (error: any) {
        return NextResponse.json({success: false, message: error.message}, { status: 500 });
    }
}

