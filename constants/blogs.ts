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
