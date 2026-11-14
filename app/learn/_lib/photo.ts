/**
 * Photography maths — pure functions, no UI code.
 * Functions are added as chapters require them.
 * Since there is no test runner, five worked examples with expected
 * values appear at the bottom of the file for manual verification.
 */

// ═══════════════════════════════════════════════════════════════
//  Stop-value lists
// ═══════════════════════════════════════════════════════════════

/** Full-stop aperture values (f-numbers) */
export const APERTURE_FULL: readonly number[] = [
  1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22,
];

/**
 * Third-stop aperture values.
 * Generated from √2^(k/3) and rounded to conventional markings.
 */
export const APERTURE_THIRDS: readonly number[] = [
  1, 1.1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.5, 2.8, 3.2, 3.5, 4,
  4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22,
];

/** Full-stop shutter speeds in seconds */
export const SHUTTER_FULL: readonly number[] = [
  1 / 4000, 1 / 2000, 1 / 1000, 1 / 500, 1 / 250, 1 / 125,
  1 / 60, 1 / 30, 1 / 15, 1 / 8, 1 / 4, 1 / 2, 1, 2, 4, 8, 15, 30,
];

/** Third-stop shutter speeds in seconds */
export const SHUTTER_THIRDS: readonly number[] = [
  1 / 8000, 1 / 6400, 1 / 5000, 1 / 4000, 1 / 3200, 1 / 2500,
  1 / 2000, 1 / 1600, 1 / 1250, 1 / 1000, 1 / 800, 1 / 640,
  1 / 500, 1 / 400, 1 / 320, 1 / 250, 1 / 200, 1 / 160, 1 / 125,
  1 / 100, 1 / 80, 1 / 60, 1 / 50, 1 / 40, 1 / 30, 1 / 25,
  1 / 20, 1 / 15, 1 / 13, 1 / 10, 1 / 8, 1 / 6, 1 / 5, 1 / 4,
  0.3, 0.4, 1 / 2, 0.6, 0.8, 1, 1.3, 1.6, 2, 2.5, 3.2, 4, 5, 6,
  8, 10, 13, 15, 20, 25, 30,
];

/** Full-stop ISO values */
export const ISO_FULL: readonly number[] = [
  100, 200, 400, 800, 1600, 3200, 6400, 12800,
];

/** Third-stop ISO values */
export const ISO_THIRDS: readonly number[] = [
  100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250,
  1600, 2000, 2500, 3200, 4000, 5000, 6400, 8000, 10000, 12800,
];

// ═══════════════════════════════════════════════════════════════
//  Utility
// ═══════════════════════════════════════════════════════════════

/** Snap a numeric value to the nearest entry in a sorted stop list (log-distance). */
export function snapToNearest(value: number, stops: readonly number[]): number {
  let best = stops[0];
  let bestDist = Math.abs(Math.log2(value / best));
  for (let i = 1; i < stops.length; i++) {
    const dist = Math.abs(Math.log2(value / stops[i]));
    if (dist < bestDist) {
      best = stops[i];
      bestDist = dist;
    }
  }
  return best;
}

// ═══════════════════════════════════════════════════════════════
//  Exposure  (Chapter 1.1)
// ═══════════════════════════════════════════════════════════════

/** EV at ISO 100: log₂(N² / t) */
export function ev100(N: number, t: number): number {
  return Math.log2((N * N) / t);
}

/** EV adjusted for ISO: ev100 − log₂(ISO / 100) */
export function evAtISO(N: number, t: number, iso: number): number {
  return ev100(N, t) - Math.log2(iso / 100);
}

/**
 * Stops of over / under-exposure.
 * Positive → overexposed (too bright). Negative → underexposed (too dark).
 */
export function exposureOffset(
  sceneEV100: number,
  N: number,
  t: number,
  iso: number,
): number {
  return sceneEV100 - evAtISO(N, t, iso);
}

// ═══════════════════════════════════════════════════════════════
//  Solvers  (auto-exposure helpers)
// ═══════════════════════════════════════════════════════════════

/** Solve shutter for correct exposure: t = 100·N² / (ISO·2^EV) */
export function solveShutter(sceneEV: number, N: number, iso: number): number {
  return (100 * N * N) / (iso * Math.pow(2, sceneEV));
}

