export interface JobOpening {
    id: number;
    title: string;
    role: string;
    deadline: string;
    description: string;
    openings: number;
    location: string;
    type: string;
    category: "Developer" | "Designer" | "SEO" | "Content Writer";
    icon?: any; // For company logo/icon if needed
    postIcon?: string; // Image path from public folder e.g. "/icons/sales.png"
    salary: string;
    datePosted: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    fallbackInitial: string;
}

export const JobOpenings: JobOpening[] = [
    {
        id: 1,
        icon: "/career posting images/nextjs logo.png",
        title: "Mid-Level Frontend Developer (Next.js)",
        role: "Mid Level",
        deadline: "2026-02-28",
        description: "We are looking for a skilled Frontend Developer proficient in Next.js and React to build high-performance web applications.",
        openings: 2,
        location: "Onsite",
        type: "Full Time",
        category: "Developer",
        postIcon: "/career posting images/nextjs logo.png",
        salary: "Negotiable",
        datePosted: "2026-01-15",
        responsibilities: [
            "Develop and maintain complex frontend applications using Next.js.",
            "Ensuring high performance and responsiveness of web pages.",
            "Collaborating with backend developers and designers.",
            "Code review and mentoring junior developers."
        ],
        requirements: [
            "2+ years of experience with React and Next.js.",
            "Strong understanding of TypeScript and Tailwind CSS.",
            "Knowledge of SEO principles in web development.",
            "Excellent problem-solving skills."
        ],
        benefits: [
            "Competitive salary and growth opportunities.",
            "Creative and flexible workspace.",
            "Health benefits and regular team outings.",
            "Access to the latest learning resources."
        ],
        fallbackInitial: "N"
    },
    {
        id: 5,
        icon: "/career posting images/nodejs logo.png",
        title: "Backend Developer (Node.js)",
        role: "Mid Level",
        deadline: "2026-03-05",
        description: "Looking for a Backend Developer to join our core team and build scalable server-side systems using Node.js and Express.",
        openings: 1,
        location: "Onsite",
        type: "Full Time",
        category: "Developer",
        postIcon: "/career posting images/nodejs logo.png",
        salary: "Negotiable",
        datePosted: "2026-01-18",
        responsibilities: [
            "Design and implement scalable RESTful APIs.",
            "Optimize server performance and database queries.",
            "Integrate third-party services and payment gateways.",
            "Maintain code quality and documentation."
        ],
        requirements: [
            "2+ years of experience with Node.js and Express.",
            "Proficient in PostgreSQL and MongoDB.",
            "Familiarity with containerization (Docker).",
            "Strong understanding of server-side logic."
        ],
        benefits: [
            "High-impact role in a growing startup.",
            "Modern tech stack and developer-friendly culture.",
            "Flexible working arrangements.",
            "Generous stock options."
        ],
        fallbackInitial: "B"
    },
    {
        id: 2,
        icon: "/career posting images/ui ux logo.png",
        title: "Senior UI/UX Designer",
        role: "Senior Level",
        deadline: "2026-03-15",
        description: "Join us to create visually stunning and highly functional user interfaces for our global client base.",
        openings: 1,
        location: "Onsite",
        type: "Full Time",
        category: "Designer",
        postIcon: "/career posting images/ui ux logo.png",
        salary: "Negotiable",
        datePosted: "2026-01-20",
        responsibilities: [
            "Gather and evaluate user requirements in collaboration with product managers.",
            "Illustrate design ideas using storyboards, process flows, and sitemaps.",
            "Design graphic user interface elements, like menus, tabs, and widgets.",
            "Develop UI mockups and prototypes."
        ],
        requirements: [
            "Proven work experience as a UI/UX Designer.",
            "Portfolio of design projects.",
            "Knowledge of wireframe tools (e.g. Figma, Adobe XD).",
            "Up-to-date knowledge of design software."
        ],
        benefits: [
            "Collaborative and innovative environment.",
            "Performance-based bonuses.",
            "Professional development opportunities.",
            "Dynamic team culture."
        ],
        fallbackInitial: "U"
    },
    {
        id: 3,
        icon: "/career posting images/seo logo.png",
        title: "SEO Specialist",
        role: "Mid Level",
        deadline: "2026-02-20",
        description: "Manage all SEO activities and marketing, including content strategy, link building, and keyword strategy.",
        openings: 2,
        location: "Hybrid",
        type: "Full Time",
        category: "SEO",
        postIcon: "/career posting images/seo logo.png",
        salary: "Negotiable",
        datePosted: "2026-01-10",
        responsibilities: [
            "Perform ongoing keyword discovery, expansion, and optimization.",
            "Research and implement search engine optimization recommendations.",
            "Develop and implement link building strategy.",
            "Work with the development team to ensure SEO best practices are properly implemented."
        ],
        requirements: [
            "Proven SEO experience.",
            "In-depth experience with website analytics tools.",
            "Knowledge of ranking factors and search engine algorithms.",
            "Solid understanding of performance marketing, conversion, and online customer acquisition."
        ],
        benefits: [
            "Learning-centric environment.",
            "Health insurance coverage.",
            "Paid workshops and certifications.",
            "Flexible working model."
        ],
        fallbackInitial: "S"
    },
    {
        id: 4,
        icon: "/career posting images/content writer logo.png",
        title: "Content Writer",
        role: "Junior Level",
        deadline: "2026-03-10",
        description: "Create compelling articles, blog posts, and website content to engage our audience and improve search visibility.",
        openings: 3,
        location: "Onsite",
        type: "Full Time",
        category: "Content Writer",
        postIcon: "/career posting images/content writer logo.png",
        salary: "Negotiable",
        datePosted: "2026-01-25",
        responsibilities: [
            "Produce various content types, including email, social media posts, blogs, and white papers.",
            "Collaborate with marketing and design teams to illustrate articles.",
            "Identify customers' needs and gaps in our content and recommend new topics.",
            "Ensure all-around consistency (style, fonts, images, and tone)."
        ],
        requirements: [
            "Exceptional writing and editing skills.",
            "Knowledge of SEO and digital marketing.",
            "Ability to meet deadlines.",
            "Bachelor's degree in Journalism, English, or related field preferred."
        ],
        benefits: [
            "Guided mentorship from senior writers.",
            "Exposure to diverse industry topics.",
            "Fun and energetic office environment.",
            "Performance incentives."
        ],
        fallbackInitial: "C"
    }
];
