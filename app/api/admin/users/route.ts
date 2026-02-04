import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { verifyToken, hashPassword } from "@/lib/auth";
import { cookies } from "next/headers";

// GET all users (only for super-admin)
export async function GET(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (!decoded || (decoded as any).role !== "super-admin") {
            return NextResponse.json({ error: "Forbidden - Super admin only" }, { status: 403 });
        }

        await connectToDatabase();

        const users = await User.find({}).select("-password").sort({ createdAt: -1 });

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

// POST - Create new user (only for super-admin)
export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (!decoded || (decoded as any).role !== "super-admin") {
            return NextResponse.json({ error: "Forbidden - Super admin only" }, { status: 403 });
        }

        const { email, password, role } = await req.json();

        if (!email || !password || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Password validation
        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role,
        });

        const userResponse = {
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt,
        };

        return NextResponse.json({ user: userResponse, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
