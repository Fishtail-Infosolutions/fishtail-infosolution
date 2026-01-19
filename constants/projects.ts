export interface Project {
    id: number;
    title: string;
    imageUrl: string;
}

export const Projects: Project[] = [
    {
        id: 1,
        title: "EcoShop - Modern E-commerce",
        imageUrl:
            "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=3542&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Nova - SaaS Dashboard",
        imageUrl:
            "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=3540&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "WealthWise - Fintech App",
        imageUrl:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=3542&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Pulse - Health Monitoring",
        imageUrl:
            "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=3542&auto=format&fit=crop",
    },
];
