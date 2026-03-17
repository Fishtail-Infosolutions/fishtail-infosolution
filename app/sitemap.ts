import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/db';
import Blog from '@/models/Blog';
import Job from '@/models/Job';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fishtailinfosolutions.com';

  // Static routes
  const staticRoutes = [
    '',
    '/blog',
    '/career',
    '/company',
    '/contact',
    '/projects',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  let jobRoutes: MetadataRoute.Sitemap = [];

  try {
    await connectToDatabase();
    
    // Fetch dynamic Blog routes
    const blogs = await Blog.find({}).select('slug updatedAt').lean();
    blogRoutes = (blogs as any[]).map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Fetch dynamic Career/Job routes
    const jobs = await Job.find({}).select('_id updatedAt').lean();
    jobRoutes = (jobs as any[]).map((job) => ({
      url: `${baseUrl}/career/${job._id}`,
      lastModified: job.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching blog/job routes for sitemap:', error);
  }

  return [...staticRoutes, ...blogRoutes, ...jobRoutes];
}
