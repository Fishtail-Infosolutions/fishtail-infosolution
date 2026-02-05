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
const ApplicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    jobTitle: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    workExperience: { type: String, required: true },
    expectedSalary: { type: String },
    portfolioLink: { type: String },
    githubLink: { type: String },
    cvUrl: { type: String, required: true },
    coverLetter: { type: String },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true }
}, { strict: false });

// Models
const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

const sampleApplicants = [
    {
        fullName: "Sudeep Sharma",
        email: "sudeep.sharma@example.com",
        phone: "+977 9841234567",
        address: "Kathmandu, Nepal",
        workExperience: "2-5 years",
        expectedSalary: "80,000+ NPR",
        portfolioLink: "https://sudeep.dev",
        githubLink: "https://github.com/sudeepdev",
        cvUrl: "https://example.com/cv/sudeep-sharma-cv.pdf",
        coverLetter: "I am passionate about building modern web applications. Having worked with the MERN stack for over 3 years, I believe I would be a great fit for your team."
    },
    {
        fullName: "Prajwal Gurung",
        email: "prajwal.g@example.com",
        phone: "+977 9812345678",
        address: "Pokhara, Nepal",
        workExperience: "1-2 years",
        expectedSalary: "60,000 NPR",
        portfolioLink: "https://prajwal.design",
        githubLink: "",
        cvUrl: "https://example.com/cv/prajwal-designers-cv.pdf",
        coverLetter: "Design is not just what it looks like, but how it works. I love creating user-centric designs that solve real problems."
    },
    {
        fullName: "Maya Adhikari",
        email: "maya.content@example.com",
        phone: "+977 9801122334",
        address: "Lalitpur, Nepal",
        workExperience: "5+ years",
        expectedSalary: "Negotiable",
        portfolioLink: "https://mayaadhikari.medium.com",
        githubLink: "",
        cvUrl: "https://example.com/cv/maya-adhikari-cv.pdf",
        coverLetter: "With a deep background in technical content writing and SEO strategy, I can help boost Fishtail's online presence and brand voice."
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB...');

        const jobs = await Job.find({});
        if (jobs.length === 0) {
            console.log('No jobs found. Please seed jobs first.');
            process.exit(1);
        }

        console.log(`Found ${jobs.length} jobs. Seeding applications...`);

        const applicationsToSeed = [];

        // Job 1: Software Development (MERN) -> Sudeep
        const devJob = jobs.find(j => j.title.includes('Stack'));
        if (devJob) {
            applicationsToSeed.push({
                ...sampleApplicants[0],
                job: devJob._id,
                jobTitle: devJob.title,
                status: 'pending'
            });
        }

        // Job 2: UI/UX Design -> Prajwal
        const designJob = jobs.find(j => j.title.includes('Designer'));
        if (designJob) {
            applicationsToSeed.push({
                ...sampleApplicants[1],
                job: designJob._id,
                jobTitle: designJob.title,
                status: 'reviewed'
            });
        }

        // Job 3: SEO/Content -> Maya
        const seoJob = jobs.find(j => j.title.includes('SEO') || j.title.includes('Writer'));
        if (seoJob) {
            applicationsToSeed.push({
                ...sampleApplicants[2],
                job: seoJob._id,
                jobTitle: seoJob.title,
                status: 'shortlisted'
            });
        }

        if (applicationsToSeed.length > 0) {
            await Application.insertMany(applicationsToSeed);
            console.log(`Successfully seeded ${applicationsToSeed.length} sample applications.`);
        } else {
            console.log('Could not match sample data with existing job titles.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
