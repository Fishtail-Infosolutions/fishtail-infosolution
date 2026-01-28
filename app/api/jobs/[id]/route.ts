import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/Job";
import JobCategory from "@/models/JobCategory";
import { deleteFile } from "@/lib/upload";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = await params;

        const job = await Job.findById(id).populate({
            path: 'category',
            model: JobCategory,
            select: 'name'
        });

        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        return NextResponse.json(job);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = await params;
        const formData = await req.formData();

        const currentJob = await Job.findById(id);
        if (!currentJob) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        // Build update object
        const updateData: any = {
            title: formData.get('title'),
            category: formData.get('category'),
            type: formData.get('type'),
            location: formData.get('location'),
            description: formData.get('description'),
            requirements: JSON.parse(formData.get('requirements') as string || '[]'),
            responsibilities: JSON.parse(formData.get('responsibilities') as string || '[]'),
            salary: formData.get('salary'),
            openings: parseInt(formData.get('openings') as string || '1'),
            deadline: formData.get('deadline'),
        };

        // Handle icon update
        const newIcon = formData.get('icon');
        if (newIcon && newIcon !== currentJob.icon) {
            // Delete old icon if exists
            if (currentJob.icon) {
                await deleteFile(currentJob.icon);
            }
            updateData.icon = newIcon;
        } else if (!newIcon) {
            updateData.icon = currentJob.icon;
        }

        const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        }).populate({
            path: 'category',
            model: JobCategory,
            select: 'name'
        });

        return NextResponse.json(updatedJob);
    } catch (error: any) {
        console.error('Job update error:', error);
        return NextResponse.json({
            error: "Failed to update job",
            details: error.message
        }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        // Delete associated icon file
        if (deletedJob.icon) {
            await deleteFile(deletedJob.icon);
        }

        return NextResponse.json({ message: "Job deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
    }
}
