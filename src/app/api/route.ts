import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export const GET = async (request: Request) => {
    try {
        const developer = await prisma.developer.findMany();
        return NextResponse.json(developer);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export const POST = async (request: Request) => {
    const body = await request.json();

    try {
        // const developer = await prisma.developer.create({
        //     data: {
        //         name: body.name,
        //         email: body.email,
        //         avatar: body.avatar,
        //
        //     },
        // })
        // return NextResponse.json(developer);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

};