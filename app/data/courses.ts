import { Course as CourseCategory } from '@/types/course';

export interface CurriculumItem {
  chapter: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  instructorProfile?: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  students?: string;
  duration: string;
  level: string;
  badge?: string;
  image: string; // Using colors for now as placeholders
  isUpcoming?: boolean;
  description: string;
  curriculum: CurriculumItem[];
  learningOutcomes: string[];
  category: CourseCategory;
  available: boolean;
}

export const courses: Course[] = [
  {
    id: 'cinematic-masterclass-beginner',
    slug: 'cinematic-masterclass-beginner',
    title: 'Cinematic Masterclass: The Fundamentals',
    instructor: 'Bijesh Maharjan',
    // instructorProfile: '/instructor/bijesh-maharjan',

    price: 'Rs. 10,000',
    originalPrice: 'Rs. 15,000',
    // rating: 4.8,
    // students: '850',
    duration: '10 Days (20 hours)',
    level: 'Beginner',
    badge: 'Popular',
    image: 'rgba(212, 168, 83, 0.15)',
    description: 'Master the core principles of cinematic storytelling and camera work. This course is designed for beginners who want to build a strong foundation in filmmaking.',
    learningOutcomes: [
      'Understand exposure triangle (ISO, Aperture, Shutter Speed)',
      'Master basic composition and framing techniques',
      'Learn fundamental 3-point lighting setups',
      'Understand basic narrative structure',
      'Introduction to video editing workflows'
    ],
    curriculum: [
      {
        chapter: 'Module 1: Camera Basics',
        topics: ['Sensors and Focal Lengths', 'Mastering Exposure', 'White Balance and Color Temp']
      },
      {
        chapter: 'Module 2: Visual Language',
        topics: ['Rule of Thirds & Beyond', 'Depth of Field', 'Lens Choice for Storytelling']
      },
      {
        chapter: 'Module 3: Light & Sound',
        topics: ['Natural vs Artificial Light', 'Capturing Clean Audio', 'Basic Interview Setup']
      }
    ],
    category: CourseCategory.CinematicMasterclassBeginner,
    available: true,
  },
  {
    id: 'cinematic-masterclass-advanced',
    slug: 'cinematic-masterclass-advanced',
    title: 'Cinematic Masterclass: Advanced Visual Storytelling',
    instructor: 'Amar Maharjan',
    instructorProfile: '/instructor/amar-maharjan',
    price: 'Rs. 20,000',
    originalPrice: 'Rs. 25,000',
    // rating: 4.9,
    // students: '420',
    duration: '1 Month (52 hours)',
    level: 'Advanced',
    badge: 'Bestseller',
    image: 'rgba(212, 168, 83, 0.25)',
    description: 'Take your filmmaking to the professional level. Explore complex lighting, narrative direction, and high-end production workflows.',
    learningOutcomes: [
      'Master high-key and low-key lighting for mood',
      'Learn advanced camera movement (Gimbals, Dollies)',
      'Directing actors and narrative blocking',
      'Professional color science and LUT workflows',
      'Production management and set etiquette'
    ],
    curriculum: [
      {
        chapter: 'Module 1: Advanced Cinematography',
        topics: ['Motivating Light', 'Color Contrast & Theory', 'The Language of Movement']
      },
      {
        chapter: 'Module 2: Directing & Production',
        topics: ['Script Breakdown', 'Working with Talent', 'Set Leadership']
      },
      {
        chapter: 'Module 3: Post-Production Mastery',
        topics: ['Advanced Color Grading', 'Sound Design Layers', 'Workflow Optimization']
      }
    ],
    category: CourseCategory.CinematicMasterclassAdvanced,
    available: true
  },
  {
    id: 'basic-color-grading',
    slug: 'basic-color-grading',
    title: '15-Day Basic Color Grading Course',
    instructor: 'Deepesh Chaudhary',
    instructorProfile: `/instructor/deepesh-chaudhary`,
    price: 'Rs. 12,500',
    originalPrice: 'Rs. 18,000',
    // rating: 4.7,
    // students: '310',
    duration: '15 Days (30 hours)',
    level: 'Beginner to Intermediate',
    badge: 'New',
    isUpcoming: false,
    image: 'rgba(96, 165, 250, 0.1)',
    description: 'Learn the fundamentals of color grading in DaVinci Resolve. From project setup and conforming to primary/secondary corrections, shot matching, and crafting cinematic looks, this course will build a solid foundation for your color grading career.',
    learningOutcomes: [
      'Master the DaVinci Resolve interface, project setup, and conforming workflows',
      'Understand primary corrections (Contrast, Exposure, White Balance)',
      'Learn shot matching techniques for scene continuity',
      'Use Power Windows and basic masking for selective color correction',
      'Develop creative cinematic looks and skin tone correction'
    ],
    curriculum: [
      {
        chapter: 'Module 1: UI & Conforming (Days 1-3)',
        topics: [
          'DaVinci interface, project setup & importing media',
          'Timeline creation & relinking offline media',
          'Conforming XML/EDL workflows',
          'Hands-on practice on editing and conforming'
        ]
      },
      {
        chapter: 'Module 2: Primary Corrections (Days 4-7)',
        topics: [
          'Contrast Control (Lift, Gamma, Gain, Exposure)',
          'Adjusting temperature, tint, and saturation',
          'Achieving natural color balance',
          'Practical exercises on multiple clips'
        ]
      },
      {
        chapter: 'Module 3: Shot Matching (Days 8-10)',
        topics: [
          'Scene continuity basics',
          'Matching multiple shots for exposure and white balance',
          'Ensuring color consistency across scenes',
          'Instructor-led practical shot matching'
        ]
      },
      {
        chapter: 'Module 4: Secondary Corrections & Looks (Days 11-14)',
        topics: [
          'Power Windows & Qualifiers',
          'Basic masking for selective color correction',
          'Creating cinematic looks and skin tone correction',
          'Grading a complete clip from start to finish'
        ]
      },
      {
        chapter: 'Module 5: Final Review & Certification (Day 15)',
        topics: [
          'Final review of projects',
          'Feedback session and Q&A',
          'Certificate distribution'
        ]
      }
    ],
    category: CourseCategory.BasicColorGrading,
    available: false
  },
  {
    id: 'advanced-color-grading',
    slug: 'advanced-color-grading',
    title: '15-Day Advanced Color Grading Course',
    instructor: 'Deepesh Chaudhary',
    instructorProfile: `/instructor/deepesh-chaudhary`,
    price: 'Rs. 24,500',
    originalPrice: 'Rs. 32,000',
    // rating: 4.9,
    // students: '185',
    duration: '15 Days (30 hours)',
    level: 'Advanced',
    badge: 'Advanced',
    isUpcoming: false,
    image: 'rgba(96, 165, 250, 0.15)',
    description: 'Transform your footage into cinematic masterpieces with our advanced curriculum. Learn professional color-managed workflows, custom LUT creation, advanced secondary tools like Magic Mask, and recreate looks from Hollywood films.',
    learningOutcomes: [
      'Master advanced color science, Log/RAW workflows, and Color Management',
      'Create, test, and manage technical and creative LUT pipelines',
      'Master advanced secondary tools (Magic Mask, Depth Map, Relight FX)',
      'Optimize professional workflows using Node Trees and PowerGrades',
      'Recreate looks from references and grade complete commercial sequences'
    ],
    curriculum: [
      {
        chapter: 'Module 1: Color Science & Look Development (Days 1-6)',
        topics: [
          'Color spaces, gamma, dynamic range, bit depth',
          'RAW vs Log and Color Managed workflows',
          'Building cinematic looks and contrast design',
          'Technical vs Creative LUTs and LUT pipeline management',
          'Creating, exporting, and testing custom LUTs'
        ]
      },
      {
        chapter: 'Module 2: Advanced Secondary Tools (Days 7-10)',
        topics: [
          'Advanced Qualifiers, Power Windows, and Magic Mask',
          'Depth Map and Relight FX',
          'Advanced tracking and combining secondary tools',
          'Selective grading and beauty work'
        ]
      },
      {
        chapter: 'Module 3: Professional Workflow & Workshop (Days 11-13)',
        topics: [
          'Node tree organization and PowerGrades',
          'Gallery Stills, Shared Nodes, Groups, and Versions',
          'Grading a commercial or music video',
          'Recreating looks from references (Creative Grading Workshop)'
        ]
      },
      {
        chapter: 'Module 4: Final Project & Certification (Days 14-15)',
        topics: [
          'Grade a complete sequence using advanced techniques',
          'Final project presentation and portfolio guidance',
          'Feedback session and certificate distribution'
        ]
      }
    ],
    category: CourseCategory.AdvancedColorGrading,
    available: false
  },
  {
    id: 'documentary-filmmaking',
    slug: 'documentary-filmmaking',
    title: "Documentary Filmmaking: Telling Nepal's Stories",
    instructor: 'Srijana Basnet',
    // rating: 4.8,
    // students: '650',
    duration: '28 hours',
    level: 'Intermediate',
    badge: 'Upcoming',
    isUpcoming: true,
    image: 'rgba(96, 165, 250, 0.12)',
    description: "Learn to craft compelling documentaries that capture the rich culture and untold stories of Nepal. From pre-production research to post-production storytelling, this course covers the complete documentary pipeline with a focus on ethical, culturally sensitive filmmaking.",
    learningOutcomes: [
      'Develop compelling documentary proposals and treatments',
      'Conduct ethical on-camera interviews and field recordings',
      'Master observational and participatory documentary styles',
      'Build narrative arcs from unscripted real-world footage',
      'Edit documentaries for pacing, emotion, and impact',
      'Understand distribution channels and film festival submissions'
    ],
    curriculum: [
      {
        chapter: 'Module 1: Pre-Production & Research',
        topics: ['Finding Your Subject', 'Writing a Treatment & Proposal', 'Location Scouting & Permissions']
      },
      {
        chapter: 'Module 2: Production Techniques',
        topics: ['Interview Lighting & Framing', 'Observational Shooting', 'Run-and-Gun vs Controlled Setups']
      },
      {
        chapter: 'Module 3: The Edit Room',
        topics: ['Building a Paper Edit', 'Pacing & Rhythm in Nonfiction', 'Music, Sound Design & Narration']
      },
      {
        chapter: 'Module 4: Distribution & Ethics',
        topics: ['Film Festival Strategy', 'Informed Consent & Representation', 'Online Distribution Platforms']
      }
    ],
    category: CourseCategory.DocumentaryFilmmaking,
    available: false
  },
  {
    id: 'drone-cinematography',
    slug: 'drone-cinematography',
    title: 'Drone Cinematography & Aerial Storytelling',
    instructor: 'Binod Tamang',
    duration: '18 hours',
    level: 'Intermediate',
    badge: 'Upcoming',
    isUpcoming: true,
    image: 'rgba(74, 222, 128, 0.15)',
    description: 'Capture the world from above. Learn safe flight operations and cinematic aerial movements that tell a compelling story.',
    learningOutcomes: [
      'Master smooth aerial movements (Orbits, Tilts, Reveals)',
      'Drone flight safety and regulations in Nepal',
      'Post-processing high-dynamic-range aerial footage',
      'Using drones for narrative impact',
      'Weather and environment assessment'
    ],
    curriculum: [
      {
        chapter: 'Module 1: Flight Fundamentals',
        topics: ['Hardware & Pre-flight', 'GPS vs Manual Control', 'Safety Protocols']
      },
      {
        chapter: 'Module 2: Aerial Composition',
        topics: ['Top-down Perspective', 'The Parallax Effect', 'Leading Lines from Above']
      },
      {
        chapter: 'Module 3: Aerial Storytelling',
        topics: ['Establishing Shots', 'Tracking Action', 'The Cinematic Reveal']
      }
    ],
    category: CourseCategory.DroneCinematography,
    available: false

  }
];
