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
  price: string;
  originalPrice?: string;
  rating?: number;
  students?: string;
  duration: string;
  level: string;
  badge?: string;
  image: string; // Using colors for now as placeholders
  isUpcoming?: boolean;
  isExpectedPrice?: boolean;
  description: string;
  curriculum: CurriculumItem[];
  learningOutcomes: string[];
  category: CourseCategory;
}

export const courses: Course[] = [
  {
    id: 'cinematic-masterclass-beginner',
    slug: 'cinematic-masterclass-beginner',
    title: 'Cinematic Masterclass: The Fundamentals',
    instructor: 'Amar Maharjan',
    price: 'Rs. 10,000',
    originalPrice: 'Rs. 15,000',
    rating: 4.8,
    students: '850',
    duration: '20 hours',
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
  },
  {
    id: 'cinematic-masterclass-advanced',
    slug: 'cinematic-masterclass-advanced',
    title: 'Cinematic Masterclass: Advanced Visual Storytelling',
    instructor: 'Amar Maharjan',
    price: 'Rs. 25,000',
    originalPrice: 'Rs. 35,000',
    rating: 4.9,
    students: '420',
    duration: '32 hours',
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
  },
  {
    id: 'documentary-filmmaking',
    slug: 'documentary-filmmaking',
    title: "Documentary Filmmaking: Telling Nepal's Stories",
    instructor: 'Srijana Basnet',
    price: 'Rs. 12,000',
    originalPrice: 'Rs. 18,000',
    rating: 4.8,
    students: '650',
    duration: '28 hours',
    level: 'Intermediate',
    badge: 'New',
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
  },
  {
    id: 'advanced-color-grading',
    slug: 'advanced-color-grading',
    title: 'Advanced Color Grading & Visual Effects',
    instructor: 'Aayush Shrestha',
    price: 'Rs. 18,000',
    duration: '24 hours',
    level: 'Intermediate',
    badge: 'Popular',
    isUpcoming: true,
    isExpectedPrice: true,
    image: 'rgba(96, 165, 250, 0.15)',
    description: 'Transform your footage into cinematic masterpieces. Learn professional color grading techniques and seamless VFX integration.',
    learningOutcomes: [
      'Master the DaVinci Resolve color page',
      'Understand Log and RAW workflows',
      'Secondary color correction (Qualifiers & Masks)',
      'Match looks across different cameras',
      'Basic VFX compositing and tracking'
    ],
    curriculum: [
      {
        chapter: 'Module 1: Color Science',
        topics: ['Color Spaces & Gamut', 'Input vs Output Transforms', 'Node Tree Efficiency']
      },
      {
        chapter: 'Module 2: The Art of Grading',
        topics: ['Creating Skin Tones', 'Building Custom Looks', 'Film Print Emulation']
      },
      {
        chapter: 'Module 3: Visual Effects',
        topics: ['3D Tracking', 'Sky Replacements', 'Clean Plate Creation']
      }
    ],
    category: CourseCategory.AdvancedColorGrading,
  },
  {
    id: 'drone-cinematography',
    slug: 'drone-cinematography',
    title: 'Drone Cinematography & Aerial Storytelling',
    instructor: 'Binod Tamang',
    price: 'Rs. 20,000',
    originalPrice: 'Rs. 30,000',
    duration: '18 hours',
    level: 'Intermediate',
    isUpcoming: true,
    isExpectedPrice: true,
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
  }
];
