import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { deleteFile } from "@/lib/upload";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const teamMember = await TeamMember.findById(id);

        if (!teamMember) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json(teamMember);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        const decoded = token ? await verifyToken(token) : null;

        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;
        const formData = await req.formData();

        const currentTeamMember = await TeamMember.findById(id);
        if (!currentTeamMember) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        const socialsData = formData.get('socials');
        const socials = socialsData ? JSON.parse(socialsData as string) : [];

        // Build update object
        const updateData: any = {
            name: formData.get('name'),
            role: formData.get('role'),
            description: formData.get('description'),
            socials: socials,
            order: formData.get('order') !== null
                ? parseInt(formData.get('order') as string)
                : currentTeamMember.order,
            isActive: formData.get('isActive') === 'true',
        };

        // Handle image update
        const newImageUrl = formData.get('imageUrl');
        if (newImageUrl && newImageUrl !== currentTeamMember.imageUrl) {
            // Delete old image if exists
            if (currentTeamMember.imageUrl) {
                await deleteFile(currentTeamMember.imageUrl);
            }
            updateData.imageUrl = newImageUrl;
        } else if (!newImageUrl) {
            updateData.imageUrl = currentTeamMember.imageUrl;
        }

        const updatedTeamMember = await TeamMember.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        return NextResponse.json(updatedTeamMember);
    } catch (error: any) {
        console.error('Team member update error:', error);
        return NextResponse.json({
            error: "Failed to update team member",
            details: error.message
        }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        const decoded = token ? await verifyToken(token) : null;

        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;

        const deletedTeamMember = await TeamMember.findByIdAndDelete(id);

        if (!deletedTeamMember) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        // Delete associated image file
        if (deletedTeamMember.imageUrl) {
            await deleteFile(deletedTeamMember.imageUrl);
        }

        return NextResponse.json({ message: "Team member deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
    }
}
