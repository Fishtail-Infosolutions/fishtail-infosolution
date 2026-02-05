import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        await connectDB();

        // Basic auth check
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        const decoded = token ? await verifyToken(token) : null;

        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contacts = await Contact.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}
