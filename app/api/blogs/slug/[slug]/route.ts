import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        await connectDB();
        const blog = await Blog.findOne({ slug, status: 'Published' });

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error fetching blog by slug:', error);
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}
