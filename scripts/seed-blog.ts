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

// Define the schema here to avoid import issues in script context
const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    imageUrl: { type: String, required: true },
    author: { type: String, default: 'Fishtail Admin' },
    tags: [String],
    category: { type: String, default: 'Technology' },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
    publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

const sampleBlogs = [
    {
        title: "The Essential Guide to SEO for Modern Businesses",
        slug: "essential-guide-to-seo-2026",
        content: "<h1>Modern SEO Strategies</h1><p>Search Engine Optimization is no longer just about keywords. It's about user intent, site speed, and high-quality content that answers the user's questions.</p><h2>Key Trends in 2026</h2><ul><li>Voice Search Optimization</li><li>Core Web Vitals</li><li>AI-Driven Content Analysis</li></ul><p>Partnering with Fishtail Infosolutions ensures your brand stays ahead of the competition with cutting-edge SEO techniques.</p>",
        excerpt: "Learn how to dominate search results in 2026 with our comprehensive guide to modern SEO.",
        imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
        category: "Digital Marketing",
        status: "Published",
        tags: ["SEO", "Digital Marketing", "Business Growth"]
    },
    {
        title: "Mastering Web Performance with Next.js 15",
        slug: "mastering-web-performance-nextjs-15",
        content: "<h1>Next.js 15 Performance</h1><p>Next.js 15 brings groundbreaking features for speed. From improved Server Components to advanced caching strategies, building fast websites has never been easier.</p><p>We specialize in building high-performance applications that keep users engaged and improve conversion rates.</p>",
        excerpt: "Discover how Next.js 15 is revolutionizing web performance and why it matters for your business.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        category: "Web Development",
        status: "Published",
        tags: ["Next.js", "React", "Performance"]
    },
    {
        title: "Transforming Your Business with Cloud Intelligence",
        slug: "transforming-business-cloud-intelligence",
        content: "<h1>Cloud Intelligence & AI</h1><p>Cloud services aren't just for storage anymore. They are the backbone of AI-driven business intelligence. Learn how Fishtail can help you migrate and optimize your cloud infrastructure.</p>",
        excerpt: "Explore the intersection of cloud computing and artificial intelligence for business growth.",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c89eecdcbf7a?q=80&w=2070&auto=format&fit=crop",
        category: "Cloud Services",
        status: "Published",
        tags: ["Cloud", "AI", "Business Intelligence"]
    },
    {
        title: "Cybersecurity Best Practices for Remote Teams",
        slug: "cybersecurity-remote-teams",
        content: "<h1>Remote Work Security</h1><p>With more teams working remotely, security is more critical than ever. Implementing MFA, using secure VPNs, and regular security audits can protect your sensitive data.</p>",
        excerpt: "Keep your data safe with our top cybersecurity tips for managing a remote workforce.",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        category: "Cybersecurity",
        status: "Draft",
        tags: ["Cybersecurity", "Remote Work", "Data Protection"]
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing blogs (optional - user might prefer to keep them, but "seed actual data" often implies a fresh start or filling it up)
        // Let's check for existing ones first
        const count = await Blog.countDocuments();
        console.log(`Current blog count: ${count}`);

        if (count > 0) {
            console.log('Clearing existing blog data...');
            await Blog.deleteMany({});
        }

        await Blog.insertMany(sampleBlogs);
        console.log('Successfully seeded blog data!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
