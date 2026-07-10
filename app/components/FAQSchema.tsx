// FAQSchema.tsx
// Server component — renders a JSON-LD FAQPage schema containing ALL
// questions and answers from every tab, so search engines can index
// the full content regardless of which accordion/tab is open on load.
//
// Usage: import and render this once inside FAQSection.tsx (or in the
// page that includes FAQSection), e.g.:
//
//   import FAQSchema from './FAQSchema';
//   ...
//   <FAQSchema />
//   <FAQSection />

import { faqCategories } from '../data/faqs';

// Strips markdown-style **bold** and bullet markers so the schema
// contains clean plain text (schema.org text fields shouldn't contain
// markdown/HTML).
function cleanText(text: string): string {
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold markers
        .replace(/^•\s*/gm, '')          // remove bullet markers
        .replace(/\n{2,}/g, ' ')         // collapse multiple newlines
        .replace(/\n/g, ' ')             // remaining newlines -> space
        .trim();
}

export default function FAQSchema() {
    const allItems = faqCategories.flatMap((cat) => cat.items);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: allItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: cleanText(item.answer),
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}