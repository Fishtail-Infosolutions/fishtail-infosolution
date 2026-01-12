import { FaFacebook, FaLinkedin, FaX, FaInstagram } from 'react-icons/fa6';

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
    name: "Alex Morgan",
    role: "CEO & Founder",
    imageUrl: "/image.png",
    description: "Visionary leader with a passion for digital innovation.",
    socials: [
      { platform: "LinkedIn", url: "#", icon: FaLinkedin },
      { platform: "Twitter", url: "#", icon: FaX },
    ]
  },
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    description: "Full-stack wizard turning complex problems into elegant code.",
    socials: [
      { platform: "GitHub", url: "#", icon: FaFacebook }, // Using existing icon as placeholder if needed, or just standard ones
      { platform: "LinkedIn", url: "#", icon: FaLinkedin },
    ]
  },
  {
    name: "Michael Ross",
    role: "Head of Marketing",
    description: "Data-driven strategist scaling brands to new heights.",
    socials: [
      { platform: "Instagram", url: "#", icon: FaInstagram },
      { platform: "LinkedIn", url: "#", icon: FaLinkedin },
    ]
  },
  {
    name: "Emily Davis",
    role: "UI/UX Designer",
    description: "Creative soul crafting intuitive and beautiful user experiences.",
    socials: [
      { platform: "Instagram", url: "#", icon: FaInstagram },
    ]
  },
  {
    name: "David Kim",
    role: "SEO Specialist",
    description: "Master of search algorithms and organic growth.",
    socials: [
      { platform: "LinkedIn", url: "#", icon: FaLinkedin },
    ]
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
  category: "Sales & support" | "Developer" | "Marketing" | "Design";
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
    icon: "/nextjs image career section.webp",
    title: "Software Sales Representative",
    role: "Mid Level",
    deadline: "2026-01-31",
    description: "You'll help restaurants grow by introducing them to the best restaurant software in Nepal. From finding potential customers to closing deals, you'll lead the full sales journey and be the voice of RestroX.",
    openings: 3,
    location: "Onsite",
    type: "Full Time",
    category: "Sales & support",
    postIcon: "/icons/sales.png",
    salary: "Negotiable",
    datePosted: "2026-01-01",
    responsibilities: [
      "Identify and pursue new business opportunities in the restaurant sector.",
      "Conduct product demonstrations and presentations to potential clients.",
      "Negotiate contracts and close deals to meet sales targets.",
      "Maintain strong relationships with existing clients to ensure satisfaction and retention."
    ],
    requirements: [
      "Proven experience in B2B sales, preferably in software or SaaS.",
      "Excellent communication and presentation skills.",
      "Strong negotiation and closing skills.",
      "Self-motivated and results-oriented."
    ],
    benefits: [
      "Competitive salary and commission structure.",
      "Health insurance and paid time off.",
      "Opportunity for career growth and advancement.",
      "Dynamic and supportive work environment."
    ],
    fallbackInitial: "S"
  },
  {
    id: 2,
    title: "Mid-Level Frontend Developer",
    role: "Mid Level",
    deadline: "2026-01-31",
    description: "We're hiring a Mid-Level Frontend Developer! Build dynamic, high-performance web apps with React, Next.js, and real-time tech in a fast-moving, collaborative team.",
    openings: 2,
    location: "Onsite",
    type: "Full Time",
    category: "Developer",
    postIcon: "/icons/developer.png",
    salary: "Negotiable",
    datePosted: "2026-01-05",
    responsibilities: [
      "Develop and maintain high-quality web applications using React and Next.js.",
      "Collaborate with designers and backend developers to implement new features.",
      "Optimize applications for maximum speed and scalability.",
      "Write clean, maintainable, and testable code."
    ],
    requirements: [
      "Strong proficiency in JavaScript, TypeScript, React, and Next.js.",
      "Experience with state management libraries (e.g., Redux, Zustand).",
      "Familiarity with modern CSS frameworks (e.g., Tailwind CSS).",
      "Understanding of REST APIs and GraphQL."
    ],
    benefits: [
      "Remote work options and flexible hours.",
      "Professional development budget.",
      "Stock options and performance bonuses.",
      "Latest hardware and software tools."
    ],
    fallbackInitial: "M"
  },
  {
    id: 3,
    title: "Senior UI/UX Designer",
    role: "Senior Level",
    deadline: "2026-02-15",
    description: "Shape the visual identity of our products. We are looking for a creative mind to design intuitive and beautiful user interfaces that delight our customers.",
    openings: 1,
    location: "Hybrid",
    type: "Full Time",
    category: "Design",
    postIcon: "/icons/design.png",
    salary: "Negotiable",
    datePosted: "2026-01-10",
    responsibilities: [
      "Create intuitive and visually appealing user interfaces for web and mobile apps.",
      "Conduct user research and usability testing to gather feedback.",
      "Create wireframes, prototypes, and high-fidelity mockups.",
      "Collaborate with developers to ensure design consistency."
    ],
    requirements: [
      "Proven experience as a UI/UX Designer with a strong portfolio.",
      "Proficiency in design tools such as Figma, Sketch, or Adobe XD.",
      "Understanding of user-centered design principles.",
      "Excellent communication and teamwork skills."
    ],
    benefits: [
      "Creative and collaborative work environment.",
      "Health and wellness programs.",
      "Annual company retreats.",
      "Paid parental leave."
    ],
    fallbackInitial: "S"
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    role: "Mid Level",
    deadline: "2026-02-28",
    description: "Drive growth through innovative marketing strategies. You'll manage campaigns, analyze performance, and optimize our digital presence across all channels.",
    openings: 2,
    location: "Remote",
    type: "Full Time",
    category: "Marketing",
    postIcon: "/icons/marketing.png",
    salary: "Negotiable",
    datePosted: "2026-01-08",
    responsibilities: [
      "Plan and execute digital marketing campaigns.",
      "Monitor and analyze campaign performance metrics.",
      "Manage social media accounts and content calendar.",
      "Conduct market research to identify trends and opportunities."
    ],
    requirements: [
      "Experience in digital marketing or related field.",
      "Knowledge of SEO/SEM and social media marketing.",
      "Analytical mindset and data-driven approach.",
      "Creativity and ability to generate new ideas."
    ],
    benefits: [
      "Flexible working hours.",
      "Performance-based bonuses.",
      "Learning and development opportunities.",
      "Team building events."
    ],
    fallbackInitial: "D"
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
    title: "In the mountains",
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
