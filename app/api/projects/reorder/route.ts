import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/models/Project";

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

        // Bulk update all order values in a single DB round-trip
        const operations = items.map((item: { _id: string; order: number }) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: { order: item.order } }
            }
        }));

        if (operations.length > 0) {
            await Project.bulkWrite(operations);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error reordering projects:", error);
        return NextResponse.json(
            { error: "Failed to reorder projects" },
            { status: 500 }
        );
    }
}
