'use client';

import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

const testimonials = [
  {
    name: 'Purnima Maharjan',
    quote: 'Before Zyamaru Films Academy, I just took pictures. I never really understood what I was doing. I just pointed and hoped it looked nice. The biggest thing I learned here is that an image isn\'t created when you press the shutter. It\'s already formed in your mind before that. The camera just captures what you\'ve already seen. Now I understand light, not just brightness, but mood and emotion, and I\'ve realized even a small change in angle can completely change how the audience feels about a photo. I genuinely see the world differently now, the way a real photographer does.',
    rating: 5,
  },
  {
    name: 'Ronish Shrestha',
    quote: 'I almost didn\'t join. I thought I was too old to start learning something like this. Honestly, that was the biggest thing holding me back, not skill, just fear. But this turned out to be one of the best decisions I\'ve made. I found real confidence here, and I truly believe this is the right place to start a cinematography career, no matter your age or background. If you\'re on the fence because you think it\'s "too late" for you, it isn\'t. I\'m proof of that.',
    rating: 5,
  },
  {
    name: 'Anil Shahi',
    quote: 'What made the biggest difference for me was actually holding professional cinema equipment, like real cameras, lenses, and lighting. Not just watching demonstrations. Most places talk about "professional training" but don\'t actually let you touch the gear. Here, I did, from day one. And the learning didn\'t stop when the course ended either. I still get free mentorship on real projects, and having someone experienced to turn to has given me the kind of confidence a certificate alone never could.',
    rating: 5,
  },
  {
    name: 'Kushal Maharjan',
    quote: 'What surprised me most was my mentor. He\'s not just technical, he\'s literature-aware. He genuinely understands storytelling, and that\'s the most important quality any cinematographer can have. A camera doesn\'t make a story; a storyteller does. And the mentors here aren\'t just teaching from the front of the room. They\'re facilitators, walking with you through every step. Honestly, the whole environment just feels different. It\'s friendly, easy, and fun to be in. I think any Gen Z person who loves creating will vibe with this place exactly like I did.',
    rating: 5,
  },
  {
    name: 'Ronish shrestha',
    quote: 'As a business owner, I didn\'t join to become a full-time filmmaker. I joined to finally understand content creation and visual storytelling for my own brand. Now I don\'t have to depend entirely on others for my marketing. But before I found Zyamaru, I almost enrolled somewhere else that looked convincing on the surface.',
    rating: 5,
  },
  {
    name: 'Sunita Gaha',
    quote: 'I\'ve realized that one wrong decision on which institute to choose can make your entire investment feel like garbage. Asking the right questions before enrolling anywhere, including here, genuinely matters.',
    rating: 5,
  },
  {
    name: 'Bijendra Maharjan',
    quote: 'I used to just cover weddings: get the rings, get the vows, get the dance, job done. After this course, everything changed. Now I notice the quiet look between a father and daughter, the tear no one else caught, the human moments a checklist would never capture. And it\'s not just weddings. I can\'t even watch a regular movie the same way anymore. I notice the shot composition, the lighting, the camera angles, every single time. Storytelling, not just documentation, is what makes my work actually mean something now.',
    rating: 5,
  },
  {
    name: 'Prasiddha Singh',
    quote: 'I used to just point and shoot, hoping it turned out okay. Now I actually understand white balance, shot size, and camera angle, and how each one shapes a story. What used to feel like guesswork now feels like a language I\'m learning to speak. Online tutorials never gave me this because cinematography has to be physically experienced, not just watched. This course made me better at my actual job, gave me real confidence, and honestly, if you\'re confused about whether to join, just take the course. This is where things really started for me.',
    rating: 5,
  },
];

export default function TestimonialSection() {
  // Double the testimonials for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="section"
      style={{
        background: 'var(--color-bg)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '3rem' }}>
        <ScrollReveal>
          <div className="section-label">Testimonials</div>
        </ScrollReveal>

        <TextReveal text="Stories From Our Graduates" as="h2" />

        <ScrollReveal delay={0.2}>
          <p
            style={{
              maxWidth: '500px',
              marginTop: '1rem',
              fontSize: '1.05rem',
            }}
          >
            Real results from real students. Here&apos;s what they have to say.
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee Row 1 (left) */}
      <div
        style={{
          overflow: 'hidden',
          marginBottom: '1rem',
          maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            animation: 'marquee 40s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} {...t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (right) */}
      <div
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            animation: 'marquee 45s linear infinite reverse',
            width: 'max-content',
          }}
        >
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`row2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
  rating,
  course,
}: {
  name: string;
  role?: string;
  quote: string;
  rating: number;
  course?: string;
}) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 'min(380px, 85vw)',
        padding: '1.5rem',
        background: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-amber)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Stars */}
      <div style={{ marginBottom: '0.75rem' }}>
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} style={{ color: 'var(--color-amber)', fontSize: '0.85rem' }}>
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          margin: '0 0 1.25rem 0',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1rem',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-amber), var(--color-amber-dark))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#0a0a0a',
            flexShrink: 0,
          }}
        >
          {name[0]}
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {name}
          </div>
          {(role || course) && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
              }}
            >
              {[role, course].filter(Boolean).join(' • ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
