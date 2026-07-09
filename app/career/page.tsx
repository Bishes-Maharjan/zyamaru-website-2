'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OPEN_POSITIONS } from './position';

// ── Validation ───────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()]{7,15}$/;
const URL_RE = /^https?:\/\/.+/;

type CareerForm = {
  name: string;
  email: string;
  phone: string;
  positionId: string;
  portfolioUrl: string;
  description: string;
  cvBase64: string;
  cvFileName: string;
};

type CareerErrors = Partial<Record<keyof CareerForm, string>>;

function validate(d: CareerForm): CareerErrors {
  const e: CareerErrors = {};
  if (!d.name.trim())                       e.name = 'Full name is required.';
  if (!d.email.trim())                      e.email = 'Email address is required.';
  else if (!EMAIL_RE.test(d.email))         e.email = 'Enter a valid email address.';
  if (!d.phone.trim())                      e.phone = 'Phone number is required.';
  else if (!PHONE_RE.test(d.phone))         e.phone = 'Enter a valid phone number.';
  if (!d.positionId)                        e.positionId = 'Please select a position.';
  if (d.portfolioUrl && !URL_RE.test(d.portfolioUrl)) e.portfolioUrl = 'Enter a valid URL starting with https://';
  if (!d.description.trim())               e.description = 'Cover letter is required.';
  if (!d.cvBase64)                          e.cvBase64 = 'Please upload your CV (PDF, max 2.5MB).';
  return e;
}

