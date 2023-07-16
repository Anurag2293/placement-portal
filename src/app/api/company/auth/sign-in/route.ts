import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const { email, password } = await request.json();
    try {
        const company = await prisma.company.findUnique({ where: { email: email } });
        if (!company) {
            return NextResponse.json({success: false, message: "Company not found"}, { status: 404 });
        }
        if (company.password !== password) {
            return NextResponse.json({success: false, message: "Password is incorrect"}, { status: 401 });
        }
        return NextResponse.json({success: true, message: "Company Successfully signed in", company});
    } catch (error: any) {
        return NextResponse.json({success: false, message: error.message}, { status: 500 });
    }
}

