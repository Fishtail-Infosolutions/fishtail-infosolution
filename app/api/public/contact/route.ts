import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { sendEmail, getContactTemplate } from "@/lib/mail";

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

        // Send Email Notification
        try {
            await sendEmail({
                to: process.env.MAIL_TO_HR || process.env.NOTIFICATION_EMAIL || "",
                subject: `New Contact Message: ${subject || 'General Inquiry'}`,
                html: getContactTemplate({ name, email, phone, subject, message }),
                replyTo: email
            });
        } catch (mailError) {
            console.error("Mail notification failed:", mailError);
            // We don't return error here because the database save was successful
        }

        return NextResponse.json(
            { message: "Message sent successfully", data: newContact },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            {
                error: "Failed to send message",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
