import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        await connectDB();

        const url = new URL(req.url);
        const limitParam = url.searchParams.get("limit");
        const pageParam = url.searchParams.get("page");

        const limit = limitParam ? parseInt(limitParam, 10) : 0;
        const page = pageParam ? parseInt(pageParam, 10) : 1;
        const skip = limit > 0 ? (page - 1) * limit : 0;

        const blogs = await Blog.find({}).sort({ updatedAt: -1 }).skip(skip).limit(limit);
        const total = await Blog.countDocuments({});

        return NextResponse.json({
            blogs,
            total,
            hasMore: limit > 0 ? total > skip + limit : false
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
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

        // Simple slug generation if not provided
        const slug = body.slug || body.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

        const blogData: any = {
            title: body.title,
            slug,
            content: body.content,
            imageUrl: body.imageUrl,
            category: body.category || 'Technology',
            tags: body.tags || [],
            author: body.author || 'Fishtail Admin',
            publishedAt: new Date()
        };

        if (body.excerpt) blogData.excerpt = body.excerpt;

        const blog = await Blog.create(blogData);

        return NextResponse.json(blog, { status: 201 });
    } catch (error: any) {
        console.error('Blog creation error:', error);
        if (error.code === 11000) {
            return NextResponse.json({ error: "Slug must be unique" }, { status: 400 });
        }
        return NextResponse.json({
            error: "Failed to create blog",
            details: error.message
        }, { status: 500 });
    }
}
