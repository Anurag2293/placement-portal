import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

/*
company_id     Int
createdAt      DateTime  @default(now())
name           String    @db.VarChar(255)
role           String    @db.VarChar(255)
description    String    @db.LongText
compensation   String    @db.MediumText
eligibility    String    @db.MediumText
start_date     DateTime? @db.DateTime
location       String    @db.VarChar(255)
remote         Boolean   @default(false)
status         String    @db.VarChar(255)
apply_deadline DateTime? @db.DateTime
*/