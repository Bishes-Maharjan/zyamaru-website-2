// OrganizationSchema.tsx
// Server component — renders Organization JSON-LD so Google has an
// explicit, deliberate logo/brand image to use in search results,
// instead of guessing from whatever image it finds on the page
// (which was picking up the transparent navbar logo).
//
// Usage: render once, e.g. in layout.tsx or page.tsx:
//   import OrganizationSchema from './components/OrganizationSchema';
//   ...
//   <OrganizationSchema />

export default function OrganizationSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Zyamaru Films Academy',
        alternateName: 'ZYAMARU',
        url: 'https://www.zyamarufilms.com.np',
        logo: 'https://www.zyamarufilms.com.np/logo-square.png',
        image: 'https://www.zyamarufilms.com.np/og-image.jpg',
        description:
            'Zyamaru Films Academy is a cinematography and videography school based in Tahachal, Kathmandu, Nepal, offering courses in cinematography, documentary filmmaking, drone filmmaking, and color grading.',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kalanki-14, Tahachal Marg, Tahachal, Kathmandu',
            addressLocality: 'Kathmandu',
            addressRegion: 'Bagmati Province',
            postalCode: '44600',
            addressCountry: 'NP',
        },
        sameAs: [
            'https://www.facebook.com/profile.php?id=61570710927038',
            'https://www.youtube.com/@zyamarufilmmakers5114',
            'https://www.instagram.com/zyamarufilmsacademy/',
            'https://www.tiktok.com/@zyamaru.films.aca?_r=1&_t=ZS-97ns4YjsVBC',
        ],
    };

    return (
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}