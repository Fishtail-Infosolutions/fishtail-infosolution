import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Application from "@/models/Application";
import Contact from "@/models/Contact";
import Quote from "@/models/Quote";
import Job from "@/models/Job";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        const decoded = token ? await verifyToken(token) : null;

        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // 1. Get Totals
        const [
            totalApplications,
            pendingApplications,
            totalContacts,
            unreadContacts,
            totalQuotes,
            pendingQuotes,
            totalAdmins,
            totalJobs,
            totalBlogs,
            activeDepartments
        ] = await Promise.all([
            Application.countDocuments(),
            Application.countDocuments({ status: 'pending' }),
            Contact.countDocuments(),
            Contact.countDocuments({ status: 'pending' }),
            Quote.countDocuments(),
            Quote.countDocuments({ status: 'pending' }),
            User.countDocuments({ role: { $in: ['admin', 'super-admin'] } }),
            Job.countDocuments(),
            Blog.countDocuments(),
            Job.distinct('category').then(res => res.length)
        ]);

        // 2. Get Data for Charts (Last 7 Days)
        const dailyStats = await Promise.all(
            Array.from({ length: 7 }).map(async (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                date.setHours(0, 0, 0, 0);
                const nextDate = new Date(date);
                nextDate.setDate(nextDate.getDate() + 1);

                const [apps, contacts, quotes] = await Promise.all([
                    Application.countDocuments({ createdAt: { $gte: date, $lt: nextDate } }),
                    Contact.countDocuments({ createdAt: { $gte: date, $lt: nextDate } }),
                    Quote.countDocuments({ createdAt: { $gte: date, $lt: nextDate } })
                ]);

                return {
                    name: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    applications: apps,
                    contacts: contacts,
                    quotes: quotes
                };
            })
        );

        // 3. Status Distribution (for Pie Chart)
        const appStatusDist = await Application.aggregate([
            { $group: { _id: "$status", value: { $sum: 1 } } },
            { $project: { name: "$_id", value: 1, _id: 0 } }
        ]);

        // 4. Recent Activity
        const [recentApps, recentContacts, recentQuotes] = await Promise.all([
            Application.find().sort({ createdAt: -1 }).limit(4).select('fullName jobTitle createdAt'),
            Contact.find().sort({ createdAt: -1 }).limit(4).select('name subject createdAt'),
            Quote.find().sort({ createdAt: -1 }).limit(4).select('name websiteUrl createdAt')
        ]);

        const recentActivity = [
            ...recentApps.map(a => ({ type: 'application', title: `New application: ${a.fullName}`, subtitle: `Job: ${a.jobTitle}`, date: a.createdAt })),
            ...recentContacts.map(c => ({ type: 'contact', title: `New message: ${c.name}`, subtitle: `Inquiry: ${c.subject || 'General'}`, date: c.createdAt })),
            ...recentQuotes.map(q => ({ type: 'quote', title: `New Quote Request: ${q.name}`, subtitle: q.websiteUrl, date: q.createdAt, websiteUrl: q.websiteUrl }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

        return NextResponse.json({
            stats: {
                applications: { total: totalApplications, pending: pendingApplications },
                contacts: { total: totalContacts, unread: unreadContacts },
                quotes: { total: totalQuotes, pending: pendingQuotes },
                jobs: { total: totalJobs, activeDepartments },
                blogs: { total: totalBlogs }
            },
            charts: {
                daily: dailyStats.reverse(),
                distribution: appStatusDist
            },
            recentActivity,
            userRole: (decoded as any).role
        });
    } catch (error: any) {
        console.error("Dashboard Stats Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
