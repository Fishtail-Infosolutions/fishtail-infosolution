import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        const decoded = token ? await verifyToken(token) : null;

        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();
        const body = await req.json();

        const currentBlog = await Blog.findById(id);
        if (!currentBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        const updates: any = {
            title: body.title,
            slug: body.slug,
            content: body.content,
            imageUrl: body.imageUrl,
            status: body.status,
        };

        // Update publishedAt if status changed to Published
        if (body.status === 'Published' && currentBlog.status !== 'Published') {
            updates.publishedAt = new Date();
        }

        const blog = await Blog.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        return NextResponse.json(blog);
    } catch (error: any) {
        console.error('Blog update error:', error);
        if (error.code === 11000) {
            return NextResponse.json({ error: "Slug must be unique" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        const decoded = token ? await verifyToken(token) : null;

        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error('Blog delete error:', error);
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}
