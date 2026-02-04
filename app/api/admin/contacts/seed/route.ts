import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";

const seedContacts = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        subject: "Website Redesign Inquiry",
        message: "Hi, I'm interested in redesigning my business website. Could you please provide some information on your pricing and timeline?",
        status: "pending"
    },
    {
        name: "Alice Smith",
        email: "alice.smith@techflow.io",
        phone: "+44 7700 900000",
        subject: "SEO Services",
        message: "We've seen your work and are impressed. We'd like to discuss an SEO strategy for our new e-commerce platform.",
        status: "read"
    },
    {
        name: "Robert Wilson",
        email: "r.wilson@buildit.com",
        phone: "+61 2 9876 5432",
        subject: "Mobile App Development",
        message: "Do you offer cross-platform mobile app development services? We have a prototype ready for discussion.",
        status: "replied"
    },
    {
        name: "Emma Davis",
        email: "emma.d@creativehub.net",
        phone: "+1 555 0199",
        subject: "Partnership Opportunity",
        message: "I'm the director of Creative Hub, and we're looking for a reliable technical partner for our upcoming client projects.",
        status: "pending"
    },
    {
        name: "Michael Chen",
        email: "m.chen@asiatech.sg",
        subject: "General Inquiry",
        message: "Hello, I just wanted to ask if you have experience with Web3 and blockchain integrations?",
        status: "archived"
    },
    {
        name: "Sarah Johnson",
        email: "sarah.j@lifestyle.co",
        phone: "+1 202 555 0101",
        subject: "Digital Marketing Portfolio",
        message: "Could you send over your portfolio of digital marketing campaigns for lifestyle brands?",
        status: "pending"
    },
    {
        name: "David Miller",
        email: "d.miller@fintech-solutions.com",
        subject: "System Maintenance",
        message: "Our current system is experiencing some lag. We need an expert team to audit our infrastructure.",
        status: "read"
    },
    {
        name: "Sophia Brown",
        email: "s.brown@greenearth.org",
        phone: "+1 312 555 0123",
        subject: "NGO Website Development",
        message: "We're a non-profit organization looking for a website upgrade. Do you offer special rates for NGOs?",
        status: "pending"
    }
];

export async function GET() {
    try {
        await connectDB();

        // Clear existing contacts to avoid duplicates during testing (optional)
        // await Contact.deleteMany({});

        await Contact.insertMany(seedContacts);

        return NextResponse.json({ message: "Contacts seeded successfully", count: seedContacts.length });
    } catch (error: any) {
        return NextResponse.json({ error: "Seeding failed", details: error.message }, { status: 500 });
    }
}
