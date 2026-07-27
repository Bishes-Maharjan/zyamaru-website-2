import { MetadataRoute } from 'next'
import { courses } from './data/courses'
import { instructors } from './data/instructors'
import { getPosts } from '@/lib/notion/getPosts'

const BASE_URL = 'https://www.zyamarufilms.com.np'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/career`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ]

    const instructorRoutes: MetadataRoute.Sitemap = instructors.map((instructor) => ({
        url: `${BASE_URL}/instructor/${instructor.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
        url: `${BASE_URL}/course/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts = await getPosts();
        blogRoutes = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.date || new Date()),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));
    } catch (e) {
        console.error("Failed to generate blog sitemap routes", e);
    }

    return [...staticRoutes, ...instructorRoutes, ...courseRoutes, ...blogRoutes]
}