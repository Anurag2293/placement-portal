import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    const process_id = searchParams.get('process_id') || -1
    const developer_id = searchParams.get('developer_id') || -1

    try {
        if (developer_id === -1 && process_id === -1) {
            const applications = await prisma.application.findMany({
                select: {
                    id: true,
                    process_id: true,
                    developer_id: true,
                    status: true,
                    createdAt: true,
                }
            });

            return NextResponse.json({
                success: true,
                message: "Applications Fetched successfully!",
                applications,

            });
        }
        else if (process_id === -1) {
            const applications = await prisma.application.findMany({
                where: {
                    developer_id: Number(developer_id)
                },
            });

            const populatedApplications = await Promise.all(applications.map(async (application) => {
                const process = await prisma.process.findUnique({
                    where: {
                        id: application.process_id
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
                return { ...application, process };
            }));

            return NextResponse.json({ success: true, message: "Applications Fetched successfully!", applications, populatedApplications });
        }
        else {

            const applications = await prisma.application.findMany({
                where: {
                    process_id: Number(process_id)
                },
                select: {
                    id: true,
                    process_id: true,
                    developer_id: true,
                    status: true,
                    createdAt: true,
                }
            });

            const filteredApplication = applications.filter((application) => application.developer_id === Number(developer_id));

            return NextResponse.json({ success: true, message: "Applications Fetched successfully!", applications, filteredApplication });
        }
    }
    catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
}

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

        return NextResponse.json({ success: true, message: "Application Successful!", application });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};