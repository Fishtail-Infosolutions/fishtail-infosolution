import Link from "next/link";
import Image from "next/image";
import GlareHover from "@/components/GlareHover";
import { Blog } from "@/constants";
import { FaArrowRight } from "react-icons/fa6";

interface BlogCardProps {
    blog: Blog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
    return (
        <Link href={`/blog/${blog.id}`} className="block group w-full max-w-[350px] mx-auto sm:mx-0">
            <GlareHover
                width="100%"
                height="400px"
                borderRadius="15px"
                glareOpacity={0.3}
                transitionDuration={900}
                playOnce={true}
                className="flex flex-col items-end justify-center py-8 px-6 relative"
            >
                <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    className="w-full h-full object-cover absolute top-0 left-0 opacity-60 group-hover:opacity-40 duration-900 group-hover:scale-105 transition"
                />
                <div className="relative z-10 w-full pointer-events-none flex flex-col gap-4">
                    <p className="font-medium text-white text-lg line-clamp-2">
                        {blog.title}
                    </p>
                    <div className="flex justify-between items-center w-full">
                        <p className="font-normal text-sm text-neutral-300">
                            {blog.date}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-white font-medium group-hover:translate-x-1 transition-transform duration-300">
                            Read More <FaArrowRight />
                        </div>
                    </div>
                </div>
            </GlareHover>
        </Link>
    );
};
