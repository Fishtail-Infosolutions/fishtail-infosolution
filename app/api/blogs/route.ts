import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const skip = (page - 1) * limit;

        const query: any = {};
        if (status) query.status = status;

        const blogs = await Blog.find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .limit(limit)
            .skip(skip);

        const total = await Blog.countDocuments(query);

        return NextResponse.json({
            blogs,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
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
            status: body.status || 'Draft',
            author: body.author || 'Fishtail Admin',
            publishedAt: body.status === 'Published' ? new Date() : null
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
