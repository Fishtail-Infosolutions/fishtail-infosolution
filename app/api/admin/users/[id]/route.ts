import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { verifyToken, hashPassword } from "@/lib/auth";
import { cookies } from "next/headers";

// GET single user by ID
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;
        const user = await User.findById(id).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

// PUT - Update user
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;
        const { email, password, role, isActive } = await req.json();

        // Email validation
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Password validation (if provided)
        if (password && password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Prevent super-admin from demoting or deactivating themselves
        if (id === (decoded as any)._id) {
            if (role && role !== "super-admin") {
                return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
            }
            if (isActive === false) {
                return NextResponse.json({ error: "Cannot deactivate your own account" }, { status: 400 });
            }
        }

        // Update fields
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email, _id: { $ne: id } });
            if (existingUser) {
                return NextResponse.json({ error: "Email already in use" }, { status: 400 });
            }
            user.email = email;
        }
        if (role) user.role = role;
        if (typeof isActive === "boolean") user.isActive = isActive;
        if (password) {
            user.password = await hashPassword(password);
        }

        await user.save();

        const userResponse = {
            _id: user._id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };

        return NextResponse.json({ user: userResponse, message: "User updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

// DELETE user
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;

        // Prevent super-admin from deleting themselves
        if (id === (decoded as any)._id) {
            return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await User.findByIdAndDelete(id);

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
