import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import JobCategory from "@/models/JobCategory";
import Job from "@/models/Job";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        await connectDB();

        // Get all categories sorted by name
        const categories = await JobCategory.find({}).sort({ name: 1 });

        // Get job counts for each category
        const categoriesWithCount = await Promise.all(
            categories.map(async (category) => {
                const jobCount = await Job.countDocuments({ category: category._id });
                return {
                    ...category.toObject(),
                    jobCount
                };
            })
        );

        return NextResponse.json(categoriesWithCount);
    } catch (error) {
        console.error("Fetch Job Categories Error:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
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
        const { name, description } = await req.json();

        const category = await JobCategory.create({
            name,
            description
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error: any) {
        console.error("Job Category Creation Error:", error);
        if (error.code === 11000) {
            return NextResponse.json({ error: "Category already exists" }, { status: 400 });
        }
        return NextResponse.json({
            error: "Failed to create category",
            details: error.message
        }, { status: 500 });
    }
}
