import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        await connectDB();

        // Get query parameters for pagination
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const teamMembers = await TeamMember.find({})
            .sort({ order: 1, createdAt: -1 })
            .limit(limit)
            .skip(skip);

        const total = await TeamMember.countDocuments();

        return NextResponse.json({
            teamMembers,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
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

        const teamMember = await TeamMember.create({
            name: formData.get('name'),
            role: formData.get('role'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            socials: socials,
            order: parseInt(formData.get('order') as string || '0'),
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