// Full structured position dataset matching your provided text copy
const POSITION_DETAILS = [
    {
        id: 'cinematography',
        title: 'Cinematography Instructor — Fundamentals',
        meta: 'Part-Time / Contract  ·  Academic  ·  Kathmandu (On-Site)',
        summary: 'We are seeking an experienced cinematographer and educator to lead our Cinematic Masterclass: The Fundamentals — our entry-level course for students with no prior camera experience. This is a high-impact role: the Fundamentals course is the starting point for most ZYAMARU students, and the quality of instruction here shapes everything that follows.',
        duties: [
            'Deliver in-person sessions covering camera operation, the exposure triangle, composition, basic lighting, and introductory video production — typically 2 to 3 sessions per week during a batch',
            'Develop and refine lesson plans, practical exercises, and hands-on shooting assignments in collaboration with the ZYAMARU academic team',
            'Provide individual feedback on student work, assessing both technical execution and creative development',
            'Support students in developing their end-of-course portfolio projects',
            'Maintain and report on student progress throughout the batch'
        ],
        requirements: [
            'Minimum 3 years of active professional work as a cinematographer, videographer, or director of photography',
            'Demonstrated ability to explain complex technical concepts clearly to students with no prior background — patience and communication skills are as important as technical expertise',
            'Strong portfolio demonstrating professional-quality cinematography work',
            'Experience teaching, mentoring, or coaching is advantageous but not required — we value genuine practitioners',
            'Proficiency with DSLR, mirrorless, and/or cinema camera systems',
            'Fluency in Nepali; English proficiency is an advantage'
        ]
    },
    {
        id: 'documentary',
        title: 'Documentary Filmmaking Instructor',
        meta: 'Part-Time / Contract  ·  Academic  ·  Kathmandu (On-Site)',
        summary: 'ZYAMARU is seeking a working documentary filmmaker to lead our Documentary Filmmaking: Telling Nepal\'s Stories course. This course takes students through the full documentary production process — from story development and subject access, through production and field recording, to editing and delivery.',
        duties: [
            'Lead in-person instruction across the full documentary workflow: development, pre-production, production, post-production, and ethics',
            'Supervise student documentary projects from concept through final cut, providing editorial and production feedback at each stage',
            'Design and facilitate interview technique sessions, field production exercises, and editing workshops',
            'Address the ethical dimensions of documentary work — consent, representation, responsibility — as a core part of the curriculum',
            'Help connect students with potential documentary subjects and locations in and around Kathmandu'
        ],
        requirements: [
            'A working documentary filmmaker with at least one completed documentary film that has been screened, broadcast, or otherwise publicly exhibited',
            'Strong grasp of documentary story structure, interview technique, and observational filmmaking',
            'Familiarity with field audio recording and basic editing workflows',
            'A thoughtful, considered approach to the ethics of documentary filmmaking, particularly in Nepali cultural contexts',
            'Fluency in Nepali; ability to communicate in English is an advantage'
        ]
    },
    {
        id: 'drone',
        title: 'Drone Cinematography Instructor',
        meta: 'Part-Time / Contract  ·  Academic  ·  Kathmandu (On-Site + Field)',
        summary: 'We are looking for a certified, professional drone operator and cinematographer to lead our Drone Cinematography & Aerial Storytelling course. This role combines technical drone instruction with cinematic education — you are not just teaching people to fly, you are teaching them to see from the air.',
        duties: [
            'Teach theoretical and practical drone operation from beginner level, including pre-flight checks, safe operating procedures, and emergency response',
            'Deliver in-depth instruction on CAAN regulations, restricted airspace in Nepal, and the process for obtaining commercial flight permits',
            'Lead outdoor supervised flight sessions in appropriate locations in and around Kathmandu',
            'Teach aerial cinematography principles — movement vocabulary, camera settings, ND filter usage, and cinematic composition from altitude',
            'Guide students in the production of a professional aerial showreel as their final course project'
        ],
        requirements: [
            'Active CAAN drone operator certification (or equivalent demonstrable compliance with Nepali aviation regulations)',
            'Minimum 2 years of professional commercial drone operation experience',
            'Strong portfolio of professional aerial cinematography work',
            'Thorough, up-to-date knowledge of Nepal drone laws and restricted zone mapping',
            'Excellent safety awareness and the ability to communicate safety principles clearly and consistently'
        ]
    },
    {
        id: 'color-grading',
        title: 'Color Grading Instructor',
        meta: 'Part-Time / Contract  ·  Academic  ·  Kathmandu (On-Site)',
        summary: 'ZYAMARU is seeking an experienced colorist to lead our Advanced Color Grading & Visual Effects course. This is a specialist role for someone who grades professionally — for film, commercial, or broadcast projects. DaVinci Resolve proficiency is essential.',
        duties: [
            'Deliver comprehensive instruction in DaVinci Resolve, covering the full grading workflow from node setup through final delivery',
            'Teach color science fundamentals: color spaces, gamma curves, LOG footage, and LUT application',
            'Lead practical grading sessions using real footage from ZYAMARU productions and student projects',
            'Guide students through primary and secondary corrections, skin tone management, shot matching, and developing a distinctive visual look',
            'Introduce students to delivery specifications for different output formats — broadcast, digital cinema, and social media'
        ],
        requirements: [
            'Working colorist with a professional grading portfolio demonstrating high-quality work across narrative film, commercial, music video, or documentary layouts',
            'Expert-level proficiency in DaVinci Resolve',
            'Clear understanding of color science, color managed workflows, and LOG/RAW footage handling',
            'Ability to break down complex technical concepts into clear, teachable steps'
        ]
    },
    {
        id: 'admissions',
        title: 'Admissions & Student Coordinator',
        meta: 'Full-Time  ·  Operations  ·  Kathmandu (On-Site)',
        summary: 'We are looking for a warm, organized, and proactive individual to serve as the first point of contact for prospective and enrolled students at ZYAMARU. This is a student-facing role that combines admissions support, enrollment administration, and ongoing student experience management.',
        duties: [
            'Respond to all admissions enquiries — via email, WhatsApp, social media, and in-person visits — in a timely, professional, and welcoming manner',
            'Guide prospective students through the enrollment process, helping them select the right course and batch for their goals and availability',
            'Manage the enrollment database and student records, ensuring accuracy and confidentiality',
            'Coordinate course logistics: scheduling, batch communication, equipment allocation, and room preparation',
            'Collect and process course fees, issue receipts, and manage installment arrangements',
            'Act as a point of contact for enrolled students throughout their course — answering questions, resolving concerns, and ensuring a positive experience'
        ],
        requirements: [
            'Excellent interpersonal and communication skills — you genuinely enjoy helping people and do it well',
            'Strong organizational skills and the ability to manage multiple tasks and deadlines seamlessly',
            'Proficiency in Nepali (spoken and written) and a good working level of English',
            'Comfort with basic digital tools — email, spreadsheets, messaging platforms',
            'An interest in film, media, or creative education is a genuine advantage',
            'Minimum +2 completed; a degree in any field is an advantage but not required'
        ]
    },
    {
        id: 'marketing',
        title: 'Digital Marketing & Content Coordinator',
        meta: 'Full-Time  ·  Marketing  ·  Kathmandu (Hybrid)',
        summary: 'ZYAMARU is seeking a creative and data-informed Digital Marketing & Content Coordinator to manage our online presence and grow our reach across digital channels. You will work closely with our instructors, students, and management team to create content that reflects the quality and spirit of ZYAMARU.',
        duties: [
            'Manage and grow ZYAMARU\'s presence on Instagram, Facebook, YouTube, and other relevant platforms',
            'Plan, produce, and publish content — including behind-the-scenes footage, student highlights, educational reels, and promotional material',
            'Write and publish blog posts, email newsletters, and website copy that serve both SEO goals and audience value',
            'Run and optimize paid digital advertising campaigns (Meta Ads, Google Ads) to drive enrollment enquiries',
            'Monitor analytics across platforms and provide regular performance reports with actionable recommendations'
        ],
        requirements: [
            '2+ years of experience managing social media, content creation, or digital marketing professionally or via advanced custom projects',
            'Strong writing skills in both Nepali and English',
            'An eye for visual quality — this is a filmmaking academy and our content must reflect that standard',
            'Working knowledge of Meta Business Suite, Google Analytics, and basic video/photo editing workflows',
            'Understanding of SEO principles and content strategy'
        ]
    }
];

