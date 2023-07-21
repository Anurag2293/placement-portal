import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()

type RequestBody = {
    email: string,
    password: string,
}

export const POST = async (request: Request) => {
    const body: RequestBody  = await request.json()

    try {
        const company = await prisma.company.findUnique({
            where: {
                email: body.email
            }
        })

        if (!company) {
            return new NextResponse(JSON.stringify(null))
        }

        const passwordMatch = await bcrypt.compare(body.password, company.password)

        if (!passwordMatch) {
            return new NextResponse(JSON.stringify(null))
        }

        const { password, ...result } = company
        return new NextResponse(JSON.stringify(result))
    } catch (error: any) {
        return new NextResponse(JSON.stringify(null))
    }
}