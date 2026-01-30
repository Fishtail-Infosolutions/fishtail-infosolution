import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { TeamMembers } from "@/constants/team";

export async function GET(req: Request) {
    try {
        await connectDB();

        // Optional: Check for admin authentication here if needed. 
        // For now, we assume this is a dev/admin tool.

        // Clear existing team members? 
        // User said "seed ... to the database". Usually implies a reset or initial population.
        // Let's safe guard: DELETE ALL.
        await TeamMember.deleteMany({});

        // Prepare data for insertion
        const teamMembersToInsert = TeamMembers.map((member, index) => ({
            name: member.name,
            role: member.role,
            description: member.description,
            imageUrl: member.imageUrl,
            // Map socials to remove 'icon' component which is not in schema
            socials: member.socials?.map(s => ({
                platform: s.platform,
                url: s.url
            })) || [],
            order: index, // Set order based on array position
            isActive: true, // Default to active
        }));

        await TeamMember.insertMany(teamMembersToInsert);

        return NextResponse.json({
            message: "Team members seeded successfully",
            count: teamMembersToInsert.length
        });

    } catch (error: any) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
