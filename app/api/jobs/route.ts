import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/Job";
import JobCategory from "@/models/JobCategory";
import Application from "@/models/Application";
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

        const jobs = await Job.find({})
            .populate({
                path: 'category',
                model: JobCategory,
                select: 'name'
            })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        // Get application counts for each job
        const jobIds = jobs.map(job => job._id);
        const applicationCounts = await Application.aggregate([
            { $match: { job: { $in: jobIds } } },
            { $group: { _id: "$job", count: { $sum: 1 } } }
        ]);

        const countsMap = applicationCounts.reduce((acc, curr) => {
            acc[curr._id.toString()] = curr.count;
            return acc;
        }, {} as Record<string, number>);

        const jobsWithCounts = jobs.map(job => ({
            ...job.toObject(),
            applicationsCount: countsMap[job._id.toString()] || 0
        }));

        const total = await Job.countDocuments();

        return NextResponse.json({
            jobs: jobsWithCounts,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
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

        const job = await Job.create({
            title: formData.get('title'),
            category: formData.get('category') || null,
            icon: formData.get('icon'),
            type: formData.get('type'),
            locationType: formData.get('locationType'),
            description: formData.get('description'),
            requirements: JSON.parse(formData.get('requirements') as string || '[]'),
            responsibilities: JSON.parse(formData.get('responsibilities') as string || '[]'),
            salary: formData.get('salary'),
            openings: parseInt(formData.get('openings') as string || '1'),
            deadline: formData.get('deadline'),
        });

        const populatedJob = await Job.findById(job._id).populate('category', 'name');

        return NextResponse.json(populatedJob, { status: 201 });
    } catch (error: any) {
        console.error('Job creation error:', error);
        return NextResponse.json({
            error: "Failed to create job",
            details: error.message
        }, { status: 500 });
    }
}
