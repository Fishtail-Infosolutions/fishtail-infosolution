import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Quote from '@/models/Quote';

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
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const quotes = await Quote.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        const total = await Quote.countDocuments();

        return NextResponse.json({
            quotes,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error('Error fetching quotes:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
