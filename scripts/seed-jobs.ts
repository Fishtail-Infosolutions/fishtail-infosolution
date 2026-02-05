import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

// Schemas
const JobCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, { timestamps: true });

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'JobCategory' },
    icon: { type: String },
    type: { type: String, required: true },
    locationType: { type: String, enum: ["Onsite", "Remote", "Hybrid"], required: true },
    description: { type: String, required: true },
    salary: { type: String },
    requirements: [String],
    responsibilities: [String],
    openings: { type: Number, default: 1 },
    deadline: { type: String }
}, { timestamps: true });

// Models
const JobCategory = mongoose.models.JobCategory || mongoose.model('JobCategory', JobCategorySchema);
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

const jobData = [
    {
        category: "Software Development",
        jobs: [
            {
                title: "Full-Stack Developer (MERN)",
                type: "Full-time",
                locationType: "Hybrid",
                description: "We are seeking a talented MERN stack developer to build and maintain high-quality web applications. You will be responsible for both frontend and backend development, ensuring seamless integration and performance.",
                salary: "Negotiable",
                requirements: ["2+ years of experience with React, Node.js, and MongoDB", "Proficiency in TypeScript and Tailwind CSS", "Experience with RESTful APIs and state management"],
                responsibilities: ["Develop scalable backend services", "Build responsive and interactive user interfaces", "Collaborate with designers and product managers"],
                openings: 2,
                deadline: "March 20, 2026",
                icon: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
            }
        ]
    },
    {
        category: "UI/UX Design",
        jobs: [
            {
                title: "Product Designer (UI/UX)",
                type: "Full-time",
                locationType: "Onsite",
                description: "Join us to create intuitive and visually stunning designs for our digital products. Your role is crucial in defining the user journey and ensuring our brand's aesthetic is consistent yet cutting-edge.",
                salary: "Competitive",
                requirements: ["Strong portfolio with UI/UX case studies", "Proficiency in Figma and Adobe Creative Suite", "Understanding of user-centered design principles"],
                responsibilities: ["Create wireframes, prototypes, and high-fidelity designs", "Conduct user research and usability testing", "Work closely with developers to ensure design feasibility"],
                openings: 1,
                deadline: "March 15, 2026",
                icon: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
            }
        ]
    },
    {
        category: "Content & SEO",
        jobs: [
            {
                title: "Senior Content Writer",
                type: "Full-time",
                locationType: "Remote",
                description: "We are looking for a creative storyteller who can produce engaging content across various platforms. You will write blogs, website copy, and marketing materials that resonate with our audience.",
                salary: "Negotiable",
                requirements: ["Exceptional writing and editing skills in English", "Experience in tech-focused content writing", "Ability to meet tight deadlines"],
                responsibilities: ["Research and write high-quality blog posts", "Write compelling copy for social media and advertisements", "Proofread and polish content from other team members"],
                openings: 1,
                deadline: "March 25, 2026",
                icon: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop"
            },
            {
                title: "SEO Specialist",
                type: "Full-time",
                locationType: "Hybrid",
                description: "Drive organic growth for our clients. You will implement on-page and off-page SEO strategies, conduct keyword research, and monitor performance using various analytics tools.",
                salary: "Market Rate",
                requirements: ["Proven experience as an SEO Specialist", "Familiarity with Google Analytics, Search Console, and Ahrefs", "Knowledge of search engine ranking factors"],
                responsibilities: ["Develop and execute SEO strategies", "Perform keyword research and competitive analysis", "Optimize website content and structure for better rankings"],
                openings: 1,
                deadline: "March 22, 2026",
                icon: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop"
            }
        ]
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB...');

        // Clear existing jobs and categories
        await Job.deleteMany({});
        await JobCategory.deleteMany({});
        console.log('Cleared existing job data.');

        for (const catInfo of jobData) {
            const category = await JobCategory.create({
                name: catInfo.category,
                description: `Career opportunities in ${catInfo.category}`
            });
            console.log(`Category created: ${category.name}`);

            for (const jobInfo of catInfo.jobs) {
                await Job.create({
                    ...jobInfo,
                    category: category._id
                });
                console.log(`Job created: ${jobInfo.title}`);
            }
        }

        console.log('Job database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
