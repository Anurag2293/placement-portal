import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    const { process_id, developer_id } = body;

    try {
        const process = await prisma.process.findUnique({
            where: {
                id: process_id
            }
        });
        const company = await prisma.developer.findUnique({
            where: {
                id: developer_id
            }
        });

        if (!process || !company) {
            throw new Error("Process or Company not found");
        }

        const application = await prisma.application.create({
            data: {
                process_id,
                developer_id
            }
        });

        return NextResponse.json({ success: true, application });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};