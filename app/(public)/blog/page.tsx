"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { BlogCard } from "@/components/blogpage/card";
import { PublicWebsiteLoader } from "@/components/self-made-ui/public-website-loader";
import { notFound } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs?status=Published&limit=10");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <PublicWebsiteLoader message="Loading blogs..." />;

  if (!blogs) notFound()

  return (
    <main className="min-h-screen bg-background antialiased pt-32 transition-colors duration-500 pb-20">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full flex gap-6 flex-col items-center justify-center text-center px-9 mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" "
        >
          <GradientBanner text="Our Blog" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight"
        >
          Tech Insights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base"
        >
          Latest news, updates, and insights from our team of experts.
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-9 sm:px-6 lg:px-8">
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 font-medium italic">No articles published yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                className="w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogPage;
