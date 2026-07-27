import { instructors } from '../../data/instructors';
import InstructorClient from './InstructorClient';

export function generateStaticParams() {
  return instructors.map((instructor) => ({
    name: instructor.slug,
  }));
}

export default async function InstructorPage({ params }: { params: Promise<{ name: string }> }) {
  const { name: slug } = await params;
  return <InstructorClient slug={slug} />;
}
