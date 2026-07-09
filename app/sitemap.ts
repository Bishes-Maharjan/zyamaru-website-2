import { MetadataRoute } from 'next'
// adjust path to your actual file
import { courses } from './data/courses'         // adjust path to your actual file
import { instructors } from './data/instructors'
export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: 'https://zyamarufilms.com.np',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]

    const instructorRoutes: MetadataRoute.Sitemap = instructors.map((instructor) => ({
        url: `https://zyamarufilms.com.np/instructor/${instructor.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
        url: `https://zyamarufilms.com.np/course/${course.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    return [...staticRoutes, ...instructorRoutes, ...courseRoutes]
}