/**
 * Typed chapter registry for the photography course.
 * Covers all 6 parts. Chapters built in the current batch are
 * `available: true`; the rest show as "coming soon" on the contents page.
 */

export interface Chapter {
  slug: string;
  number: string;
  title: string;
  summary: string;
  part: number;
  partTitle: string;
  partDescription: string;
  level: 'A' | 'B' | 'C';
  batch: number;
  available: boolean;
}

export const PARTS: {
  part: number;
  title: string;
  description: string;
}[] = [
  { part: 1, title: 'Exposure', description: 'How bright the picture gets, and what each setting does to it.' },
  { part: 2, title: 'Focus & Depth', description: 'What looks sharp, what melts into blur, and how to control both.' },
  { part: 3, title: 'Light', description: 'The most important "setting" of all.' },
  { part: 4, title: 'Composition', description: 'How to arrange what the viewer sees.' },
  { part: 5, title: 'Colour & Editing', description: 'From colour theory to a basic editing workflow.' },
  { part: 6, title: 'Cinematic', description: 'Everything here teaches how still photography becomes motion pictures.' },
];

export const CHAPTERS: Chapter[] = [
  // ── Part 1: Exposure ───────────────────────────────────────
  {
    slug: 'exposure-triangle',
    number: '1.1',
    title: 'The Exposure Triangle',
    summary: 'Aperture, shutter and ISO jointly set brightness — learn to trade them.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'A', batch: 1, available: true,
  },
  {
    slug: 'aperture-and-light',
    number: '1.2',
    title: 'Aperture and Light',
    summary: 'Read f-numbers and predict how many stops of light a change adds or removes.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'A', batch: 1, available: true,
  },
  {
    slug: 'shutter-speed-and-motion',
    number: '1.3',
    title: 'Shutter Speed and Motion',
    summary: 'Choose a shutter speed to freeze or blur motion and avoid camera shake.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'A', batch: 1, available: true,
  },
  {
    slug: 'long-exposure-and-nd-filters',
    number: '1.4',
    title: 'Long Exposure & ND Filters',
    summary: 'Calculate shutter speed with an ND filter and know when to use one.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'A', batch: 2, available: false,
  },
  {
    slug: 'iso-and-noise',
    number: '1.5',
    title: 'ISO and Image Noise',
    summary: 'Decide when to raise ISO and understand the noise trade-off.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'A', batch: 2, available: false,
  },
  {
    slug: 'metering-and-exposure-compensation',
    number: '1.6',
    title: 'Metering & Exposure Compensation',
    summary: 'Explain what a meter aims for and correct it on tricky scenes.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'A', batch: 2, available: false,
  },
  {
    slug: 'shooting-modes',
    number: '1.7',
    title: 'Shooting Modes',
    summary: 'Choose between P, A/Av, S/Tv and M and predict what the camera will do.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'A', batch: 3, available: false,
  },
  {
    slug: 'dynamic-range-and-histogram',
    number: '1.8',
    title: 'Dynamic Range & the Histogram',
    summary: 'Read a histogram and decide what to protect when a scene is too wide.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'A', batch: 3, available: false,
  },
  {
    slug: 'raw-vs-jpeg',
    number: '1.9',
    title: 'RAW vs JPEG',
    summary: 'Understand why RAW gives more room to recover.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'B', batch: 3, available: false,
  },
  {
    slug: 'exposure-cheat-sheet',
    number: '1.10',
    title: 'Part 1 Cheat Sheet & Quiz',
    summary: 'Formulas, stop tables, Sunny 16 and 15 review questions.',
    part: 1, partTitle: 'Exposure', partDescription: 'How bright the picture gets.',
    level: 'C', batch: 3, available: false,
  },

  // ── Part 2: Focus & Depth ──────────────────────────────────
  {
    slug: 'depth-of-field-and-bokeh',
    number: '2.1',
    title: 'Depth of Field & Bokeh',
    summary: 'Predict how aperture, focal length and distance affect background blur.',
    part: 2, partTitle: 'Focus & Depth', partDescription: 'What looks sharp and what melts.',
    level: 'A', batch: 4, available: false,
  },
  {
    slug: 'focal-length-and-perspective',
    number: '2.2',
    title: 'Focal Length & Perspective',
    summary: 'Perspective comes from position, not the lens — focal length sets the crop.',
    part: 2, partTitle: 'Focus & Depth', partDescription: 'What looks sharp and what melts.',
    level: 'A', batch: 4, available: false,
  },
  {
    slug: 'sensor-size-and-crop-factor',
    number: '2.3',
    title: 'Sensor Size & Crop Factor',
    summary: 'Compute equivalent focal length and aperture for any sensor.',
    part: 2, partTitle: 'Focus & Depth', partDescription: 'What looks sharp and what melts.',
    level: 'B', batch: 4, available: false,
  },
  {
    slug: 'autofocus-and-focus-modes',
    number: '2.4',
    title: 'Autofocus & Focus Modes',
    summary: 'Choose between single, continuous and tracking modes.',
    part: 2, partTitle: 'Focus & Depth', partDescription: 'What looks sharp and what melts.',
    level: 'B', batch: 5, available: false,
  },
  {
    slug: 'hyperfocal-distance',
    number: '2.5',
    title: 'Hyperfocal Distance',
    summary: 'Focus a landscape for maximum sharpness from near to infinity.',
    part: 2, partTitle: 'Focus & Depth', partDescription: 'What looks sharp and what melts.',
    level: 'A', batch: 5, available: false,
  },
  {
    slug: 'diffraction-and-sharpest-aperture',
    number: '2.6',
    title: 'Diffraction & the Sharpest Aperture',
    summary: 'Why very small apertures look soft and how to pick the sweet spot.',
    part: 2, partTitle: 'Focus & Depth', partDescription: 'What looks sharp and what melts.',
    level: 'A', batch: 5, available: false,
  },
  {
    slug: 'focus-cheat-sheet',
    number: '2.7',
    title: 'Part 2 Cheat Sheet & Quiz',
    summary: 'Formulas for DOF, hyperfocal, equivalence and diffraction.',
    part: 2, partTitle: 'Focus & Depth', partDescription: 'What looks sharp and what melts.',
    level: 'C', batch: 5, available: false,
  },

  // ── Part 3: Light ──────────────────────────────────────────
  {
    slug: 'quality-and-direction-of-light',
    number: '3.1',
    title: 'Quality & Direction of Light',
    summary: 'How light size, distance and angle shape the look of a photograph.',
    part: 3, partTitle: 'Light', partDescription: 'The most important "setting" of all.',
    level: 'A', batch: 6, available: false,
  },
  {
    slug: 'golden-hour-and-blue-hour',
    number: '3.2',
    title: 'Golden Hour & Blue Hour',
    summary: 'Plan your shoot around the sun position and colour.',
    part: 3, partTitle: 'Light', partDescription: 'The most important "setting" of all.',
    level: 'A', batch: 6, available: false,
  },
  {
    slug: 'white-balance-and-colour-temperature',
    number: '3.3',
    title: 'White Balance & Colour Temperature',
    summary: 'Fix colour casts and use them creatively.',
    part: 3, partTitle: 'Light', partDescription: 'The most important "setting" of all.',
    level: 'A', batch: 6, available: false,
  },
  {
    slug: 'flash-and-fill-light',
    number: '3.4',
    title: 'Flash & Fill Light',
    summary: 'Balance flash and ambient with the guide number.',
    part: 3, partTitle: 'Light', partDescription: 'The most important "setting" of all.',
    level: 'A', batch: 6, available: false,
  },
  {
    slug: 'light-cheat-sheet',
    number: '3.5',
    title: 'Part 3 Cheat Sheet & Quiz',
    summary: 'Light size, inverse square, white balance, flash.',
    part: 3, partTitle: 'Light', partDescription: 'The most important "setting" of all.',
    level: 'C', batch: 6, available: false,
  },

  // ── Part 4: Composition ────────────────────────────────────
  {
    slug: 'what-is-composition', number: '4.1', title: 'What Is Composition',
    summary: 'The frame is a choice — learn how crop shapes meaning.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'B', batch: 7, available: false,
  },
  {
    slug: 'focal-points-and-placement', number: '4.2', title: 'Focal Points & Placement',
    summary: 'Thirds, golden ratio, and where the eye goes first.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'B', batch: 7, available: false,
  },
  {
    slug: 'lines-and-shapes', number: '4.3', title: 'Lines & Shapes',
    summary: 'Use leading lines and vanishing points to guide the viewer.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'B', batch: 7, available: false,
  },
  {
    slug: 'texture-and-pattern', number: '4.4', title: 'Texture & Pattern',
    summary: 'Raking light reveals texture; breaking a pattern draws the eye.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'A', batch: 8, available: false,
  },
  {
    slug: 'space-and-balance', number: '4.5', title: 'Space & Balance',
    summary: 'Visual weight, positive/negative space, and balance.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'B', batch: 8, available: false,
  },
  {
    slug: 'depth-and-layers', number: '4.6', title: 'Depth & Layers',
    summary: 'Foreground, mid, background and atmospheric perspective.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'A', batch: 8, available: false,
  },
  {
    slug: 'contrast-tone-and-colour', number: '4.7', title: 'Contrast, Tone & Colour',
    summary: 'Curves, local adjustments and hue contrast.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'A', batch: 9, available: false,
  },
  {
    slug: 'angle-and-perspective', number: '4.8', title: 'Angle & Perspective',
    summary: 'Camera height, tilt, and converging verticals.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'A', batch: 9, available: false,
  },
  {
    slug: 'four-frame-story', number: '4.9', title: 'Final Project: Four-Frame Story',
    summary: 'Put it all together in a guided creative exercise.',
    part: 4, partTitle: 'Composition', partDescription: 'How to arrange what the viewer sees.',
    level: 'C', batch: 9, available: false,
  },

  // ── Part 5: Colour & Editing ───────────────────────────────
  {
    slug: 'colour-theory', number: '5.1', title: 'Colour Theory',
    summary: 'Harmonies, HSL, and how colour directs attention.',
    part: 5, partTitle: 'Colour & Editing', partDescription: 'From colour theory to a basic editing workflow.',
    level: 'A', batch: 10, available: false,
  },
  {
    slug: 'basic-editing-workflow', number: '5.2', title: 'Basic Editing Workflow',
    summary: 'An SVG filter pipeline: exposure, contrast, tone, colour, sharpen.',
    part: 5, partTitle: 'Colour & Editing', partDescription: 'From colour theory to a basic editing workflow.',
    level: 'A', batch: 10, available: false,
  },

  // ── Part 6: Cinematic ──────────────────────────────────────
  {
    slug: 'frame-rate-and-shutter-rule', number: '6.1', title: 'Frame Rate & the 180° Shutter Rule',
    summary: 'How shutter angle and frame rate create cinematic motion.',
    part: 6, partTitle: 'Cinematic', partDescription: 'Still photography becomes motion pictures.',
    level: 'A', batch: 11, available: false,
  },
  {
    slug: 'aspect-ratios-and-framing', number: '6.2', title: 'Aspect Ratios & Framing',
    summary: 'From 4:3 to anamorphic 2.39:1, with safe zones.',
    part: 6, partTitle: 'Cinematic', partDescription: 'Still photography becomes motion pictures.',
    level: 'B', batch: 11, available: false,
  },
  {
    slug: 'shot-sizes-and-camera-movement', number: '6.3', title: 'Shot Sizes & Camera Movement',
    summary: 'Pan, tilt, dolly, zoom, track — and the dolly zoom.',
    part: 6, partTitle: 'Cinematic', partDescription: 'Still photography becomes motion pictures.',
    level: 'A', batch: 11, available: false,
  },
  {
    slug: 'cinematic-lighting', number: '6.4', title: 'Cinematic Lighting',
    summary: 'Key, fill, rim — build lighting ratios for mood.',
    part: 6, partTitle: 'Cinematic', partDescription: 'Still photography becomes motion pictures.',
    level: 'A', batch: 11, available: false,
  },
  {
    slug: 'cinematic-cheat-sheet', number: '6.5', title: 'Part 6 Cheat Sheet & Quiz',
    summary: 'Shutter angle, aspect ratios, shot sizes, lighting ratios.',
    part: 6, partTitle: 'Cinematic', partDescription: 'Still photography becomes motion pictures.',
    level: 'C', batch: 11, available: false,
  },
];

/** Find a chapter by slug. */
export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

/** Get the previous and next available chapters for navigation. */
export function getAdjacentChapters(slug: string): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const available = CHAPTERS.filter((c) => c.available);
  const idx = available.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? available[idx - 1] : null,
    next: idx < available.length - 1 ? available[idx + 1] : null,
  };
}

/** All chapters grouped by part number. */
export function chaptersByPart(): Map<number, Chapter[]> {
  const map = new Map<number, Chapter[]>();
  for (const ch of CHAPTERS) {
    const list = map.get(ch.part) ?? [];
    list.push(ch);
    map.set(ch.part, list);
  }
  return map;
}
