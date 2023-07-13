import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
    try {
        const developer = await prisma.developer.findMany();
        return NextResponse.json(developer);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
