'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function TermsOfServicePage() {
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
            <div className="section-label" style={{ marginBottom: '1rem' }}>Legal Agreement</div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                marginBottom: '1rem',
                color: 'var(--color-text-primary)'
              }}
            >
              Terms of Service
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
              Effective Date: June 1, 2026 &nbsp;·&nbsp; Last Updated: June 1, 2026 &nbsp;·&nbsp; Governing Jurisdiction: Nepal
            </p>

            <div className="legal-content" style={{ fontSize: '0.98rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
              <p>
                Welcome to ZYAMARU Films Academy. By accessing our website at <span style={{ color: 'var(--color-amber)' }}>zyamarufilms.com.np</span>, enrolling in any course, or using any of our services, you agree to be bound by these Terms of Service. Please read them carefully before proceeding.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                These Terms apply to all visitors, students, and anyone who interacts with ZYAMARU&apos;s website, courses, or services. If you do not agree with any part of these Terms, please do not use our website or enroll in our programs.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                1. About ZYAMARU Films Academy
              </h2>
              <p>
                ZYAMARU Films Academy is a cinematography and filmmaking education institution based in Kathmandu, Nepal. We offer professional short courses in cinematography, documentary filmmaking, drone filmmaking, color grading, and visual storytelling. Our programs are delivered in-person at our Kathmandu campus, with select modules available in hybrid or online formats.
              </p>
              <p>
                ZYAMARU is operated by Zyamaru Films and its associated instructors and staff. References to &quot;ZYAMARU&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; throughout these Terms refer to this entity.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                2. Eligibility
              </h2>
              <p>To enroll in any ZYAMARU course or use our services, you must:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Be at least 16 years of age</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Provide accurate and truthful information during enrollment</li>
                <li>Agree to abide by these Terms of Service in full</li>
              </ul>
              <p>
                Students under 18 years of age must have written consent from a parent or legal guardian. By enrolling on behalf of a minor, the parent or guardian agrees to these Terms on the student&apos;s behalf.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                3. Courses and Enrollment
              </h2>
              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                3.1 Course Offerings
              </h3>
              <p>ZYAMARU currently offers the following programs, subject to availability and scheduling:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Cinematic Masterclass: The Fundamentals (Beginner)</li>
                <li>Cinematic Masterclass: Advanced Visual Storytelling</li>
                <li>Documentary Filmmaking: Telling Nepal&apos;s Stories</li>
                <li>Advanced Color Grading &amp; Visual Effects</li>
                <li>Drone Cinematography &amp; Aerial Storytelling</li>
              </ul>
              <p>
                Course content, instructors, schedules, fees, and availability are subject to change. ZYAMARU reserves the right to update, modify, cancel, or postpone courses at any time.
              </p>

              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                3.2 Enrollment
              </h3>
              <p>
                Enrollment is confirmed only upon full payment of the applicable course fee (or completion of an approved installment arrangement) and receipt of a confirmation from ZYAMARU. Seats are allocated on a first-come, first-confirmed basis and are limited per batch to maintain quality.
              </p>

              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                3.3 Course Access
              </h3>
              <p>
                Course materials may not be shared, sold, distributed, recorded, or reproduced without prior written consent from ZYAMARU. Where &quot;Lifetime Access&quot; is offered, this refers to access to the course materials as long as ZYAMARU continues to operate that course.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                4. Fees and Payment
              </h2>
              <p>
                Course fees are displayed in Nepali Rupees (NPR) on the ZYAMARU website and are subject to change. Fees cover access to sessions, course materials, and equipment use during scheduled hours.
              </p>
              <p>
                All fees quoted are inclusive of applicable taxes as required under Nepali law. ZYAMARU will issue appropriate receipts upon request.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                5. Refund and Cancellation Policy
              </h2>
              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                5.1 Student Cancellations
              </h3>
              <p>If you wish to cancel your enrollment, the following policy applies:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li><strong>Cancellation 7 or more days before start:</strong> Full refund, minus a processing fee of NPR 500 or 5% of the course fee (whichever is greater)</li>
                <li><strong>Cancellation 3 to 6 days before start:</strong> 50% refund, or full credit transferable to a future batch</li>
                <li><strong>Cancellation less than 3 days before start:</strong> No refund. A one-time deferral may be granted at ZYAMARU&apos;s discretion</li>
              </ul>

              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                5.2 ZYAMARU Cancellations
              </h3>
              <p>
                If ZYAMARU cancels a batch before it begins, enrolled students will receive a full refund of fees paid, or the option to transfer to the next available batch at no additional cost. ZYAMARU is not liable for any additional costs incurred by students (such as travel or accommodation).
              </p>

              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                5.3 No Refund After Course Start
              </h3>
              <p>
                Once a course has commenced, no refunds will be issued except in exceptional circumstances at ZYAMARU&apos;s sole discretion (for example, a documented medical emergency).
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                6. Student Conduct
              </h2>
              <p>All students are expected to conduct themselves with professionalism, respect, and integrity. You agree to:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Treat instructors, staff, fellow students, and subjects with respect</li>
                <li>Handle all academy equipment with care and report any damage promptly</li>
                <li>Comply with all laws, including Nepal aviation regulations when operating drones</li>
                <li>Not record, photograph, or distribute content from sessions without prior written permission</li>
              </ul>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                7. Intellectual Property
              </h2>
              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                7.1 ZYAMARU Content
              </h3>
              <p>
                All content on the ZYAMARU website and in course materials is the intellectual property of ZYAMARU Films Academy. Unauthorized reproduction or commercial use is strictly prohibited.
              </p>

              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                7.2 Student Work
              </h3>
              <p>
                Students retain ownership of original creative work they produce. However, students grant ZYAMARU a non-exclusive, royalty-free, perpetual license to use, display, and promote student work for educational and marketing purposes, with appropriate creator credit.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                8. Equipment and Facilities
              </h2>
              <p>
                Students may be held financially liable for damage to ZYAMARU equipment caused by negligence or misuse. ZYAMARU is not responsible for personal belongings brought to academy premises.
              </p>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                9. Drone Course — Additional Terms
              </h2>
              <p>Students enrolling in the Drone Cinematography course agree to the following conditions:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>You will operate drones only in authorized areas and comply with CAAN regulations at all times</li>
                <li>You acknowledge that commercial drone operations in Nepal require independent licensing through CAAN, which our course does not confer</li>
                <li>You accept personal responsibility for safe and lawful drone operation during and after the course</li>
              </ul>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
                10. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of Nepal. Any unresolved disputes arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts of Kathmandu, Nepal.
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
