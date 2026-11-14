/**
 * Scene model for the SVG playgrounds.
 * Contains layer metadata, EV presets and histogram regions.
 * Actual SVG rendering lives in _components/SceneSvg.tsx.
 */

// ── Layer metadata ───────────────────────────────────────────

export interface SceneLayer {
  id: string;
  label: string;
  /** Distance from the camera in metres */
  distanceM: number;
  /** Luminance in stops relative to mid-grey (0 = 18 % grey) */
  luminanceStops: number;
}

/** Default outdoor scene layers used by the main playground. */
export const SCENE_LAYERS: readonly SceneLayer[] = [
  { id: 'sky',        label: 'Sky',              distanceM: 10_000, luminanceStops:  4 },
  { id: 'background', label: 'Distant hills',    distanceM: 100,    luminanceStops: -1 },
  { id: 'midground',  label: 'Tree',             distanceM: 10,     luminanceStops: -2 },
  { id: 'subject',    label: 'Subject (person)',  distanceM: 3,      luminanceStops:  0 },
  { id: 'cyclist',    label: 'Cyclist (moving)',  distanceM: 5,      luminanceStops:  0 },
  { id: 'foreground', label: 'Foreground rock',   distanceM: 1.5,    luminanceStops: -1.5 },
];

// ── Scene EV presets ─────────────────────────────────────────

export interface SceneEVPreset {
  label: string;
  ev100: number;
}

export const SCENE_EV_PRESETS: readonly SceneEVPreset[] = [
  { label: 'Bright sun',     ev100: 15 },
  { label: 'Overcast',       ev100: 12 },
  { label: 'Indoor window',  ev100: 7 },
  { label: 'Street at night', ev100: 3 },
];

// ── Histogram regions ────────────────────────────────────────
// Each region defines part of the scene with a base luminance
// (stops from mid-grey) and the fraction of the frame it covers.
// After applying the exposure offset, regions are binned into
// 64 histogram bins and rendered as an analytic SVG histogram.

export interface HistogramRegion {
  luminanceStops: number;
  areaFraction: number;
}

export const DEFAULT_HISTOGRAM_REGIONS: readonly HistogramRegion[] = [
  { luminanceStops:  4.0, areaFraction: 0.08 }, // sky highlights
  { luminanceStops:  2.5, areaFraction: 0.12 }, // sky mid
  { luminanceStops:  3.0, areaFraction: 0.04 }, // clouds
  { luminanceStops: -1.0, areaFraction: 0.14 }, // hills (shadow side)
  { luminanceStops: -2.5, areaFraction: 0.08 }, // tree shadow
  { luminanceStops: -0.5, areaFraction: 0.06 }, // tree lit
  { luminanceStops:  0.0, areaFraction: 0.10 }, // subject (skin ≈ 18 %)
  { luminanceStops: -1.0, areaFraction: 0.08 }, // subject clothing
  { luminanceStops:  0.0, areaFraction: 0.06 }, // cyclist
  { luminanceStops: -1.5, areaFraction: 0.10 }, // foreground rock
  { luminanceStops: -0.5, areaFraction: 0.14 }, // ground
];

// ── Subject speed presets (m/s) ──────────────────────────────

export interface SubjectSpeedPreset {
  label: string;
  speedMps: number;
}

export const SUBJECT_SPEEDS: readonly SubjectSpeedPreset[] = [
  { label: 'Walking (1.4 m/s)',  speedMps: 1.4 },
  { label: 'Running (3.5 m/s)',  speedMps: 3.5 },
  { label: 'Cyclist (8 m/s)',    speedMps: 8 },
  { label: 'Car (14 m/s)',       speedMps: 14 },
];

// ── Constants ────────────────────────────────────────────────

/** SVG viewBox dimensions (shared by all playgrounds). */
export const VB_W = 800;
export const VB_H = 500;

/** Full-frame sensor width in mm. */
export const FF_SENSOR_WIDTH_MM = 36;
