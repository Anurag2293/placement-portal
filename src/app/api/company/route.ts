import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

type RequestBody = {
    name: string,
    email: string,
    password: string,
    hrName: string,
}

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    try {
        const company = await prisma.company.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                hrName: true,
                createdAt: true,
                location: true,
                website: true,
                logo: true,
            }
        })
        if (!company) throw new Error("Company not found")
        return new NextResponse(JSON.stringify(company))
    } catch (error) {
        return new NextResponse(JSON.stringify(null), {status: 404})
    }
}

export const POST = async (request: Request) => {
    const body: RequestBody  = await request.json()

    try {
        const company = await prisma.company.create({
            data: {
                name: body.name,
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                hrName: body.hrName
            }
        })

        const { password, ...result } = company
        console.log(result)
        return new NextResponse(JSON.stringify({company: result, message: "Company created successfully", success: true}))
    } catch (error: any) {
        return new NextResponse(JSON.stringify({message: error.message, success: false}))
    }
}