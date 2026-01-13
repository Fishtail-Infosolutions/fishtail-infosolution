import { FaFacebook, FaLinkedin, FaX, FaInstagram, FaGithub } from 'react-icons/fa6';

export const Socials = [
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "https://www.facebook.com/fishtailinfosolutions",
    hoverColor: "hover:text-[#1877F2]", // Facebook blue
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/fishtailinfosolutions/posts/?feedView=all",
    hoverColor: "hover:text-[#0e76a8]", // LinkedIn blue
  },
  {
    name: "X", // Updated for Twitter as X symbol
    icon: FaX,
    href: "https://twitter.com/fishtailinfo",
    hoverColor: "hover:text-[#1DA1F2]", // Twitter blue
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/fishtailinfosolutions/",
    hoverColor: "hover:text-red-500", // Red color for Instagram
  },
];

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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export const MessageFAQ: FAQCategory[] = [
  {
    category: "General",
    items: [
      {
        question: "What makes Fishtail Infosolutions different?",
        answer: "We combine data-driven strategies with creative excellence to deliver results that matter. Our holistic approach ensures every aspect of your digital presence works together seamlessly."
      },
      {
        question: "Do you work with startups?",
        answer: "Yes, we love working with startups! We offer scalable solutions tailored to help new businesses establish a strong digital foundation and grow rapidly."
      },
      {
        question: "How can I get a quote?",
        answer: "You can simply click the 'Free Quote' button in our navigation bar or contact us through our contact page. We'll get back to you within 24 hours."
      }
    ]
  },
  {
    category: "Web Development",
    items: [
      {
        question: "How long to build a website?",
        answer: "A standard informational website typically takes 2-4 weeks. Complex web applications may take 8-12 weeks depending on features and requirements."
      },
      {
        question: "Is mobile optimization included?",
        answer: "Absolutely. All our websites are built with a mobile-first approach, ensuring perfect performance across all devices and screen sizes."
      },
      {
        question: "Do you offer website redesign?",
        answer: "Yes, we specialize in modernizing legacy websites to improve performance, user experience, and conversion rates while preserving your brand identity."
      }
    ]
  },
  {
    category: "Digital Marketing",
    items: [
      {
        question: "When will I see SEO results?",
        answer: "SEO is a long-term strategy. Typically, noticeable improvements begin in 3-6 months, with compounding results as we continue to optimize and create content."
      },
      {
        question: "Can you manage our social media?",
        answer: "Yes, we provide full-service social media management including content creation, community engagement, and paid advertising campaigns."
      },
      {
        question: "What platforms do you support?",
        answer: "We specialize in Google Ads, Meta (Facebook/Instagram), LinkedIn, and emerging platforms depending on where your target audience is most active."
      }
    ]
  },
  {
    category: "Lead Gen & Affiliate",
    items: [
      {
        question: "How does your lead generation work?",
        answer: "We use a multi-channel approach combining SEO, PPC, and content marketing to attract high-intent prospects and nurture them through sales funnels."
      },
      {
        question: "What affiliate networks do you use?",
        answer: "We partner with major networks and can also build custom affiliate programs to recruit and manage high-performing partners for your business."
      },
      {
        question: "How do you ensure lead quality?",
        answer: "We implement strict validation processes and qualification criteria to ensure you only spend time on leads that are genuinely interested and likely to convert."
      }
    ]
  }
];

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

export interface Project {
  id: number;
  title: string;
  imageUrl: string;
}

export const Projects: Project[] = [
  {
    id: 1,
    title: "In the Mountains",
    imageUrl:
      "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "River Serenity",
    imageUrl:
      "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Forest Retreat",
    imageUrl:
      "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Urban Escape",
    imageUrl:
      "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
  readTime?: string;
  content?: string;
}

export const Blogs: Blog[] = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Explore how Next.js is revolutionizing the way we build modern web applications with server-side rendering and static site generation.",
    date: "Jan 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    slug: "future-of-web-development",
    readTime: "5 min read",
    content: `
      <p>Next.js has rapidly evolved into one of the most popular React frameworks...</p>
      <h3>Server Components</h3>
      <p>The introduction of React Server Components has changed the game...</p>
      <ul>
        <li>Improved Performance</li>
        <li>Smaller Client Bundles</li>
        <li>Better SEO</li>
      </ul>
      <p>As we look to the future, we can expect even more integration...</p>
    `
  },
  {
    id: 2,
    title: "Optimizing SEO: Strategies",
    excerpt: "Learn the key strategies to improve your website's search engine ranking and drive organic traffic to your business.",
    date: "Jan 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1571721795195-a2d809cb9f38?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    slug: "optimizing-seo-strategies",
    readTime: "7 min read",
    content: `
      <p>Search Engine Optimization is crucial for online visibility...</p>
      <h3>Core Web Vitals</h3>
      <p>Google's emphasis on user experience metrics means performance is key...</p>
      <h3>Content is King</h3>
      <p>High-quality, relevant content remains the most important factor...</p>
    `
  },
  {
    id: 3,
    title: "UI/UX Design Trends 2026",
    excerpt: "Stay ahead of the curve with the latest trends in user interface and user experience design, from glassmorphism to micro-interactions.",
    date: "Jan 08, 2026",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=3564&auto=format&fit=crop&ixlib=rb-4.0.3",
    slug: "ui-ux-design-trends-2026",
    readTime: "4 min read",
    content: `
      <p>Design trends are constantly shifting. In 2026, we see a return to...</p>
      <h3>Glassmorphism 2.0</h3>
      <p>More refined, accessible glass effects are taking over...</p>
      <h3>Dark Mode Default</h3>
      <p>Designing for dark mode first is becoming standard practice...</p>
    `
  },
  {
    id: 4,
    title: "Power of Digital Marketing",
    excerpt: "Discover how a comprehensive digital marketing strategy can transform your business, increase brand awareness, and boost sales.",
    date: "Jan 03, 2026",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3430&auto=format&fit=crop&ixlib=rb-4.0.3",
    slug: "power-of-digital-marketing",
    readTime: "6 min read",
    content: `
      <p>Digital marketing is more than just ads. It's about connecting...</p>
      <h3>Personalization</h3>
      <p>Customers expect personalized experiences across all touchpoints...</p>
      <h3>Data-Driven Decisions</h3>
      <p>Using analytics to drive strategy is non-negotiable in 2026...</p>
    `
  }
];
