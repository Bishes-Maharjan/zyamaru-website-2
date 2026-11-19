import { Course as CourseCategory } from '@/types/course';

export interface DayItem {
  day: number;
  name: string;
  theory: string[];
  practical: string[];
  assignment: string;
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
  whoItIsFor?: string;
  bring?: string;
  dailyFormat?: string;
  topicTags?: string[];
  days?: DayItem[];
  learningOutcomes: string[];
  category: CourseCategory;
  available: boolean;
  canBeSelected: boolean;
}

export const courses: Course[] = [
  {
    id: 'photography-the-fundamentals',
    slug: 'photography-the-fundamentals',
    title: 'Photography: The Fundamentals',
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
    whoItIsFor: 'Complete beginners. No experience needed.',
    bring: 'Any camera (DSLR, mirrorless or phone). The academy provides gear if you have none.',
    dailyFormat: '60 min theory + 60 min practical each day',
    topicTags: ['Histogram', 'Focus modes', 'Metering', 'RAW vs JPEG', 'Leading lines', 'Flash', 'Basic editing'],
    learningOutcomes: [
      'Understand exposure triangle (ISO, Aperture, Shutter Speed)',
      'Master basic composition and framing techniques',
      'Learn fundamental 3-point lighting setups',
      'Understand basic narrative structure',
      'Introduction to video editing workflows'
    ],
    days: [
      {
        day: 1,
        name: 'Meet Your Camera',
        theory: [
          'Parts of a camera and how it records an image',
          'Shooting modes: Auto, P, A, S, M',
          'Holding and caring for your camera',
          'Exposure triangle: the big picture',
        ],
        practical: [
          'Handling drill',
          'Shoot the same subject in Auto, then Manual',
        ],
        assignment: 'Take 10 photos of your home.',
      },
      {
        day: 2,
        name: 'Aperture and Depth of Field',
        theory: [
          'Aperture and f-stops',
          'Blurred vs sharp backgrounds',
          'Distance, focal length and depth of field',
        ],
        practical: [
          'Portrait with a blurred background',
          'Landscape with everything sharp',
        ],
        assignment: 'Shoot 5 shots at f/2.8 and 5 at f/11.',
      },
      {
        day: 3,
        name: 'Shutter Speed',
        theory: [
          'What shutter speed is and how it is measured',
          'Freezing vs blurring motion',
          'Handheld limits and the 1/focal length rule',
        ],
        practical: [
          'Freeze a moving subject',
          'Panning and long-exposure blur',
        ],
        assignment: 'Shoot a moving subject at 3 shutter speeds.',
      },
      {
        day: 4,
        name: 'ISO and the Exposure Triangle',
        theory: [
          'ISO and noise',
          'Putting aperture, shutter and ISO together',
          'Reading the histogram',
        ],
        practical: [
          'Low-light shot, then fix it with ISO',
          'Expose the same scene 3 different ways',
        ],
        assignment: 'Shoot one scene with 3 exposure combinations.',
      },
      {
        day: 5,
        name: 'Camera Settings',
        theory: [
          'White balance and colour temperature',
          'Resolution and aspect ratio (portrait, landscape)',
          'RAW vs JPEG',
          'Focus modes and metering',
        ],
        practical: [
          'Shoot one scene in 4 white balance settings',
          'Compare portrait and landscape framing',
        ],
        assignment: 'Same subject in daylight, shade and indoor light.',
      },
      {
        day: 6,
        name: 'Shot Size and Camera Angles',
        theory: [
          'Close-up, mid shot and long shot',
          'High angle, eye level, low angle',
          'What each size and angle makes the viewer feel',
        ],
        practical: [
          'Photograph one subject in 3 sizes and 3 angles',
        ],
        assignment: 'A 9-photo grid of one subject.',
      },
      {
        day: 7,
        name: 'Lenses',
        theory: [
          'Wide angle, standard and telephoto lenses',
          'Focal length and perspective',
          'Prime vs zoom',
        ],
        practical: [
          'Compare the same scene on wide, standard and tele',
          'Portrait with each lens',
        ],
        assignment: 'Shoot one subject at 3 focal lengths.',
      },
      {
        day: 8,
        name: 'Composition',
        theory: [
          'Centre framing and rule of thirds',
          'Leading lines and framing',
          'Headroom, balance and background',
        ],
        practical: [
          'Composition walk around the academy',
          'Reframe the same subject 5 ways',
        ],
        assignment: '5 photos using the rule of thirds.',
      },
      {
        day: 9,
        name: 'Understanding Light',
        theory: [
          'Hard vs soft light',
          'Direction of light: front, side, back',
          'Golden hour and harsh midday sun',
          'Flash: built-in vs external, power, direct vs bounce flash',
        ],
        practical: [
          'Window-light portrait',
          'Same subject in 3 light directions',
          'Flash portrait: direct vs bounced flash',
        ],
        assignment: 'Shoot one subject in natural light and with flash.',
      },
      {
        day: 10,
        name: 'Review and Edit',
        theory: [
          'Group critique',
          'Basic editing: crop, exposure, colour (Lightroom or mobile)',
          'Next steps: the video path',
        ],
        practical: [
          'Final mini-project: a 5-photo story',
          'Present and receive feedback',
        ],
        assignment: 'Share your best 3 photos.',
      },
    ],
    category: CourseCategory.CinematicMasterclassBeginner,
    available: true,
    canBeSelected: true,
  },
  {
    id: 'advanced-cinnetography-lighting-masterclass',
    slug: 'advanced-cinnetography-lighting-masterclass',
    title: 'Cinematic Lighting Masterclass',
    instructor: 'Amar Maharjan',
    instructorProfile: '/instructor/amar-maharjan',
    price: 'Rs. 20,000',
    originalPrice: 'Rs. 25,000',
    // rating: 4.9,
    // students: '420',
    duration: '6 Days (24 hours)',
    level: 'Advanced',
    badge: 'Bestseller',
    image: 'rgba(212, 168, 83, 0.25)',
    description: 'Take your filmmaking to the professional level. Explore complex lighting, narrative direction, and high-end production workflows.',
    whoItIsFor: 'Working videographers (e.g. wedding) who are new to cinema lighting.',
    bring: 'Your camera. Lights, light meter and ND filters are shared in groups.',
    dailyFormat: '2 hrs theory + 2 hrs practical each day',
    topicTags: ['Skin tones', 'Zebra and false colour', 'CRI and TLCI', 'Gels (CTO, CTB)', 'Power and safety', 'Stands and grip', 'Lighting diagrams'],
    learningOutcomes: [
      'Master high-key and low-key lighting for mood',
      'Understand contrast ratio and key to fill ratio',
      'Use a light meter: incident vs reflected',
      'Work with tungsten, HMI, fluorescent and LED lights',
      'Shape light with reflectors, diffusers, flags and nets',
      'Recreate lighting from a real movie scene',
    ],
    days: [
      {
        day: 1,
        name: 'Elements of Light',
        theory: [
          'Source: natural, practical and artificial',
          'Colour: white balance, colour temperature, colour contrast, complementary and analogous colours',
          'Direction: key light names (butterfly, flat, top, Rembrandt, split, back, kicker, rim, silhouette)',
          'Quantity: contrast ratio, key to fill ratio (introduction)',
          'Quality: hard light and soft light',
        ],
        practical: [
          'Find the 5 elements in 3 film frames',
          'Light one subject and change only one element at a time',
          'Check skin tones in different light',
        ],
        assignment: 'Break down the light in 3 film scenes by its 5 elements.',
      },
      {
        day: 2,
        name: 'Measuring Light and Principle Rules',
        theory: [
          'Use of the light meter: incident vs reflected',
          'Sunny 16 rule with examples: f/16 sunny, f/11 light cloud, f/8 overcast, f/5.6 heavy overcast, f/4 open shade',
          'Inverse square law with examples: double the distance gives a quarter of the light (2 stops)',
          'ND filter: keeping the aperture open in daylight',
          'ETTR (exposing to the right)',
          'Zebra and false colour',
        ],
        practical: [
          'Meter a window, a lamp and the sun',
          'Test Sunny 16 outdoors against the meter',
          'Prove the inverse square law: meter a light at 1 m, 2 m and 4 m',
          'Use ND to open the aperture in daylight',
        ],
        assignment: 'Meter 5 locations and note the stop difference between them.',
      },
      {
        day: 3,
        name: 'Types of Lights',
        theory: [
          'Tungsten, HMI, fluorescent, LED',
          'COB, panel and tube lights',
          'Colour temperature of each type',
          'CRI and TLCI',
          'Power, safety, stands and grip',
          'Gels: CTO, CTB, green/magenta correction',
        ],
        practical: [
          'Set up and compare each light type',
          'Balance tungsten and daylight with gels',
          'Compare the colour quality of two LED lights',
        ],
        assignment: 'Write the type of light used in 5 film scenes.',
      },
      {
        day: 4,
        name: 'Modifiers and Shaping the Light',
        theory: [
          'Reflector: silver, white bounce, golden',
          'Diffuser: skimmer, softbox, softball lantern',
          'Lens: gobo projector and fresnel lens',
          'Flag, cutter, black cloth and net',
          'Shaping the light: background and separation',
          'Positive fill and negative fill',
        ],
        practical: [
          'Bounce light with each reflector',
          'Build a soft key and a hard key',
          'Shape a face with negative fill, then with positive fill',
          'Light and separate a background',
        ],
        assignment: 'Light one face with 3 different modifiers.',
      },
      {
        day: 5,
        name: 'Lighting Styles, Contrast Ratio, High Key and Low Key',
        theory: [
          'Contrast ratio and key to fill ratio: stop difference and quantity difference',
          'High key lighting: bright, even, low ratio',
          'Low key lighting: dark, shadowed, high ratio',
          'Different lighting styles: naturalistic, stylised, noir, silhouette',
          '3-point lighting, practical light and motivated lighting',
          'Lighting diagrams',
        ],
        practical: [
          'Light one subject in high key and then low key',
          'Meter and set 3 different ratios',
          'Build a motivated setup with a practical lamp',
        ],
        assignment: 'Draw the diagram and ratio of your best setup.',
      },
      {
        day: 6,
        name: 'Recreate a Movie Scene',
        theory: [
          'Choose a scene and break it down by the 5 elements',
          'Plan the lighting: diagram, gear list, ratio',
          'Decide the style: high key, low key or naturalistic',
        ],
        practical: [
          'Build and meter the lighting in groups',
          'Shoot the scene',
          'Screen side by side with the original and critique',
        ],
        assignment: 'Show before and after frames of your recreation.',
      },
    ],
    category: CourseCategory.CinematicMasterclassAdvanced,
    available: true,
    canBeSelected: true,
  },
  {
    id: 'photography-to-advanced-cinematography',
    slug: 'photography-to-advanced-cinematography',
    title: 'Photography to Advanced Cinematography',
    instructor: 'Amar Maharjan',
    instructorProfile: '/instructor/amar-maharjan',
    price: 'Rs. 25,000',
    originalPrice: 'Rs. 30,000',
    // rating: 4.9,
    // students: '420',
    duration: '26 Days (52 hours)',
    level: 'Beginner',
    badge: 'Bestseller',
    image: 'rgba(212, 168, 83, 0.25)',
    description: 'A complete journey from zero to cinema. Every topic covers photo, video and cinema together so you build all three skills at once.',
    whoItIsFor: 'Beginners. No photography or video experience needed. Every topic covers photo, video and cinema together.',
    bring: 'Your camera and lens. The academy provides gear if you have none.',
    dailyFormat: '60 min theory + 60 min practical each day',
    topicTags: ['Flicker', 'Codecs and bitrate', 'Metering', 'Coverage', 'Shot lists', 'Audio basics', 'Media backup', 'Basic photo editing', 'Basic video editing'],
    learningOutcomes: [
      'Understand the exposure triangle across photo, video and cinema',
      'Master composition, shot sizes and camera angles',
      'Work with lenses, tripods and gimbals for motivated movement',
      'Apply screen direction, continuity and the 180° rule',
      'Light interior and exterior scenes with natural and practical sources',
      'Edit photos and video from capture to export',
    ],
    days: [
      {
        day: 1,
        name: 'Camera Obscura',
        theory: [
          'Camera obscura and the pinhole: how light makes an image',
          'From pinhole to lens, sensor and modern camera',
          'Why the image is upside down and how a lens fixes brightness',
        ],
        practical: [
          'Build a pinhole or box camera obscura',
          'Project an outside scene onto a wall',
        ],
        assignment: 'Photograph or sketch what your obscura projected.',
      },
      {
        day: 2,
        name: 'Know Your Camera and Mode A',
        theory: [
          'Parts of the camera',
          'Exposure triangle and shooting modes: Auto, P, A, S, M',
          'Mode A (aperture priority): f-stops and depth of field',
          'Aperture, focal length and subject distance',
        ],
        practical: [
          'Handling drill',
          'Shoot the same subject at 3 apertures in Mode A',
        ],
        assignment: '10 photos in Mode A with different backgrounds.',
      },
      {
        day: 3,
        name: 'Revise Mode A and Start Mode S',
        theory: [
          'Revision of Mode A',
          'Mode S (shutter priority): freeze vs blur',
          'Handheld shutter limits',
        ],
        practical: [
          'Quick Mode A test',
          'Freeze a moving subject and blur another in Mode S',
        ],
        assignment: 'Shoot one moving subject at 3 shutter speeds.',
      },
      {
        day: 4,
        name: 'Revise Mode S and Shutter in Video',
        theory: [
          'Revision of Mode S',
          'Shutter angle, 180 degree rule, fps (PAL/NTSC)',
          'Stutter and strobe effects, and slow shutter effects',
          'Rolling shutter vs global shutter',
          'Flicker under lights',
        ],
        practical: [
          'Shoot at 3 shutter angles',
          'Capture rolling shutter on a fast pan',
          'Create a stutter shot and a slow shutter shot',
        ],
        assignment: 'A 20-second clip using one deliberate shutter effect.',
      },
      {
        day: 5,
        name: 'Shutter Speed and ISO',
        theory: [
          'How shutter speed and ISO work together',
          'ISO and noise',
          'Auto ISO and low-light choices',
        ],
        practical: [
          'Low-light scene: change shutter, then ISO',
          'Compare noise at 5 ISO values',
        ],
        assignment: 'One low-light scene exposed 3 ways.',
      },
      {
        day: 6,
        name: 'ISO: Native ISO and Dynamic Range',
        theory: [
          'Native ISO and why it matters in video',
          'Dynamic range and stop difference',
        ],
        practical: [
          'Find your camera\'s native ISO',
          'Test dynamic range with a high-contrast scene',
        ],
        assignment: 'Shoot a stop chart.',
      },
      {
        day: 7,
        name: 'Histogram, Waveform and False Colour',
        theory: [
          'Reading the histogram',
          'Waveform monitor',
          'False colour and zebra',
          'ETTR (exposing to the right)',
        ],
        practical: [
          'Expose 5 scenes using histogram',
          'Check the same scenes on waveform and false colour',
        ],
        assignment: 'Expose a face and a bright window together.',
      },
      {
        day: 8,
        name: 'White Balance and Colour Temperature',
        theory: [
          'White balance and colour temperature in Kelvin',
          'Warm, cool and mixed light',
          'Colour as mood',
        ],
        practical: [
          'Shoot one scene in 4 white balance settings',
          'Mixed-colour light test',
        ],
        assignment: 'Mood board of 5 colour temperatures.',
      },
      {
        day: 9,
        name: 'Resolution and Aspect Ratio',
        theory: [
          'Resolution: HD, 4K and beyond',
          'Aspect ratio: portrait, landscape, 16:9, wide',
          'Codecs and bitrate',
        ],
        practical: [
          'Frame one subject in 3 aspect ratios',
          'Compare 2 codec settings',
        ],
        assignment: 'Reframe one scene for 3 screens.',
      },
      {
        day: 10,
        name: 'Shot Size',
        theory: [
          'Close-up, mid shot and long shot',
          'What each size makes the viewer feel',
        ],
        practical: [
          'One subject in all sizes',
          'Dialogue scene in 3 sizes',
        ],
        assignment: 'A 9-shot size grid.',
      },
      {
        day: 11,
        name: 'Composition',
        theory: [
          'Centre framing and rule of thirds',
          'Leading lines',
          'Headroom, lead room and layers',
        ],
        practical: [
          'Composition walk',
          'Frame a moving subject 5 ways',
        ],
        assignment: '5 film frames with notes.',
      },
      {
        day: 12,
        name: 'Camera Angle 1: Horizontal Angles',
        theory: [
          'Horizontal camera angle: front, three-quarter, profile, back',
          'Over-the-shoulder and point-of-view positions',
          'What each horizontal angle tells the viewer about a character',
        ],
        practical: [
          'Shoot one subject from 8 positions around them',
          'Dialogue scene from 3 horizontal angles',
        ],
        assignment: 'Photograph one person from 4 horizontal angles.',
      },
      {
        day: 13,
        name: 'Camera Angle 2: Vertical Angles',
        theory: [
          'Vertical camera angle: high, eye level, low',
          'Top shot (bird\'s eye) and Dutch tilt',
          'Angle as power, fear and emotion',
        ],
        practical: [
          'Same subject from 5 vertical angles',
          'A power-shift scene told only with angle',
        ],
        assignment: 'A short scene told only with vertical angles.',
      },
      {
        day: 14,
        name: 'Lenses 1: Types and Characteristics',
        theory: [
          'Wide angle, standard and telephoto lenses',
          'Focal length and perspective',
          'Prime vs zoom',
        ],
        practical: [
          'Same scene on wide, standard and tele',
        ],
        assignment: 'One subject at 3 focal lengths.',
      },
      {
        day: 15,
        name: 'Lenses 2: Theory and Practice',
        theory: [
          'Lens character and distortion',
          'Choosing a lens for the story',
          'Lens and depth of field together',
        ],
        practical: [
          'Dialogue scene with 2 lens choices',
          'Portrait with each lens',
        ],
        assignment: 'Describe the lens choice in 3 film scenes.',
      },
      {
        day: 16,
        name: 'Tripod Movement and Lensing',
        theory: [
          'Camera support and tripod movement',
          'Pan and tilt, fluid head balancing',
          'How each lens changes a pan or tilt',
        ],
        practical: [
          'Smooth pans and tilts on wide and tele',
          'A reveal shot',
        ],
        assignment: '3 motivated pans on different lenses.',
      },
      {
        day: 17,
        name: 'Gimbal Movement and Lensing',
        theory: [
          'Gimbal, handheld and stabilisation',
          'How lens choice changes a moving shot',
        ],
        practical: [
          'Balance and use a gimbal',
          'Follow a walking subject on 2 lenses',
        ],
        assignment: 'A gimbal reel on wide and standard lenses.',
      },
      {
        day: 18,
        name: 'Screen Direction and the 180 Degree Rule',
        theory: [
          'Screen direction and the imaginary line (axis)',
          '180 degree rule: why it exists and how to cross it',
          'Neutral shots and ways to cross the line',
        ],
        practical: [
          'Shoot a 2-person scene with correct screen direction',
          'Break the rule on purpose and note the effect',
        ],
        assignment: 'Draw an axis diagram for your scene.',
      },
      {
        day: 19,
        name: '30 Degree Rule and Continuity',
        theory: [
          '30 degree rule and jump cuts',
          'Continuity of position, props, eyelines and light',
          'Cutting on action',
        ],
        practical: [
          'Shoot a continuity sequence in groups',
          'Create a jump cut, then fix it with the 30 degree rule',
        ],
        assignment: 'Check your sequence for continuity errors.',
      },
      {
        day: 20,
        name: 'Elements of Light',
        theory: [
          'Source: natural, practical and artificial',
          'Colour: white balance, colour temperature, colour contrast, complementary and analogous',
          'Direction: front, side, back and top',
          'Quantity: contrast ratio, key to fill ratio (stop difference and quantity difference), positive and negative fill',
          'Quality: hard and soft light',
        ],
        practical: [
          'Find the 5 elements in 3 film frames',
          'Shoot one subject, changing one element at a time',
          'Meter a key to fill ratio',
        ],
        assignment: 'Break down the light in 3 film scenes by its 5 elements.',
      },
      {
        day: 21,
        name: 'Manual Mode, Metering and ND',
        theory: [
          'Mode M: everything together',
          'Metering modes and the light meter',
          'ND filters and Sunny 16',
        ],
        practical: [
          'Shoot 5 scenes in Mode M',
          'Use ND in bright daylight',
        ],
        assignment: 'Expose 5 scenes with no auto mode.',
      },
      {
        day: 22,
        name: 'Indoor Lighting',
        theory: [
          'Natural light tricks: windows, curtains and reflectors',
          'Practical and motivated lighting',
          'Interior dynamic range (interior vs exterior exposure)',
        ],
        practical: [
          'Light an interior with a window and one lamp',
          'Balance the window and the room exposure',
        ],
        assignment: 'Shoot your own indoor look.',
      },
      {
        day: 23,
        name: 'Outdoor Lighting',
        theory: [
          'Sun as backlight',
          'Subject between camera and sun',
          'Using ND, reflectors and shade outdoors',
        ],
        practical: [
          'Shoot an exterior scene at midday',
          'Fill a backlit face with a reflector',
        ],
        assignment: 'Shoot your own outdoor look.',
      },
      {
        day: 24,
        name: 'Planning for Shooting (Shot Division, Storyboard)',
        theory: [
          'Shot division: breaking a scene into shots',
          'Storyboard basics',
          'Audio basics',
        ],
        practical: [
          'Divide a 1-minute scene into a shot list in groups',
          'Draw a storyboard for your scene',
        ],
        assignment: 'Finish your shot division and storyboard.',
      },
      {
        day: 25,
        name: 'Basic Photo Editing',
        theory: [
          'Culling and selecting photos',
          'Crop, straighten, exposure and contrast',
          'White balance, highlights and shadows',
          'Exporting for web and print',
        ],
        practical: [
          'Edit 5 photos from your earlier assignments (Lightroom or mobile)',
        ],
        assignment: 'Deliver an edited set of 5 photos.',
      },
      {
        day: 26,
        name: 'Basic Video Editing and Screening',
        theory: [
          'Importing and organising clips',
          'Rough cut, trimming and cutting on action',
          'Transitions, audio levels and export',
        ],
        practical: [
          'Edit the scene you shot',
          'Screening and critique',
        ],
        assignment: 'Final portfolio piece.',
      },
    ],
    category: CourseCategory.CinematicMasterclassAdvanced,
    available: true,
    canBeSelected: true,

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
    category: CourseCategory.BasicColorGrading,
    available: false,
    canBeSelected: false,
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
    category: CourseCategory.AdvancedColorGrading,
    available: false,
    canBeSelected: false,
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
    category: CourseCategory.DocumentaryFilmmaking,
    available: false,
    canBeSelected: false,
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
    category: CourseCategory.DroneCinematography,
    available: false,
    canBeSelected: false,

  }
];
