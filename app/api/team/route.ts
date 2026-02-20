import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        await connectDB();

        const teamMembers = await TeamMember.find({})
            .sort({ order: 1, createdAt: 1 });

        return NextResponse.json({
            teamMembers,
            total: teamMembers.length
        });
    } catch (error) {
        console.error('Error fetching team members:', error);
        return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        const decoded = token ? await verifyToken(token) : null;

        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const formData = await req.formData();

        const socialsData = formData.get('socials');
        const socials = socialsData ? JSON.parse(socialsData as string) : [];

        // Find the maximum order manually to append at the end
        const lastMember = await TeamMember.findOne().sort({ order: -1 }).select('order');
        const nextOrder = lastMember ? (lastMember.order + 1) : 0;

        const teamMember = await TeamMember.create({
            name: formData.get('name'),
            role: formData.get('role'),

            imageUrl: formData.get('imageUrl'),
            socials: socials,
            order: nextOrder,
            isActive: formData.get('isActive') === 'true',
        });

        return NextResponse.json(teamMember, { status: 201 });
    } catch (error: any) {
        console.error('Team member creation error:', error);
        return NextResponse.json({
            error: "Failed to create team member",
            details: error.message
        }, { status: 500 });
    }
}
