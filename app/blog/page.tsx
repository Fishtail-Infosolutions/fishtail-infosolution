"use client";

import React from "react";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { BlogCard } from "@/components/blogpage/card";
import { Blogs } from "@/constants";

const BlogPage = () => {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] pt-32 
    pb-12">
      {/* Banner Section */}
      <div className="w-full flex gap-6 flex-col items-center justify-center text-center px-9 mb-16">
        <div className=" ">
          <GradientBanner text="Our Blog" />
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
          Tech Insights
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
          Latest news, updates, and insights from our team of experts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-9 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {Blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
