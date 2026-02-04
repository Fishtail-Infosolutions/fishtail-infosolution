import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job"; // To populate job details if needed

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const application = await Application.create(body);

        return NextResponse.json(application, { status: 201 });
    } catch (error: any) {
        console.error("Application Submission Error:", error);
        return NextResponse.json({
            error: "Failed to submit application",
            details: error.message
        }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get('job');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const query = jobId ? { job: jobId } : {};

        const applications = await Application.find(query)
            .populate('job', 'title') // Populate job title from Job model if it exists
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        const total = await Application.countDocuments(query);

        return NextResponse.json({
            applications,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error("Fetch Applications Error:", error);
        return NextResponse.json({
            error: "Failed to fetch applications",
            details: error.message
        }, { status: 500 });
    }
}
