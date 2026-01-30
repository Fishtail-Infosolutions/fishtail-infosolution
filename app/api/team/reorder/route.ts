
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";

export async function PUT(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { items } = body;

        if (!Array.isArray(items)) {
            return NextResponse.json(
                { error: "Invalid data format" },
                { status: 400 }
            );
        }

        // Use bulkWrite for better performance
        const operations = items.map((item: { _id: string; order: number }) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: { order: item.order } }
            }
        }));

        if (operations.length > 0) {
            await TeamMember.bulkWrite(operations);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error reordering team members:", error);
        return NextResponse.json(
            { error: "Failed to reorder team members" },
            { status: 500 }
        );
    }
}
