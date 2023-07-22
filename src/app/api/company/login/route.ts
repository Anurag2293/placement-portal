import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

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
        console.log(result)
        return new NextResponse(JSON.stringify(result))
    } catch (error: any) {
        return new NextResponse(JSON.stringify(null))
    }
}