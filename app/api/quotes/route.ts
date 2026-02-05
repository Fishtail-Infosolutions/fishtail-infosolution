import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Quote from '@/models/Quote';
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { sendEmail, getQuoteTemplate } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const { websiteUrl, seoGoals, name, email, phone, company } = body;

        // Basic validation
        if (!websiteUrl || !name || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newQuote = await Quote.create({
            websiteUrl,
            seoGoals,
            name,
            email,
            phone,
            company,
            status: 'pending'
        });

        // Send Email Notification
        try {
            await sendEmail({
                to: process.env.MAIL_TO_INFO || process.env.NOTIFICATION_EMAIL || "",
                subject: `New SEO Quote Request from ${name}`,
                html: getQuoteTemplate({ name, email, phone, company, websiteUrl, seoGoals }),
                replyTo: email
            });
        } catch (mailError) {
            console.error("Mail notification failed:", mailError);
        }

        return NextResponse.json(
            { message: 'Quote submitted successfully', quote: newQuote },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error submitting quote:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();

        const quotes = await Quote.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            quotes
        });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
    }
}
