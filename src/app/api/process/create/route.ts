import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();

    try {
        const process = await prisma.process.create({
            data: {
                company_id: body.company_id,
                role: body.role,
                description: body.description,
                compensation: body.compensation,
                eligibility: body.eligibility,
                location_country: body.location_country,
                location_state: body.location_state,
                location_city: body.location_city,
                mode_of_work: body.mode_of_work,
                status: body.status || "open",
            }
        })

        return NextResponse.json({success: true, message: "Process Successfully Created!", process});
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message, body }, { status: 500 });
    }
}