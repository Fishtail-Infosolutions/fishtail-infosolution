import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();

        const teamMembers = await TeamMember.find({ isActive: true })
            .sort({ order: 1 });

        return NextResponse.json(teamMembers);
    } catch (error) {
        console.error('Error fetching public team members:', error);
        return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
    }
}
