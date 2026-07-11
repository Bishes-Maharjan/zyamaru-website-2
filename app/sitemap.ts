import { MetadataRoute } from 'next'
// adjust path to your actual file
import { courses } from './data/courses'         // adjust path to your actual file
import { instructors } from './data/instructors'

const BASE_URL = 'https://www.zyamarufilms.com.np'

export default function sitemap(): MetadataRoute.Sitemap {
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

    return [...staticRoutes, ...instructorRoutes, ...courseRoutes]
}