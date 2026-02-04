import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const { name, email, phone, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email and message are required" },
                { status: 400 }
            );
        }

        const newContact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message
        });

        return NextResponse.json(
            { message: "Message sent successfully", data: newContact },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message", details: error.message },
            { status: 500 }
        );
    }
}