const VALUES = [
    { title: 'Craft Above All', desc: 'We believe that genuine skill — not just enthusiasm — is what serves students best. We hold ourselves and our instructors to the highest professional standard because our students deserve nothing less.' },
    { title: 'Nepal as a Canvas', desc: 'We are deeply rooted in Nepal — its landscapes, cultures, stories, and communities. We believe the Nepali perspective has enormous value in global cinema, and everything we teach is informed by that belief.' },
    { title: 'Education as Empowerment', desc: 'We do not teach people to pass exams. We teach people to go out and create work that matters. Practical, hands-on learning that builds real-world capability is at the center of everything we do.' },
    { title: 'Respect and Inclusion', desc: 'We are committed to creating an environment where people of every background, identity, and experience level feel genuinely welcome — as students, as staff, and as collaborators.' },
    { title: 'Continuous Growth', desc: 'The film industry evolves constantly. So do we. We expect every member of the ZYAMARU team to keep learning, keep shooting, and keep pushing the quality of what we offer.' }
];

const BENEFITS = [
    'Work at the intersection of filmmaking and education — two fields that are both deeply meaningful and genuinely exciting',
    'Be part of a team that is building something from the ground up in Nepal\'s growing creative industry',
    'Access to professional filmmaking equipment, facilities, and ongoing professional development options',
    'Collaborative, creative work environment with a team that takes quality seriously',
    'Competitive compensation benchmarked to industry standards in Nepal',
    'Flexible working arrangements where the specific operational role allows',
    'The opportunity to directly impact the careers of the next generation of Nepali filmmakers'
];

