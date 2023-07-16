import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const { name, email, password } = await request.json();

    try {
        const developer = await prisma.developer.create({
            data: {
                name,
                email,
                externalId: ''
            },
        })
        return NextResponse.json({succes: true, message: "Successfully Signed Up!", developer});
    } catch (error) {
        return NextResponse.json({success: false, message: "Their was an error in the Signup", error }, { status: 500 });
    }
};