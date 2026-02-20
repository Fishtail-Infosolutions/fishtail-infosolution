import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        await connectDB();

        const projects = await Project.find({}).sort({ order: 1, createdAt: 1 });

        return NextResponse.json({
            projects,
            pagination: {
                total: projects.length,
                page: 1,
                limit: projects.length,
                pages: 1
            }
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
        const body = await req.json();

        // Assign next order so new projects append at the end
        const lastProject = await Project.findOne().sort({ order: -1 }).select('order');
        const nextOrder = lastProject ? (lastProject.order + 1) : 0;

        const project = await Project.create({
            title: body.title,
            imageUrl: body.imageUrl,
            projectUrl: body.projectUrl,
            category: body.category || 'Development',
            description: body.description || '',
            order: nextOrder,
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
        console.error('Project creation error:', error);
        return NextResponse.json({
            error: "Failed to create project",
            details: error.message
        }, { status: 500 });
    }
}
