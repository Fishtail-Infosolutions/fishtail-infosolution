import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/models/Project";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const projects = await Project.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        const total = await Project.countDocuments();

        return NextResponse.json({
            projects,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const project = await Project.create({
            title: body.title,
            imageUrl: body.imageUrl,
            projectUrl: body.projectUrl,
            category: body.category || 'Development',
            description: body.description || '',
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
