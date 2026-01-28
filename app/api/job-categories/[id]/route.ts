import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import JobCategory from "@/models/JobCategory";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = await params;
        const { name, description } = await req.json();

        const updatedCategory = await JobCategory.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(updatedCategory);
    } catch (error: any) {
        console.error("Job Category Update Error:", error);
        if (error.code === 11000) {
            return NextResponse.json({ error: "Category name already exists" }, { status: 400 });
        }
        return NextResponse.json({
            error: "Failed to update category",
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

        const deletedCategory = await JobCategory.findByIdAndDelete(id);

        if (!deletedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