/** Solve aperture: N = √(t·2^EV·ISO / 100) */
export function solveAperture(sceneEV: number, t: number, iso: number): number {
  return Math.sqrt((t * Math.pow(2, sceneEV) * iso) / 100);
}

/** Solve ISO: ISO = 100·N² / (t·2^EV) */
export function solveISO(sceneEV: number, N: number, t: number): number {
  return (100 * N * N) / (t * Math.pow(2, sceneEV));
}

// ═══════════════════════════════════════════════════════════════
//  Equivalence & stops  (Chapter 1.1 / 1.2)
// ═══════════════════════════════════════════════════════════════

/** Stops of light difference between two aperture values: 2·log₂(N₂/N₁). */
export function stopsBetween(N1: number, N2: number): number {
  return 2 * Math.log2(N2 / N1);
}

/**
 * Generate equivalent-exposure combinations for a target EV, snapped to
 * the given stop lists.  Keeps results within ±0.4 stop.
 */
export function equivalentExposures(
  targetEV: number,
  apertureStops: readonly number[],
  shutterStops: readonly number[],
  isoStops: readonly number[],
): Array<{ aperture: number; shutter: number; iso: number }> {
  const results: Array<{ aperture: number; shutter: number; iso: number }> = [];
  for (const N of apertureStops) {
    for (const iso of isoStops) {
      const t = solveShutter(targetEV, N, iso);
      const snapped = snapToNearest(t, shutterStops);
      const resultEV = evAtISO(N, snapped, iso);
      if (Math.abs(resultEV - targetEV) < 0.4) {
        results.push({ aperture: N, shutter: snapped, iso });
      }
    }
  }
  return results;
}

// ═══════════════════════════════════════════════════════════════
//  Motion  (Chapter 1.3)
// ═══════════════════════════════════════════════════════════════

/**
 * Handheld rule: minimum shutter speed to avoid camera shake.
 * Returns time in seconds.
 */
export function handheldLimit(focalLengthMm: number, crop: number = 1): number {
  return 1 / (focalLengthMm * crop);
}

/** Motion blur length in pixels. */
export function motionBlurPx(
  subjectSpeedPxPerSec: number,
  shutterSec: number,
): number {
  return subjectSpeedPxPerSec * shutterSec;
}

// ═══════════════════════════════════════════════════════════════
//  Depth of field  (used by SVG DOF effect)
// ═══════════════════════════════════════════════════════════════

/**
 * Blur disc diameter on the sensor (mm).
 * b = f² × |d − s| / (N × d × (s − f))
 *
 * @param f  focal length mm
 * @param N  f-number
 * @param d  object distance mm
 * @param s  focus distance mm
 */
export function blurDisc(f: number, N: number, d: number, s: number): number {
  if (d === s) return 0;
  const denom = N * d * (s - f);
  if (denom === 0) return Infinity;
  return (f * f * Math.abs(d - s)) / Math.abs(denom);
}

/** Hyperfocal distance in mm. c = circle of confusion diameter (mm). */
export function hyperfocal(f: number, N: number, c: number): number {
  return (f * f) / (N * c) + f;
}

/** Near and far DOF limits in mm. */
export function dof(
  f: number,
  N: number,
  s: number,
  c: number,
): { near: number; far: number; total: number } {
  const H = hyperfocal(f, N, c);
  const near = (s * (H - f)) / (H + s - 2 * f);
  const far = s >= H ? Infinity : (s * (H - f)) / (H - s);
  return { near, far, total: far === Infinity ? Infinity : far - near };
}

// ═══════════════════════════════════════════════════════════════
//  Aperture geometry  (Chapter 1.2)
// ═══════════════════════════════════════════════════════════════

/** Physical aperture diameter: D = f / N (mm) */
export function apertureDiameter(focalLengthMm: number, N: number): number {
  return focalLengthMm / N;
}

/** Aperture area in mm² */
export function apertureArea(focalLengthMm: number, N: number): number {
  const d = apertureDiameter(focalLengthMm, N);
  return Math.PI * (d / 2) * (d / 2);
}

/** Relative light as fraction of maximum (f/1): 1/N² */
export function relativeLight(N: number): number {
  return 1 / (N * N);
}

// ═══════════════════════════════════════════════════════════════
//  Sensor  (shared)
// ═══════════════════════════════════════════════════════════════

