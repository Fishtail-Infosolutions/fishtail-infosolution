"use client";

import React from "react";
import { motion } from "motion/react";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { BlogCard } from "@/components/blogpage/card";
import { Blogs } from "@/constants";

const BlogPage = () => {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] pt-32 
    pb-12">
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
          className="text-3xl md:text-4xl font-semibold text-white tracking-tight"
        >
          Tech Insights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base"
        >
          Latest news, updates, and insights from our team of experts.
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-9 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {Blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
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
      </div>
    </main>
  );
};

export default BlogPage;
