
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    socials: [{
        platform: { type: String, enum: ['LinkedIn', 'Twitter', 'Facebook', 'GitHub', 'Instagram', 'Website'] },
        url: { type: String }
    }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

const teamMembers = [
    {
        name: "Rahul Rauniyar",
        role: "CEO of Fishtail Info Solutions",
        imageUrl: "/team member images/rahul-rauniyar.jpg",
        description: "Rahul leads Fishtail with 10+ years of digital marketing experience and innovative strategies.",
        socials: [
            { platform: "LinkedIn", url: "https://in.linkedin.com/in/geekishrahul" },
            { platform: "Twitter", url: "https://x.com/GeekishRahul" },
            { platform: "Facebook", url: "https://www.facebook.com/GeekishRahul/" },
        ]
    },
    {
        name: "Bikash Gupta",
        role: "SEO Specialist",
        imageUrl: "/team member images/bikash.png",
        description: "Specializes in search engine optimization, helping clients achieve top rankings consistently.",
        socials: [
            { platform: "Facebook", url: "https://www.facebook.com/viikash.k?mibextid=JRoKGi" },
        ]
    },
    {
        name: "Rahul Gupta",
        role: "Senior Content Writer",
        imageUrl: "/team member images/rahul.png",
        description: "Crafts in-depth content strategies that align with brand goals and resonate with target audiences.",
    },
    {
        name: "Aakriti Rouniyar",
        role: "HR/SEO Analyst",
        imageUrl: "/team member images/aakriti.png",
        description: "Experienced in HR and Finance, now expanding skills in SEO for digital marketing growth.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/aakriti-rouniyar" },
        ]
    },
    {
        name: "Abishek Khadka",
        role: "Full Stack Developer",
        imageUrl: "/team member images/abishek.png",
        description: "Develops robust web applications using modern technologies, ensuring scalable solutions.",
        socials: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/khadka27" },
            { platform: "Facebook", url: "https://facebook.com/khadka27" },
            { platform: "GitHub", url: "https://github.com/khadka27" },
        ]
    },
    {
        name: "Aashish Rauniyar",
        role: "Software Developer | Project Manager",
        imageUrl: "/team member images/asis.png",
        description: "Passionate developer and manager building scalable applications and leading cross-functional teams.",
        socials: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/aashishprasadgupta" },
            { platform: "GitHub", url: "https://github.com/AashishRauniyar" },
        ]
    },
    {
        name: "Elvik Sharma",
        role: "Software Developer",
        imageUrl: "/team member images/elvik.png",
        description: "Developer with a passion for building web/mobile apps, skilled in video editing and UI design.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/elvik-sharma-13b52b202/" },
            { platform: "Facebook", url: "https://www.facebook.com/elvik111/" },
            { platform: "GitHub", url: "https://github.com/elviks" },
        ]
    },
    {
        name: "Pratikshya Srish",
        role: "Senior Content Writer",
        imageUrl: "/team member images/pratikshya.png",
        description: "Specializes in marketing campaigns that deliver measurable results for diverse clients.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/pratiksha-srish-175102256/" },
        ]
    },
    {
        name: "Mamata Bhattarai",
        role: "Jr. Content Writer",
        imageUrl: "/team member images/mamta.png",
        description: "Passionate about crafting compelling content that connects audiences and boosts brand storytelling.",
    },
    {
        name: "Tilasmi Subedi",
        role: "Content Writer / Video Creator",
        imageUrl: "/team member images/tilasmi.png",
        description: "Creates stories, performs video editing, and manages social media channels effectively.",
        socials: [
            { platform: "Facebook", url: "https://www.facebook.com/tilasmi.subedi.3" },
        ]
    },
    {
        name: "Anjana Poudel",
        role: "Content Writer / Video Creator",
        imageUrl: "/team member images/anjana.png",
        description: "Specializing in content creation, video editing, and SEO with a passion for digital media.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/anjanapoudel/" },
        ]
    },
    {
        name: "Sadikshya Budhathoki",
        role: "Jr. Content Writer",
        imageUrl: "/team member images/sadikshya.png",
        description: "Delivers polished content blending creativity with optimization to enhance digital visibility.",
    },
    {
        name: "Prity Thapa",
        role: "Jr. Software Developer",
        imageUrl: "/team member images/prity.png",
        description: "Junior software developer with a passion for building robust web applications.",
    },
    {
        name: "Monika Gharti",
        role: "Jr. Content Writer",
        imageUrl: "/team member images/monika.png",
        description: "Driven SEO writer with a strong foundation in keyword research and content optimization.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/monika-gharti-08457735b" },
            { platform: "Facebook", url: "https://www.facebook.com/share/1AnX5takge/?mibextid=wwXIfr" },
        ]
    },
    {
        name: "Bishal Kumar Gupta",
        role: "Jr. Content Writer",
        imageUrl: "/team member images/bishal.png",
        description: "Motivated SEO writer focused on creating engaging and search-engine-optimized content.",
    },
    {
        name: "Muna Pun",
        role: "Jr. Content Writer",
        imageUrl: "/team member images/muna.png",
        description: "Focused on creating engaging content that ranks well, with a solid grasp of SEO basics.",
    },
    {
        name: "Karuna Thapa",
        role: "SEO Analyst/ Video Creator",
        imageUrl: "/team member images/karuna.png",
        description: "Specializing in content creation and video editing to craft meaningful online content.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/karunathapa/" },
        ]
    },
    {
        name: "Parash Parajuli",
        role: "Junior Data Analyst",
        imageUrl: "/team member images/parash.png",
        description: "Keen interest in transforming data into actionable insights using modern analytic tools.",
    }
];

async function seedTeam() {
    try {
        console.log('Connecting to database...');
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        console.log('Clearing existing team members...');
        await TeamMember.deleteMany({});
        console.log('Cleared!');

        console.log('Seeding new team members...');
        const teamMembersWithOrder = teamMembers.map((member, index) => ({
            ...member,
            order: index + 1
        }));
        await TeamMember.insertMany(teamMembersWithOrder);
        console.log(`Successfully seeded ${teamMembers.length} team members!`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding team:', error);
        process.exit(1);
    }
}

seedTeam();
