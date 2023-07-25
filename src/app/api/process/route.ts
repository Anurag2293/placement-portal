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
                    company_name: true,
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
                        company_name: true,
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
                        company_name: true,
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

export const POST = async (request: Request) => {
    const body = await request.json();
    const { company_id, role, status, mode_of_work, location_city, location_state, location_country, eligibility, compensation, description, company_name  } = body;

    try {
        const company = await prisma.company.findUnique({
            where: {
                id: Number(company_id)
            }
        })

        if (!company) {
            return NextResponse.json({ success: false, message: "Company Not Found" }, { status: 404 });
        }
        if (company.name !== company_name) {
            return NextResponse.json({ success: false, message: "Company Name and ID does not match" }, { status: 400 });
        }

        const process = await prisma.process.create({
            data: {
                company_id,
                role,
                description,
                compensation,
                eligibility,
                location_country,
                location_state,
                location_city,
                mode_of_work,
                status: status || "open",
                company_name,
            }
        })

        return NextResponse.json({success: true, message: "Process Successfully Created!", process});
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message, body }, { status: 500 });
    }
}