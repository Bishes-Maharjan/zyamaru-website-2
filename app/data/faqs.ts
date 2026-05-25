export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: 'general' | 'courses' | 'cinematography' | 'specialized' | 'documentary' | 'career';
  label: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    label: 'General & Admissions',
    items: [
      {
        question: 'What is Zyamaru Films Academy?',
        answer: 'Zyamaru Films Academy is a dedicated filmmaking and visual media school based in Kathmandu, Nepal. We offer focused, short-format courses designed to take students from curious beginners to confident creators, and fast. Our curriculum is built around four pillars: Cinematography, Documentary Filmmaking, Drone Filmmaking, and Color Grading. Whether you want to tell stories, build a freelance career, or simply express yourself through the lens, Zyamaru is where that journey starts.'
      },
      {
        question: 'Where is Zyamaru Films Academy located?',
        answer: 'We are based in Tahachal, Kathmandu, Nepal. Our academy is easily accessible from major areas of the city. Exact address, directions, and nearest landmarks are available on our Contact page. We are now only on offline practical based so we are very sorry for your inconvenience those who want it online.'
      },
      {
        question: 'What makes Zyamaru Films Academy different from other film schools in Nepal?',
        answer: 'A few things set us apart:\n\n• **Focused, short courses:** We don\'t believe in years of theory before you get to shoot. You are behind a camera from day one.\n• **Spark interest quickly:** We believe short-term courses help people know their interest very quickly. It helps you recognize whether filmmaking and visual storytelling is really for you or not in a very short period of time, scratching your eagerness to see and live what you\'ve always thought of.\n• **Professional-grade equipment:** Students train on real cameras, drones, and color grading workstations.\n• **Nepal-rooted storytelling:** Our documentary and visual storytelling curriculum is deeply informed by the landscapes, cultures, and narratives of Nepal and the Himalayan region.\n• **Practical, active mentors:** Our instructors are active working filmmakers, not just academics.\n• **Small batch sizes:** We keep cohorts small so every student gets real, personal feedback.'
      },
      {
        question: 'Who teaches at Zyamaru Films Academy?',
        answer: 'All courses are taught by professional filmmakers and visual artists who are actively working in the industry: shooting documentaries, commercial productions, drone cinematography, and post-production. Our instructors bring real-world projects into the classroom, so you are always learning relevant, current craft rather than outdated techniques.'
      },
      {
        question: 'Is Zyamaru Films Academy accredited or certified?',
        answer: 'Zyamaru Films Academy issues its own course completion certificates recognized within the Nepali film and media industry. Our certificates are valued by production companies, media houses, and agencies across Nepal. That said, in the creative industry, your portfolio speaks louder than any certificate. We work hard to ensure every graduate leaves with work they are proud to show.'
      },
      {
        question: 'Who can apply to Zyamaru Films Academy?',
        answer: 'Anyone with a genuine interest in filmmaking, photography, or visual storytelling is welcome to apply. We have no formal academic requirements. Our students include:\n\n• School and college students (16 and above)\n• Working professionals looking to change careers or add a skill set\n• Freelancers and content creators wanting to level up\n• Journalists, NGO workers, and social documentarians\n• Business owners wanting to produce their own video content\n• Passionate hobbyists who want to make their art more cinematic'
      },
      {
        question: 'How do I apply or enroll?',
        answer: 'Enrolling is straightforward:\n\n1. Browse the course you are interested in and check the current batch dates.\n2. Submit the online enrollment form (or visit us in person in our Tahachal office in Kathmandu).\n3. Our admissions team will contact you within 48 hours to confirm your seat.\n4. Complete your enrollment by paying the course fee (installment options available).\n\nSeats in each batch are limited intentionally to maintain quality. We strongly recommend applying early once a batch date is announced.'
      },
      {
        question: 'Is there an age requirement?',
        answer: 'Students must be 16 years of age or older to enroll independently. Students under 18 require parental or guardian consent at enrollment. We welcome learners of all ages. We have had students in their 50s and 60s who discovered their passion for filmmaking later in life, and they thrive just as well as younger students.'
      },
      {
        question: 'Are students from outside Kathmandu or outside Nepal welcome?',
        answer: 'Absolutely. We welcome students from across Nepal only. Kathmandu is easily accessible from most of the country, and we are happy to assist visiting students with guidance on accommodation options near the academy.'
      },
      {
        question: 'I still have questions. How can I contact Zyamaru Films Academy?',
        answer: 'We would love to hear from you. Reach us through:\n\n• **Website:** Contact form on our Contact page\n• **Email:** zyamarufilms31@gmail.com\n• **Phone / WhatsApp:** Listed on the Contact page\n• **In Person:** Visit our academy in Tahachal, Kathmandu during office hours\n• **Social Media:** Find us on Instagram, Facebook, and YouTube under Zyamaru Films Academy\n\nOur admissions team typically responds within one business day. No question is too small. We want you to feel completely confident before you enroll.'
      }
    ]
  },
  {
    id: 'courses',
    label: 'Course Overview',
    items: [
      {
        question: 'What courses does Zyamaru Films Academy offer?',
        answer: 'We currently offer five core programs:\n\n• **Fundamentals of Photography & Cinematography:** The starting point for anyone new to cameras and visual storytelling.\n• **Advanced Cinematography & Visual Storytelling:** Deep craft, cinematic language, and directing the camera.\n• **Documentary Filmmaking:** Research, field production, interviews, and editing real-world stories.\n• **Drone Filmmaking:** Legal flying, cinematic movement, and aerial cinematography techniques.\n• **Color Grading:** Color science, grading workflows, and creating a cinematic look in DaVinci Resolve.\n\nCourses can be taken individually or as a combined pathway. Ask us about bundled program pricing.'
      },
      {
        question: 'Are these full-time or part-time programs?',
        answer: 'All our courses are designed as short, intensive programs, making them ideal whether you are a full-time student, a working professional, or a freelancer looking to upgrade skills. We offer both weekday and weekend batches. Specific timetables vary per course and batch intake. Check our current schedule or contact our admissions team for the latest options.'
      },
      {
        question: 'In what language are the courses taught?',
        answer: 'Courses are primarily taught in Nepali, with all technical terminology also explained in English. Most professional software, equipment manuals, and industry resources are in English, so familiarity with technical English terms is important. International students or those comfortable with English-only instruction can discuss their preference during enrollment.'
      },
      {
        question: 'Do I need my own camera or equipment?',
        answer: 'Equipment is provided. All students have access to the academy\'s professional cameras, lenses, drones, lighting gear, and color grading workstations during classes and scheduled practice sessions. If you already own equipment, you are absolutely welcome to use it and we will help you get the most out of what you have.'
      },
      {
        question: 'Can I take multiple courses at the same time?',
        answer: 'Yes, with some planning. We recommend completing the Fundamentals course before jumping into Advanced Cinematography, but courses like Color Grading and Drone Filmmaking can be taken alongside others. Speak with our advisors and they will help you build a sequence that matches your goals and availability.'
      },
      {
        question: 'How long does each course take?',
        answer: 'All our programs are designed as focused, short courses:\n\n• **Fundamentals of Photography & Cinematography:** approx. 1–2 weeks\n• **Advanced Cinematography & Visual Storytelling:** approx. 3–4 weeks\n• **Documentary Filmmaking:** approx. 6–8 weeks\n• **Drone Filmmaking:** approx. 2–3 weeks\n• **Color Grading:** approx. 3–4 weeks\n\nExact durations depend on the batch schedule (weekday vs. weekend). Contact us for current timetables.'
      },
      {
        question: 'When do new batches start?',
        answer: 'New batches start multiple times throughout the year. We run both weekday morning/evening batches and weekend-only batches to accommodate different schedules. Check our website\'s Courses page or contact us directly to see the next available batch start dates. Signing up for our newsletter is the best way to be notified first when new batches open.'
      }
    ]
  },
  {
    id: 'cinematography',
    label: 'Cinematography',
    items: [
      {
        question: 'What is the difference between the Fundamentals course and the Advanced Cinematography course?',
        answer: 'These are two distinct, sequential programs.\n\n**Fundamentals of Photography & Cinematography:** Built for absolute beginners. You will learn how cameras work (aperture, shutter speed, ISO), light basics, composition rules, exposure, and how to shoot simple scenes with confidence. Think of this as building the visual vocabulary and technical muscle memory you need before everything else.\n\n**Advanced Cinematography & Visual Storytelling:** Designed for those who already have a camera foundation. This course dives into cinematic language, shot design, camera movement, working with actors and subjects, lighting for mood, and how to craft a visual narrative from script to screen.'
      },
      {
        question: 'What will I learn in the Fundamentals of Photography & Cinematography course?',
        answer: 'The Fundamentals course covers:\n\n• Understanding your camera: DSLR, mirrorless, and cinema camera basics\n• Exposure triangle: aperture, shutter speed, and ISO in practice\n• Composition principles: rule of thirds, leading lines, framing, and depth\n• Natural and artificial lighting fundamentals\n• Focus, depth of field, and lens selection basics\n• Introduction to video modes, frame rates, and recording formats\n• Basic shot types and camera angles used in film and photography\n• Hands-on shooting exercises and end-of-course photo/video portfolio project'
      },
      {
        question: 'What will I learn in the Advanced Cinematography & Visual Storytelling course?',
        answer: 'The Advanced course takes your craft to a professional level:\n\n• Cinematic shot design: grammar of cinema, scene coverage, and shot lists\n• Advanced lighting setups: three-point, Rembrandt, motivated lighting, and lighting for scene\n• Camera movement: handheld, gimbal, dolly, slider, and their emotional effect\n• Visual storytelling: how composition, color, and movement convey character and emotion\n• Directing the frame: working with subjects and actors for cinematic results\n• Shooting for post: LOG formats, S-Log, and preparing footage for color grading\n• Production planning, call sheets, and on-set workflow\n• Short film project: you will write, shoot, and direct a short film as your final piece'
      },
      {
        question: 'Do I need to complete the Fundamentals course before joining the Advanced course?',
        answer: 'If you have no prior experience, the Fundamentals course is a prerequisite for the Advanced program. However, if you already have solid photography or videography experience (even self-taught), you can apply directly for the Advanced course. We will assess your current skill level to ensure you get the most from the program.'
      },
      {
        question: 'What cameras will I get to work with?',
        answer: 'Students work with a range of cameras at the academy, including mirrorless cameras, DSLRs, and cinema-grade cameras. We rotate equipment based on what is most current and relevant in the industry. The goal is to teach you how to see cinematically and work professionally regardless of the specific camera, so you are never limited to just one brand or body.'
      }
    ]
  },
  {
    id: 'specialized',
    label: 'Drone & Color Grading',
    items: [
      {
        question: 'Do I need a drone license to take the Drone Filmmaking course?',
        answer: 'You do not need a license before you enroll. Drone regulations in Nepal require proper certification and permission for commercial use, and our course prepares you for that. We cover the Civil Aviation Authority of Nepal (CAAN) regulations, restricted zones, how to apply for flight permissions, and the documentation required for professional drone operations. By the end of the course, you will be fully prepared to operate legally and professionally.'
      },
      {
        question: 'What will I learn in the Drone Filmmaking course?',
        answer: 'The course covers both technical operation and cinematic artistry:\n\n• Drone hardware fundamentals: how drones work, components, and pre-flight checks\n• Flying techniques: smooth control, orientation, and emergency procedures\n• Nepal aviation laws, CAAN regulations, and no-fly zones\n• Cinematic drone movement: reveals, orbits, push-ins, and cinematic movements\n• Camera settings for aerial footage: ND filters, frame rate, and exposure in flight\n• Planning aerial shoots: scouting, weather windows, and golden hour strategy\n• Integrating aerial footage with ground footage in an edit\n• Practical flight sessions with supervised outdoor drone time'
      },
      {
        question: 'Is prior flying experience required for the Drone course?',
        answer: 'No prior experience is needed. The course starts from the very basics of drone operation. That said, if you have flown recreationally before, you will still find significant value in the cinematic, legal, and commercial aspects of the curriculum. We train beginners and experienced flyers alike to shoot like cinematographers, not just pilots.'
      },
      {
        question: 'What drones are used during the course?',
        answer: 'We train students on professional-grade cinema drones used widely in the industry. Academy drones are available for all in-class and supervised outdoor practice sessions. We will also discuss which drones are most suitable for different project types, from lightweight travel setups to high-end cinema configurations, so you can make informed equipment decisions as a working professional.'
      },
      {
        question: 'Can I fly drones commercially in Nepal after completing this course?',
        answer: 'Completing this course will give you the knowledge, skills, and regulatory understanding needed to pursue commercial drone operations in Nepal. However, you will still need to complete the official CAAN permission process independently. Our course prepares you thoroughly for that process and the practical demands of professional aerial cinematography, and we will guide you on exactly how to proceed.'
      },
      {
        question: 'What is color grading and why is it important?',
        answer: 'Color grading is the art and science of adjusting and enhancing the color, contrast, and mood of film and video footage in post-production. It is what gives a Netflix drama its specific visual tone, what makes a travel documentary feel warm and alive, or what gives an action film its high-contrast punch. In today\'s industry, color grading is a distinct and highly-valued skill. Colorists are in demand across film, advertising, YouTube content, and broadcast media.'
      },
      {
        question: 'What software is used in the Color Grading course?',
        answer: 'We teach color grading using DaVinci Resolve, the industry-standard software used by Hollywood colorists, Netflix-approved post facilities, and independent filmmakers worldwide. DaVinci Resolve\'s free version is extraordinarily powerful, meaning skills you learn with us can immediately be applied on your own computer at no cost. We also introduce students to LUTs (Look-Up Tables) and basic color science concepts applicable across platforms.'
      },
      {
        question: 'What does the Color Grading course cover?',
        answer: 'The curriculum includes:\n\n• Color science fundamentals: color spaces, gamma, and how cameras capture light\n• Understanding LOG footage and why it matters for grading\n• DaVinci Resolve interface, node structure, and workflow\n• Primary corrections: exposure, white balance, and color balance\n• Secondary corrections: selective color, HSL qualifiers, and masking\n• Creating a cinematic look by applying and building custom LUTs\n• Skin tone handling and consistency across shots\n• Matching shots for continuity within a scene\n• Delivering for different formats: broadcast, social media, and DCP\n• Final grading project: you will grade a complete short film end to end'
      },
      {
        question: 'Do I need a high-end computer for the Color Grading course?',
        answer: 'During the course, you will work on the academy\'s dedicated color grading workstations, which are properly configured for professional-grade work. For practice at home, DaVinci Resolve runs on most modern computers. We will advise you on the minimum system requirements and what hardware upgrades are worth investing in if you plan to work seriously as a colorist.'
      },
      {
        question: 'Can I become a professional colorist after completing this course?',
        answer: 'This course gives you a strong, industry-ready foundation in professional color grading. You can work as a colorist or DIT (Digital Imaging Technician) on productions, or offer color grading as a freelance service to filmmakers and brands in Nepal. Like any craft, mastery comes with practice. This course gives you the tools, techniques, and workflow knowledge to start taking paid work immediately after completing it.'
      }
    ]
  },
  {
    id: 'documentary',
    label: 'Documentary',
    items: [
      {
        question: 'Who is the Documentary Filmmaking course for?',
        answer: 'This course is ideal for:\n\n• Journalists and reporters wanting to move into video storytelling\n• Photographers looking to expand into documentary film\n• Social activists, NGO workers, or development professionals who want to document communities\n• Students of history, anthropology, social sciences, or the arts\n• Anyone with a compelling real-world story they want to tell on film\n\nYou do not need a film background, but some basic camera comfort is helpful.'
      },
      {
        question: 'What does the Documentary Filmmaking course cover?',
        answer: 'The course walks you through the complete documentary workflow:\n\n• **Story development:** Finding, researching, and structuring a documentary idea\n• **Pre-production:** Subject access, permissions, release forms, and ethical considerations\n• **Interview techniques:** How to conduct, light, and shoot compelling on-camera interviews\n• **Observational and verité filmmaking:** Shooting real life as it happens\n• **Field audio recording:** Lapel mics, boom, ambient sound, and sync\n• **B-roll strategy:** Building a visual language around your subjects\n• **Editing for documentary:** Structure, pacing, and narrative arc in the edit suite\n• **Final project:** Each student completes a short documentary film (5–10 minutes)'
      },
      {
        question: 'Will I produce a real documentary during the course?',
        answer: 'Yes. Every student in the Documentary Filmmaking course produces, shoots, and edits a complete short documentary film as their final project. This is a real piece of work, not a classroom exercise, and it becomes a cornerstone of your portfolio.'
      },
      {
        question: 'Does the course cover ethics and responsible filmmaking?',
        answer: 'Yes, and we take this seriously. Documentary filmmaking carries real ethical responsibilities to subjects, communities, and audiences. Our curriculum dedicates specific sessions to informed consent, representation, working with vulnerable communities, sensitive topics, and the documentary filmmaker\'s responsibility not to exploit or misrepresent. This is especially important when working in Nepal\'s diverse cultural landscape.'
      }
    ]
  },
  {
    id: 'career',
    label: 'Fees & Careers',
    items: [
      {
        question: 'How much do the courses cost?',
        answer: 'Course fees vary by program. Please visit our Courses page or contact our admissions office directly for the current fee structure. We aim to keep our programs accessible and competitively priced relative to the quality of training offered. Installment payment plans are available, and discount packages exist for students enrolling in multiple courses.'
      },
      {
        question: 'What is the refund or cancellation policy?',
        answer: 'We understand circumstances change. Our policy:\n\n• **Cancellations 7+ days before course start:** Full refund minus a small processing fee\n• **Cancellations within 3 to 6 days:** 50% refund, or full credit toward a future batch\n• **Cancellations with less than 3 days notice:** No refund, but you may defer to the next available batch\n\nIf Zyamaru Films Academy needs to cancel or postpone a batch for any reason, students receive a full refund or the option to transfer to the next batch.'
      },
      {
        question: 'What career opportunities are available after completing a course?',
        answer: 'Graduates from Zyamaru Films Academy go on to diverse careers in the visual media industry:\n\n• **Cinematographer / Director of Photography:** On films, commercials, and branded content\n• **Freelance videographer:** Weddings, events, and corporate productions\n• **Documentary filmmaker:** Independent, NGO, or broadcast documentary\n• **Drone operator and aerial cinematographer:** Film, real estate, travel, and surveying\n• **Colorist and post-production specialist:** For production houses and independent filmmakers\n• **Content creator / YouTuber:** With professional-quality production value\n• **Social media videographer:** For brands and agencies\n• **Photo/video journalist:** For media organizations in Nepal and internationally'
      },
      {
        question: 'Does Zyamaru Films Academy help with job placement?',
        answer: 'We actively support graduates through our alumni network, industry connections, and career guidance. While we do not guarantee job placement, we do share opportunities with graduates first, connect students with production companies and agencies in our network, provide references and portfolio review support, and host screenings and events that bring students into contact with working industry professionals in Nepal.'
      },
      {
        question: 'Will I have a portfolio after completing my course?',
        answer: 'Every course at Zyamaru Films Academy concludes with a real portfolio piece. You do not just walk away with a certificate; you walk away with actual work:\n\n• **Fundamentals students:** A curated photography and short video portfolio\n• **Advanced Cinematography students:** A short film they directed and shot\n• **Documentary students:** A complete short documentary film\n• **Drone students:** A professional aerial showreel\n• **Color Grading students:** A graded short film and a color reel'
      },
      {
        question: 'Can I keep learning after completing a course?',
        answer: 'Absolutely. Zyamaru Films Academy alumni receive access to our alumni community, a network of filmmakers across Nepal to collaborate with, along with repeat audit privileges for completed courses, discounts on additional courses, and invitations to workshops, masterclasses, and special screenings organized throughout the year. Learning filmmaking is a lifelong pursuit, and we want to be part of your journey long after the course ends.'
      }
    ]
  }
];
