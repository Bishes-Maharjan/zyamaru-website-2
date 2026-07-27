import { courses } from '../../data/courses';
import CourseClient from './CourseClient';

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CourseClient slug={slug} />;
}
