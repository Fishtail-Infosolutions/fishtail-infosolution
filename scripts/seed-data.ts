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
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    projectUrl: { type: String, required: true },
    category: { type: String, default: 'Development' },
    description: { type: String, default: '' }
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    imageUrl: { type: String, required: true },
    author: { type: String, default: 'Fishtail Admin' },
    tags: [String],
    category: { type: String, default: 'Technology' },
    publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

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

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    socials: [{
        platform: { type: String, enum: ['LinkedIn', 'Twitter', 'Facebook', 'GitHub', 'Instagram', 'Website'] },
        url: { type: String }
    }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Models
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const JobCategory = mongoose.models.JobCategory || mongoose.model('JobCategory', JobCategorySchema);
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

const sampleProjects = [
    {
        title: "LMS Pro: Unified Learning Environment",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
        projectUrl: "https://lms-demo.fishtail.com",
        category: "EdTech",
        description: "A comprehensive learning management system built for educational institutions, featuring real-time virtual classrooms, automated grading, and student performance tracking."
    },
    {
        title: "Fishtail ERP: Small Business Suite",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        projectUrl: "https://erp-demo.fishtail.com",
        category: "Enterprise Software",
        description: "Custom ERP solution designed to streamline inventory management, financial accounting, and HR operations for small and medium-scale businesses."
    },
    {
        title: "SwiftStore: High-Performance E-commerce",
        imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop",
        projectUrl: "https://swiftstore.fishtail.com",
        category: "E-commerce",
        description: "Next-gen e-commerce platform with a mobile-first approach, integrating multiple payment gateways and advanced analytics for business growth."
    },
    {
        title: "HealthSync: Patient Management Portal",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173599211d0?q=80&w=2070&auto=format&fit=crop",
        projectUrl: "https://healthsync.fishtail.com",
        category: "Healthcare IT",
        description: "A secure and efficient patient management portal for clinics and hospitals, facilitating digital prescriptions and appointment scheduling."
    }
];

const sampleBlogs = [
    {
        title: "How AI is Revolutionizing Software Development in 2026",
        slug: "ai-revolutionizing-software-development-2026",
        content: "<h1>The AI Shift in Development</h1><p>The landscape of software development is undergoing a seismic shift. Generative AI is no longer just a gimmick; it's a core productivity tool for professional engineers.</p><h2>The local Impact</h2><p>For companies like Fishtail Infosolutions, AI allows us to accelerate delivery cycles while maintaining rigorous quality standards.</p><h3>Why it Matters</h3><ul><li>Reduced Time-to-Market</li><li>Automated Code Reviews</li><li>Smarter Predictive Maintenance</li></ul>",
        excerpt: "Explore how AI is moving beyond simple code suggestions to becoming a strategic partner in complex software architecture.",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
        category: "Artificial Intelligence",
        tags: ["AI", "Software Engineering", "Tech Trends"]
    },
    {
        title: "The Future of Web Performance: Next.js 15 and Beyond",
        slug: "future-of-web-performance-nextjs-15",
        content: "<h1>Speed as a Service</h1><p>In 2026, a millisecond delay can cost thousands in lost revenue. We explore how Next.js 15 handles server actions and advanced hydration to deliver instant experiences.</p>",
        excerpt: "Web performance isn't just a technical metric; it's the foundation of modern user experience and SEO success.",
        imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
        category: "Web Development",
        tags: ["Next.js", "Performance", "Frontend"]
    },
    {
        title: "Securing the Future: Cybersecurity for Growing Startups",
        slug: "cybersecurity-for-growing-startups",
        content: "<h1>Data Under Threat</h1><p>As startups scale, they become increasingly attractive targets for cyber threats. Implementing Zero Trust architecture is no longer optional.</p>",
        excerpt: "Don't let a breach end your story. Learn the essential security protocols every growing tech firm must implement today.",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        category: "Cybersecurity",
        tags: ["Security", "Startup", "Data Protection"]
    }
];

const sampleTeam = [
    {
        name: "Sandesh Subedi",
        role: "Chief Executive Officer",
        description: "Visionary leader with 10+ years of experience in driving digital transformation and software excellence.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
        socials: [
            { platform: "LinkedIn", url: "https://linkedin.com" },
            { platform: "Twitter", url: "https://twitter.com" }
        ],
        order: 1
    },
    {
        name: "Aashish Dhakal",
        role: "Chief Technical Officer",
        description: "Expert architect specializing in scalable cloud solutions and high-performance system design.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        socials: [
            { platform: "GitHub", url: "https://github.com" },
            { platform: "LinkedIn", url: "https://linkedin.com" }
        ],
        order: 2
    }
];

const jobCategories = [
    { name: "Software Development", description: "Design and build cutting-edge applications." },
    { name: "UI/UX Design", description: "Create intuitive and beautiful user experiences." },
    { name: "Digital Marketing", description: "Grow brands through strategic online campaigns." }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB...');

        // Clear existing data
        await Project.deleteMany({});
        await Blog.deleteMany({});
        await TeamMember.deleteMany({});

        // Seed Projects
        await Project.insertMany(sampleProjects);
        console.log('Projects seeded!');

        // Seed Blogs
        await Blog.insertMany(sampleBlogs);
        console.log('Blogs seeded!');

        // Seed Team
        await TeamMember.insertMany(sampleTeam);
        console.log('Team members seeded!');

        // Seed Categories
        const existingCats = await JobCategory.find({});
        const existingCatNames = existingCats.map(c => c.name);
        const seededCats = [];
        for (const cat of jobCategories) {
            if (!existingCatNames.includes(cat.name)) {
                const newCat = await JobCategory.create(cat);
                seededCats.push(newCat);
            } else {
                seededCats.push(existingCats.find(c => c.name === cat.name));
            }
        }
        console.log('Categories ensured!');

        // Seed Sample Job
        await Job.deleteMany({});
        await Job.create({
            title: "Senior Full-Stack Developer",
            category: seededCats[0]._id,
            icon: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
            type: "Full-time",
            locationType: "Hybrid",
            description: "We are looking for a Senior Full-Stack Developer to lead our core products. You will work with Next.js, Node.js, and specialized AI integrations.",
            salary: "Competitive",
            requirements: ["5+ years of experience with JS/TS", "Deep knowledge of React and Next.js", "Experience with AWS or Azure"],
            responsibilities: ["Lead the development of new features", "Mentor junior developers", "Architect scalable backend solutions"],
            openings: 2,
            deadline: "March 15, 2026"
        });
        console.log('Sample job seeded!');

        console.log('Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
