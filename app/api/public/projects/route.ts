import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/models/Project";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();

        const projects = await Project.find({})
            .sort({ order: 1, createdAt: 1 });

        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching public projects:', error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}