/** Crop factor from sensor diagonal (mm). Full-frame diagonal ≈ 43.27 mm. */
export function cropFactor(diagonalMm: number): number {
  return 43.27 / diagonalMm;
}

// ═══════════════════════════════════════════════════════════════
//  SVG effect helpers  (shared engine)
// ═══════════════════════════════════════════════════════════════

/**
 * Brightness slope for `<feComponentTransfer type="linear">`.
 * slope = 2^(exposureOffset), clamped to ±6 stops.
 *
 * SVG `color-interpolation-filters` defaults to linearRGB, which is
 * physically correct for this multiplicative brightness model.
 */
export function brightnessSlope(offset: number): number {
  const clamped = Math.max(-6, Math.min(6, offset));
  return Math.pow(2, clamped);
}

/**
 * Grain overlay opacity from ISO.
 * Formula: clamp(0.02 + 0.08 × log₂(ISO/100), 0, 0.6)
 */
export function grainOpacity(iso: number): number {
  if (iso <= 100) return 0.02;
  return Math.max(0, Math.min(0.6, 0.02 + 0.08 * Math.log2(iso / 100)));
}

/**
 * Convert a blur disc diameter (mm on sensor) to SVG stdDeviation.
 * stdDeviation ≈ half the disc, scaled from sensor to viewBox.
 */
export function blurToSvgStdDev(
  discMm: number,
  sensorWidthMm: number,
  viewBoxWidth: number,
): number {
  return (discMm / sensorWidthMm) * viewBoxWidth / 2;
}

// ═══════════════════════════════════════════════════════════════
//  Display formatting
// ═══════════════════════════════════════════════════════════════

export function formatShutter(t: number): string {
  if (t >= 1) {
    return Number.isInteger(t) ? `${t}"` : `${parseFloat(t.toFixed(1))}"`;
  }
  const reciprocal = Math.round(1 / t);
  return `1/${reciprocal}`;
}

export function formatAperture(N: number): string {
  return N === Math.round(N) ? `f/${N}` : `f/${N.toFixed(1)}`;
}

export function formatISO(iso: number): string {
  return `ISO ${iso}`;
}

export function formatEV(ev: number): string {
  const sign = ev >= 0 ? '+' : '';
  return `${sign}${ev.toFixed(1)} EV`;
}

/*
 * ═══════════════════════════════════════════════════════════════
 *  WORKED EXAMPLES  (manual verification — no test runner)
 * ═══════════════════════════════════════════════════════════════
 *
 * 1. Equivalent exposure (Ch 1.1)
 *    ev100(8, 1/125)  = log₂(64 × 125) = log₂(8000)  ≈ 12.97
 *    ev100(4, 1/500)  = log₂(16 × 500) = log₂(8000)  ≈ 12.97
 *    Same EV, shallower DOF, faster shutter. ✓
 *
 * 2. Sunny-16 sanity (Ch 1.1)
 *    exposureOffset(15, 16, 1/125, 100)
 *      evAtISO = log₂(256 × 125)  ≈ 14.97
 *      offset  = 15 − 14.97       ≈ +0.03   (≈ 0) ✓
 *
 * 3. Aperture stops (Ch 1.2)
 *    stopsBetween(2.8, 4)  = 2 × log₂(4/2.8) ≈ 1.03  (≈ 1 stop) ✓
 *    stopsBetween(1.4, 16) = 2 × log₂(16/1.4) ≈ 7.03  (7 stops) ✓
 *
 * 4. Motion & handheld (Ch 1.3)
 *    handheldLimit(200, 1) = 1/200 = 0.005 s ✓
 *    motionBlurPx(1500, 1/250) = 6 px  ✓
 *    motionBlurPx(1500, 1/30)  = 50 px ✓
 *
 * 5. DOF / hyperfocal (shared engine)
 *    hyperfocal(50, 1.8, 0.03) = 2500/0.054 + 50 = 46 346 mm ≈ 46.3 m ✓
 *    dof(50, 1.8, 2000, 0.03):
 *      H = 46 346
 *      near = 2000 × 46 296 / 48 246 ≈ 1 919 mm ≈ 1.92 m ✓
 *      far  = 2000 × 46 296 / 44 346 ≈ 2 088 mm ≈ 2.09 m ✓
 *      total ≈ 169 mm ≈ 17 cm ✓
 */
