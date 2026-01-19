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
