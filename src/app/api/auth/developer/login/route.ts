import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const { email, password } = await request.json();
    
    try {
        // Fetch the developer from the database
        const developer = await prisma.developer.findUnique({
            where: { email },
        });
        // If the developer is not found, return an error
        if (!developer) {
            return NextResponse.json(
            { success: false, message: "Account not found" },
            { status: 404 }
            );
        }
        // If the password is incorrect, return an error
        if (developer.password !== password) {
            return NextResponse.json(
            { success: false, message: "Incorrect password" },
            { status: 401 }
            );
        }
        // If the developer is found and the password is correct, return the developer
        return NextResponse.json({ success: true, developer });
    } catch (error) {
        return NextResponse.json(
        { success: false, message: "Their was an error in the Signup", error },
        { status: 500 }
        );
    }
}