export default function CareerPage() {
    const [activeJob, setActiveJob] = useState<string | null>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const emptyForm: CareerForm = {
        name: '', email: '', phone: '', positionId: '',
        portfolioUrl: '', description: '', cvBase64: '', cvFileName: ''
    };
    const [formData, setFormData] = useState<CareerForm>(emptyForm);
    const [errors, setErrors] = useState<CareerErrors>({});
    const [touched, setTouched] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Strict 2.5MB safety check for serverless limits
        if (file.size > 2.5 * 1024 * 1024) {
            alert("File is too large. Please upload a CV under 2.5MB.");
            e.target.value = ""; // reset input
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            // Splits the "data:application/pdf;base64," prefix out, leaving just the raw base64 data
            const base64String = (reader.result as string).split(',')[1];
            setFormData(prev => ({
                ...prev,
                cvBase64: base64String,
                cvFileName: file.name
            }));
        };
        reader.readAsDataURL(file);
    };
    const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

    const handleApplyClick = (id: string) => {
        setFormData((prev) => ({ ...prev, positionId: id }));
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);
        const errs = validate(formData);
        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            setStatus({ type: 'error', message: 'Please fix the highlighted fields before submitting.' });
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        setStatus({ type: 'loading', message: 'Submitting your application profile...' });

        try {
            const res = await fetch('/api/career', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus({ type: 'success', message: 'Application sent successfully! Our team will get back to you within 7 working days.' });
                setFormData(emptyForm);
                setErrors({});
                setTouched(false);
            } else {
                const data = await res.json();
                setStatus({ type: 'error', message: data.error || 'Submission failed.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'Failed to connect to the server routing pipeline.' });
        }
    };

    // Helper: update field and live-clear its error
    const setField = (field: keyof CareerForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const next = { ...formData, [field]: e.target.value };
        setFormData(next);
        if (touched && errors[field]) {
            const newErrs = validate(next);
            setErrors(prev => ({ ...prev, [field]: newErrs[field] }));
        }
    };

    return (
        <main style={{ background: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-text-primary)' }}>
            {/* Structural Offset Clearing Fixed Navbar Framework */}
            <div style={{ height: '140px' }} className="nav-spacer" />

            {/* Hero Section */}
            <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
                <div className="section-label" style={{ color: 'var(--color-amber)', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
                    Careers at ZYAMARU
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                    Building the Future of <br />
                    <span style={{ color: 'var(--color-amber)' }}>Filmmaking Education</span> in Nepal
                </h1>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', textAlign: 'justify', marginBottom: '2.5rem' }}>
                    ZYAMARU is not just a school. It is a movement — a deliberate effort to build a generation of Nepali filmmakers capable of telling their own stories with the craft, confidence, and vision that the world deserves to see. Every person on our team plays a direct role in that mission. If you want to contribute to creative execution and visual media education, we want to hear from you.
                </p>

                {/* New Direct Action Button Block */}
                <button
                    onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="btn-primary"
                    style={{ padding: '1rem 2.5rem', fontSize: '0.95rem', fontWeight: 600 }}
                >
                    <span>Apply For Positions</span>
                </button>
            </section>

            {/* Values & Culture */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }} className="responsive-grid">
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-amber)' }}>Our Core Values</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            These are not statements on a wall. They are how we make decisions, run classes, and treat each other daily.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {VALUES.map((val) => (
                            <div key={val.title} style={{ paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-amber)' }}>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{val.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Perks / Benefits */}
            <section style={{ background: 'var(--color-bg-card)', padding: '5rem 2rem', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center' }}>
                        Why Work at <span style={{ color: 'var(--color-amber)' }}>ZYAMARU</span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="responsive-grid-two">
                        {BENEFITS.map((b, idx) => (
                            <div key={idx} style={{ background: 'var(--color-bg)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <span style={{ color: 'var(--color-amber)', fontWeight: 'bold' }}>✓</span>
                                <span style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{b}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Openings Accordion Roster */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '1rem', textAlign: 'center' }}>Current Openings</h2>
                <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '3rem', fontSize: '0.95rem' }}>
                    Select an active position tracking block below to review full task duties and background execution parameters.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {POSITION_DETAILS.map((job) => {
                        const isOpen = activeJob === job.id;
                        return (
                            <div key={job.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: isOpen ? 'var(--color-bg-card)' : 'transparent', overflow: 'hidden', transition: 'background 0.3s ease' }}>
                                <button onClick={() => setActiveJob(isOpen ? null : job.id)} style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}>
                                    <div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: isOpen ? 'var(--color-amber)' : 'inherit' }}>{job.title}</h3>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', letterSpacing: '0.05em' }}>{job.meta}</div>
                                    </div>
                                    <span style={{ fontSize: '1.5rem', color: 'var(--color-amber)' }}>{isOpen ? '−' : '+'}</span>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                                            <div style={{ padding: '0 2rem 2rem 2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                                                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>{job.summary}</p>

                                                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>What You Will Do</h4>
                                                <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {job.duties.map((d, i) => <li key={i} style={{ lineHeight: 1.5 }}>{d}</li>)}
                                                </ul>

                                                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>What We Are Looking For</h4>
                                                <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {job.requirements.map((r, i) => <li key={i} style={{ lineHeight: 1.5 }}>{r}</li>)}
                                                </ul>

                                                <button onClick={() => handleApplyClick(job.id)} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>
                                                    <span>Apply For This Position</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Shared Active Speculative Application Info block Container */}
            <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem 4rem 2rem', textAlign: 'center' }}>
                <div style={{ border: '1px dashed var(--color-border-amber, var(--color-border))', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Don't See Your Role Listed?</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                        ZYAMARU is growing constantly. If you are an editor, gaffer, director, or administrative professional who wants to contribute value to our framework ecosystem, select <strong>Speculative Application</strong> in the workspace module interface below to register your profile.
                    </p>
                </div>
            </section>

            {/* Submission Core Form Interface Container Section */}
            <section ref={formRef} id="apply-form" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }} className="responsive-grid">
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Interested? <br /><span style={{ color: 'var(--color-amber)' }}>Send Us a Mail</span></h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '1rem' }}>
                            Complete the profile intake fields cleanly. Your application parameters will process directly into our operational Resend communications pipeline channels.
                        </p>
                        <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div>• Max CV Size Requirement: 2 Pages</div>
                            <div>• Response Review Lifecycle: 7 Business Days</div>
                        </div>
                    </div>

                    <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-split-row">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name *</label>
                                    <input type="text" value={formData.name} onChange={setField('name')} autoComplete="name" className={`input-field${errors.name ? ' error' : ''}`} />
                                    {errors.name && <span style={{ fontSize: '0.75rem', color: '#e05252', marginTop: '0.25rem', display: 'block' }}>⚠ {errors.name}</span>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address *</label>
                                    <input type="email" inputMode="email" value={formData.email} onChange={setField('email')} autoComplete="email" className={`input-field${errors.email ? ' error' : ''}`} />
                                    {errors.email && <span style={{ fontSize: '0.75rem', color: '#e05252', marginTop: '0.25rem', display: 'block' }}>⚠ {errors.email}</span>}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-split-row">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Phone Number *</label>
                                    <input type="tel" inputMode="tel" value={formData.phone} onChange={setField('phone')} autoComplete="tel" className={`input-field${errors.phone ? ' error' : ''}`} />
                                    {errors.phone && <span style={{ fontSize: '0.75rem', color: '#e05252', marginTop: '0.25rem', display: 'block' }}>⚠ {errors.phone}</span>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Target Position *</label>
                                    <select value={formData.positionId} onChange={setField('positionId')} className={`input-field${errors.positionId ? ' error' : ''}`} style={{ height: '50px' }}>
                                        <option value="">-- Choose Position --</option>
                                        {OPEN_POSITIONS.map((pos) => <option key={pos.id} value={pos.id}>{pos.label}</option>)}
                                    </select>
                                    {errors.positionId && <span style={{ fontSize: '0.75rem', color: '#e05252', marginTop: '0.25rem', display: 'block' }}>⚠ {errors.positionId}</span>}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Work Showcase / Portfolio URL</label>
                                <input type="url" inputMode="url" placeholder="https://youtube.com/.." value={formData.portfolioUrl} onChange={setField('portfolioUrl')} className={`input-field${errors.portfolioUrl ? ' error' : ''}`} />
                                {errors.portfolioUrl && <span style={{ fontSize: '0.75rem', color: '#e05252', marginTop: '0.25rem', display: 'block' }}>⚠ {errors.portfolioUrl}</span>}
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Cover Letter &amp; Experience Summary *</label>
                                <textarea rows={5} placeholder="Introduce yourself, your availability, and why you want to build visual capabilities with ZYAMARU..." value={formData.description} onChange={setField('description')} className={`input-field${errors.description ? ' error' : ''}`} style={{ resize: 'vertical' }} />
                                {errors.description && <span style={{ fontSize: '0.75rem', color: '#e05252', marginTop: '0.25rem', display: 'block' }}>⚠ {errors.description}</span>}
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Upload CV / Resume (PDF only, Max 2.5MB) *
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className={`input-field${errors.cvBase64 ? ' error' : ''}`}
                                    style={{ padding: '0.5rem' }}
                                />
                                {errors.cvBase64 && <span style={{ fontSize: '0.75rem', color: '#e05252', marginTop: '0.25rem', display: 'block' }}>⚠ {errors.cvBase64}</span>}
                            </div>

                            {status.message && (
                                <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', background: status.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: status.type === 'error' ? '#f87171' : '#34d399', border: `1px solid ${status.type === 'error' ? '#ef4444' : '#10b981'}` }}>
                                    {status.message}
                                </div>
                            )}

                            <button type="submit" className="btn-primary" disabled={status.type === 'loading'} style={{ alignSelf: 'flex-start', opacity: status.type === 'loading' ? 0.7 : 1 }}>
                                <span>{status.type === 'loading' ? 'Sending Application...' : 'Submit Application'}</span>
                            </button>

                        </form>
                    </div>
                </div>
            </section>

        </main>
    );
}