import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface MailOptions {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}

export const sendEmail = async ({ to, subject, html, replyTo }: MailOptions) => {
    try {
        const info = await transporter.sendMail({
            from: `"Fishtail Website" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            replyTo,
        });
        console.log("Email sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Email send error:", error);
        return { success: false, error };
    }
};

export const getContactTemplate = (data: { name: string; email: string; phone?: string; subject?: string; message: string }) => {
    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #3b82f6;">New Contact Message Received</h2>
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 5px; color: #374151;">
            ${data.message.replace(/\n/g, '<br/>')}
        </div>
        <p style="font-size: 12px; color: #9ca3af; margin-top: 30px;">
            This email was sent from the Fishtail Website Contact Form.
        </p>
    </div>
    `;
};

export const getQuoteTemplate = (data: { name: string; email: string; phone?: string; company?: string; websiteUrl: string; seoGoals?: string }) => {
    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #10b981;">New Quote Request Received</h2>
        <p><strong>Client Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        <p><strong>Website URL:</strong> <a href="${data.websiteUrl}">${data.websiteUrl}</a></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        ${data.seoGoals ? `
        <p><strong>SEO Goals:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 5px; color: #374151;">
            ${data.seoGoals.replace(/\n/g, '<br/>')}
        </div>
        ` : ''}
        <p style="font-size: 12px; color: #9ca3af; margin-top: 30px;">
            This email was sent from the Fishtail Website Free Quote Form.
        </p>
    </div>
    `;
};

interface ApplicationData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    workExperience?: string;
    expectedSalary?: string;
    portfolioLink?: string;
    githubLink?: string;
    jobTitle: string;
    resumeUrl: string;
    message?: string;
}

export const getApplicationTemplate = (data: ApplicationData) => {
    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #ef4444;">New Job Application</h2>
        <p><strong>Candidate:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.address ? `<p><strong>Address:</strong> ${data.address}</p>` : ''}
        <p><strong>Job Title:</strong> ${data.jobTitle}</p>
        ${data.workExperience ? `<p><strong>Experience:</strong> ${data.workExperience}</p>` : ''}
        ${data.expectedSalary ? `<p><strong>Expected Salary:</strong> ${data.expectedSalary}</p>` : ''}
        
        <div style="margin: 15px 0;">
            ${data.resumeUrl ? `<a href="${data.resumeUrl}" style="background: #ef4444; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px; margin-right: 10px;">View Resume</a>` : ''}
            ${data.portfolioLink ? `<a href="${data.portfolioLink}" style="background: #3b82f6; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px; margin-right: 10px;">Portfolio</a>` : ''}
            ${data.githubLink ? `<a href="${data.githubLink}" style="background: #333; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">GitHub</a>` : ''}
        </div>

        ${data.message ? `
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Cover Letter:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 5px; color: #374151;">
            ${data.message.replace(/\n/g, '<br/>')}
        </div>
        ` : ''}
        
        <p style="font-size: 12px; color: #9ca3af; margin-top: 30px;">
            This email was sent from the Fishtail Website Careers Page.
        </p>
    </div>
    `;
};
