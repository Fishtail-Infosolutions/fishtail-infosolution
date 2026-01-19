import { FaFacebook, FaLinkedin, FaX, FaGithub } from 'react-icons/fa6';

export interface TeamMember {
    name: string;
    role: string;
    description: string;
    imageUrl?: string;
    socials?: {
        platform: string;
        url: string;
        icon: any;
    }[];
}

export const TeamMembers: TeamMember[] = [
    {
        name: "Rahul Rauniyar",
        role: "CEO of Fishtail Info Solutions",
        imageUrl: "/team member images/rahul-rauniyar.jpg",
        description: "Rahul leads Fishtail with 10+ years of digital marketing experience and innovative strategies.",
        socials: [
            { platform: "LinkedIn", url: "https://in.linkedin.com/in/geekishrahul", icon: FaLinkedin },
            { platform: "Twitter", url: "https://x.com/GeekishRahul", icon: FaX },
            { platform: "Facebook", url: "https://www.facebook.com/GeekishRahul/", icon: FaFacebook },
        ]
    },
    {
        name: "Bikash Gupta",
        role: "SEO Specialist",
        imageUrl: "/team member images/bikash.png",
        description: "Specializes in search engine optimization, helping clients achieve top rankings consistently.",
        socials: [
            { platform: "Facebook", url: "https://www.facebook.com/viikash.k?mibextid=JRoKGi", icon: FaFacebook },
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
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/aakriti-rouniyar", icon: FaLinkedin },
        ]
    },
    {
        name: "Abishek Khadka",
        role: "Full Stack Developer",
        imageUrl: "/team member images/abishek.png",
        description: "Develops robust web applications using modern technologies, ensuring scalable solutions.",
        socials: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/khadka27", icon: FaLinkedin },
            { platform: "Facebook", url: "https://facebook.com/khadka27", icon: FaFacebook },
            { platform: "GitHub", url: "https://github.com/khadka27", icon: FaGithub },
        ]
    },
    {
        name: "Aashish Rauniyar",
        role: "Software Developer | Project Manager",
        imageUrl: "/team member images/asis.png",
        description: "Passionate developer and manager building scalable applications and leading cross-functional teams.",
        socials: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/aashishprasadgupta", icon: FaLinkedin },
            { platform: "GitHub", url: "https://github.com/AashishRauniyar", icon: FaGithub },
        ]
    },
    {
        name: "Elvik Sharma",
        role: "Software Developer",
        imageUrl: "/team member images/elvik.png",
        description: "Developer with a passion for building web/mobile apps, skilled in video editing and UI design.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/elvik-sharma-13b52b202/", icon: FaLinkedin },
            { platform: "Facebook", url: "https://www.facebook.com/elvik111/", icon: FaFacebook },
            { platform: "GitHub", url: "https://github.com/elviks", icon: FaGithub },
        ]
    },
    {
        name: "Pratikshya Srish",
        role: "Senior Content Writer",
        imageUrl: "/team member images/pratikshya.png",
        description: "Specializes in marketing campaigns that deliver measurable results for diverse clients.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/pratiksha-srish-175102256/", icon: FaLinkedin },
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
            { platform: "Facebook", url: "https://www.facebook.com/tilasmi.subedi.3", icon: FaFacebook },
        ]
    },
    {
        name: "Anjana Poudel",
        role: "Content Writer / Video Creator",
        imageUrl: "/team member images/anjana.png",
        description: "Specializing in content creation, video editing, and SEO with a passion for digital media.",
        socials: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/anjanapoudel/", icon: FaLinkedin },
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
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/monika-gharti-08457735b", icon: FaLinkedin },
            { platform: "Facebook", url: "https://www.facebook.com/share/1AnX5takge/?mibextid=wwXIfr", icon: FaFacebook },
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
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/karunathapa/", icon: FaLinkedin },
        ]
    },
    {
        name: "Parash Parajuli",
        role: "Junior Data Analyst",
        imageUrl: "/team member images/parash.png",
        description: "Keen interest in transforming data into actionable insights using modern analytic tools.",
    }
];
