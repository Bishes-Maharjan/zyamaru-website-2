'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <main
        style={{
          paddingTop: '8rem',
          paddingBottom: '6rem',
          paddingLeft: 'var(--section-padding-x)',
          paddingRight: 'var(--section-padding-x)',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            border: '1px solid var(--color-border-amber)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(1.5rem, 5vw, 4.5rem)',
            background: 'rgba(212, 168, 83, 0.01)',
            position: 'relative',
          }}
        >
          {/* Corner accents */}
          <div style={{ position: 'absolute', top: '-1px', left: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '-1px', right: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '2rem', width: '4rem', height: '2px', background: 'var(--color-amber)', opacity: 0.6 }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label" style={{ marginBottom: '1rem' }}>Legal Policy</div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                marginBottom: '1rem',
                color: 'var(--color-text-primary)'
              }}
            >
              Privacy Policy
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
              Effective Date: June 1, 2026 &nbsp;·&nbsp; Last Updated: June 1, 2026 &nbsp;·&nbsp; Governing Jurisdiction: Nepal
            </p>

            <div className="legal-content" style={{ fontSize: '0.98rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
              <p>
                ZYAMARU Films Academy (&quot;ZYAMARU&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy of everyone who visits our website, enrolls in our courses, or interacts with us. This Privacy Policy explains what personal information we collect, how we use it, how we protect it, and your rights in relation to it.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                By using our website at <span style={{ color: 'var(--color-amber)' }}>zyamaru-website-2.vercel.app</span> or enrolling in any ZYAMARU program, you consent to the practices described in this Privacy Policy. If you do not agree, please do not use our website or services.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                1. Who We Are
              </h2>
              <p>
                ZYAMARU Films Academy is a filmmaking and visual media education institution based in Kathmandu, Nepal. We offer courses in cinematography, documentary filmmaking, drone filmmaking, and color grading. ZYAMARU is the data controller responsible for personal information collected through our website and services.
              </p>
              <p>
                Contact for privacy matters: <a href="mailto:info@zyamarufilms.com.np" style={{ color: 'var(--color-amber)', textDecoration: 'none' }}>info@zyamarufilms.com.np</a>
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                2. What Information We Collect
              </h2>
              
              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                2.1 Information You Provide Directly
              </h3>
              <p>We collect information you voluntarily give us, including:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Full name and contact details (email address, phone number / WhatsApp number)</li>
                <li>Enrollment information: course selected, batch preference, and payment details</li>
                <li>Age or date of birth (to verify eligibility)</li>
                <li>Parental or guardian information (for students under 18)</li>
                <li>Correspondence: messages sent via our contact form, email, or social media</li>
                <li>Newsletter signup: your email address if you subscribe to updates</li>
                <li>Consultation requests: any information shared when booking a free consultation</li>
                <li>Feedback, reviews, or testimonials you choose to share</li>
              </ul>

              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                2.2 Information Collected Automatically
              </h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Device and browser information (type, operating system, browser version)</li>
                <li>IP address and approximate geographic location</li>
                <li>Pages visited, time spent on pages, and links clicked</li>
                <li>Referring website or source that brought you to our site</li>
                <li>Technical data about your connection and device settings</li>
              </ul>
              <p>
                This information is collected through standard web server logs and, where applicable, analytics tools. We do not use this data to identify individuals but to understand how our website is used and to improve it.
              </p>

              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                2.3 Cookies and Tracking Technologies
              </h3>
              <p>Our website may use cookies — small text files stored on your browser — and similar technologies to:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Maintain session state and remember your preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Enable social media sharing buttons and embedded content</li>
              </ul>
              <p>
                You can control or disable cookies through your browser settings. Note that disabling cookies may affect the functionality of some parts of our website.
              </p>

              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                2.4 Payment Information
              </h3>
              <p>
                ZYAMARU does not directly store or process credit/debit card details on our systems. Payment processing is handled by our payment service providers. We receive only confirmation of payment and basic transaction details. For details of how your payment information is handled, please refer to the privacy policy of the relevant payment processor.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                3. How We Use Your Information
              </h2>
              <p>We use the personal information we collect for the following purposes:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Enrollment and administration: processing your application, confirming your seat, sending course materials, and managing your student record</li>
                <li>Communication: responding to your enquiries, sending course-related updates, schedule changes, and important notices</li>
                <li>Payment processing: collecting and recording course fees and issuing receipts</li>
                <li>Course delivery: enabling instructors to support your learning progress</li>
                <li>Newsletter and marketing: sending you filmmaking tips, course news, and offers — but only if you have opted in to receive these</li>
                <li>Website improvement: analyzing how visitors use our website to improve content and user experience</li>
                <li>Legal compliance: maintaining records as required by Nepali law, tax regulations, and other applicable requirements</li>
                <li>Safety and security: detecting and preventing fraudulent or harmful activity</li>
              </ul>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                4. Legal Basis for Processing
              </h2>
              <p>We process your personal information on the following bases:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Contract: to fulfill our obligations to you as an enrolled student or website user</li>
                <li>Legitimate interest: to operate and improve our business, respond to enquiries, and prevent misuse</li>
                <li>Consent: for newsletter and marketing communications — you may withdraw consent at any time</li>
                <li>Legal obligation: where we are required by law to process or retain information</li>
              </ul>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                5. Sharing Your Information
              </h2>
              <p>ZYAMARU respects your privacy. We do not sell your personal information to third parties. We may share your information only in the following limited circumstances:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Instructors and staff: course instructors and administrative staff who need access to deliver your program</li>
                <li>Payment processors: to process course fee payments securely</li>
                <li>Service providers: third-party tools we use to operate our website and communications (such as email platforms or analytics providers), bound by confidentiality obligations</li>
                <li>Legal requirements: if required to comply with a legal obligation, court order, or lawful request from a government authority in Nepal</li>
                <li>Business transfer: in the unlikely event of a merger, acquisition, or sale of ZYAMARU&apos;s business, your information may be transferred to the successor entity, with notice provided to you</li>
              </ul>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                6. Student Work and Portfolio
              </h2>
              <p>As noted in our Terms of Service, ZYAMARU may wish to feature student work (films, photographs, projects) in our marketing materials, website, and social media. We will:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Always seek your consent before publicly featuring your work</li>
                <li>Credit you by name wherever practical</li>
                <li>Remove your work from our materials upon your written request</li>
              </ul>
              <p>
                Testimonials featured on our website are shared voluntarily by students. We will not publish your testimonial without your explicit permission.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                7. Data Retention
              </h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, including:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Student enrollment records: retained for a minimum of 5 years following course completion for legal and administrative purposes</li>
                <li>Financial records: retained as required by Nepali tax and accounting law (typically 5–7 years)</li>
                <li>Marketing data: retained until you unsubscribe or withdraw consent</li>
                <li>Website analytics data: typically retained for 12–24 months in aggregated or anonymized form</li>
              </ul>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                8. Data Security
              </h2>
              <p>
                ZYAMARU takes reasonable technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or disclosure. These include: secure storage of student records, HTTPS encryption on our site, and working only with trusted, secure payment processors.
              </p>
              <p>
                However, no data transmission over the internet or storage system can be guaranteed as 100% secure. By using our services, you accept this inherent risk. If you believe your data has been compromised, please contact us immediately at <a href="mailto:info@zyamarufilms.com.np" style={{ color: 'var(--color-amber)', textDecoration: 'none' }}>info@zyamarufilms.com.np</a>.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                9. Your Rights
              </h2>
              <p>You have the following rights in relation to your personal information held by ZYAMARU:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Access: request a copy of the personal data we hold about you</li>
                <li>Correction: request that inaccurate or incomplete data be corrected</li>
                <li>Deletion: request that we delete your personal data, subject to legal retention obligations</li>
                <li>Objection: object to the use of your data for marketing purposes at any time</li>
                <li>Withdrawal of consent: withdraw consent for newsletter or marketing communications at any time</li>
              </ul>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                10. Children&apos;s Privacy
              </h2>
              <p>
                ZYAMARU courses are open to students aged 16 and above. We do not knowingly collect personal information from children under the age of 16. Students aged 16 or 17 may enroll with parental or guardian consent, in which case we may collect limited information about the consenting parent or guardian.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                11. Governing Law & Disputes
              </h2>
              <p>
                This Privacy Policy is governed by and construed in accordance with the laws of Nepal. Any disputes relating to privacy matters shall be subject to the exclusive jurisdiction of the competent courts of Kathmandu, Nepal.
              </p>
            </div>

            <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
              <Link href="/" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.7rem 1.5rem' }}>
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
