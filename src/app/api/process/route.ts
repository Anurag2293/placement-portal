import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get Processes by Company ID
export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    try {
        const company_id  = searchParams.get('company_id');

        // include only following fields : [role, createdAt, status]
        const processes = await prisma.process.findMany({
            where: {
                company_id: Number(company_id)
            },
            select: {
                id: true,
                role: true,
                status: true,
                createdAt: true,
            }
        });
        

        return NextResponse.json({success: true, message: "Processes Successfully Fetched!", processes});
    } catch (error) {
        return NextResponse.json({success: false, message: "Their was an error in the Fetching", error }, { status: 500 });
    }
}