import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

// Get Processes by Company ID
export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    try {
        const company_id = searchParams.get('company_id');
        const process_id = searchParams.get('process_id');

        if (process_id) {
            const process = await prisma.process.findUnique({
                where: {
                    id: Number(process_id)
                },
                select: {
                    id: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    description: true,
                    compensation: true,
                    eligibility: true,
                    location_country: true,
                    location_state: true,
                    location_city: true,
                    mode_of_work: true,
                    expected_start_date: true,
                    apply_deadline: true,
                    companyName: true,
                }
            });
            return NextResponse.json({ success: true, message: "Process Successfully Fetched!", process });
        }
        else if (company_id) {
            let processes = [];

            if (company_id === 'all') {
                processes = await prisma.process.findMany({
                    select: {
                        id: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        description: true,
                        compensation: true,
                        eligibility: true,
                        location_country: true,
                        location_state: true,
                        location_city: true,
                        mode_of_work: true,
                        expected_start_date: true,
                        apply_deadline: true,
                        companyName: true,
                    }
                });
                return NextResponse.json({ success: true, message: "Processes Successfully Fetched!", processes });
            }
            else {
                processes = await prisma.process.findMany({
                    where: {
                        company_id: Number(company_id)
                    },
                    select: {
                        id: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        description: true,
                        compensation: true,
                        eligibility: true,
                        location_country: true,
                        location_state: true,
                        location_city: true,
                        mode_of_work: true,
                        expected_start_date: true,
                        apply_deadline: true,
                        companyName: true,
                    }
                });
                return NextResponse.json({ success: true, message: "Processes Successfully Fetched!", processes });
            }
        }
        else {
            return NextResponse.json({ success: false, message: "Please Provide Company ID or Process ID" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Their was an error in the Fetching", error }, { status: 500 });
    }
}

