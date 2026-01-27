import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Quote from '@/models/Quote';

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const body = await req.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        const updatedQuote = await Quote.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedQuote) {
            return NextResponse.json(
                { error: 'Quote not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedQuote);
    } catch (error: any) {
        console.error('Error updating quote:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const deletedQuote = await Quote.findByIdAndDelete(id);

        if (!deletedQuote) {
            return NextResponse.json(
                { error: 'Quote not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Quote deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting quote:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
