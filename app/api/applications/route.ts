import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job"; // To populate job details if needed
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { sendEmail, getApplicationTemplate } from "@/lib/mail";
import { getBaseUrl } from "@/lib/utils";


export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Convert empty strings to undefined for optional fields
        if (body.phone === "") delete body.phone;

        const application = await Application.create(body);

        // Fetch Job Title for email
        let jobTitle = "Unknown Position";
        try {
            const job = await Job.findById(body.job);
            if (job) jobTitle = job.title;
        } catch (err) {
            console.error("Could not fetch job title for email:", err);
        }

        // Send Email Notification to HR
        try {
            const baseUrl = getBaseUrl();
            const absoluteResumeUrl = body.cvUrl ? `${baseUrl}${body.cvUrl}` : "";

            await sendEmail({
                to: process.env.MAIL_TO_HR || process.env.NOTIFICATION_EMAIL || "",
                subject: `New Job Application: ${jobTitle} - ${body.fullName}`,
                html: getApplicationTemplate({
                    name: body.fullName,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    workExperience: body.workExperience,
                    expectedSalary: body.expectedSalary,
                    portfolioLink: body.portfolioLink,
                    githubLink: body.githubLink,
                    jobTitle: jobTitle,
                    resumeUrl: absoluteResumeUrl,
                    message: body.coverLetter
                }),
                replyTo: body.email
            });
        } catch (mailError) {
            console.error("HR Mail notification failed:", mailError);
        }

        return NextResponse.json(application, { status: 201 });
    } catch (error: any) {
        console.error("Application Submission Error:", error);
        return NextResponse.json({
            error: "Failed to submit application",
            details: error.message
        }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        const decoded = token ? await verifyToken(token) : null;

        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get('job');

        let query = {};
        if (jobId) {
            query = { job: jobId };
        }

        const applications = await Application.find(query)
            .populate({
                path: 'job',
                select: 'title'
            })
            .sort({ createdAt: -1 });

        // Map to include jobTitle for easier frontend access if populated
        const appsWithJobTitle = applications.map((app: any) => ({
            ...app.toObject(),
            jobTitle: app.job?.title || app.jobTitle || "Unknown Job"
        }));

        return NextResponse.json({
            applications: appsWithJobTitle
        });
    } catch (error: any) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({ error: "Failed to fetch applications", details: error.message }, { status: 500 });
    }
}
