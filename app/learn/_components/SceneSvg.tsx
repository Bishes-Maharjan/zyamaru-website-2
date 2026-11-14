import React from 'react';
import { CameraState } from '../_lib/useCameraState';
import { SCENE_LAYERS, VB_W, VB_H, FF_SENSOR_WIDTH_MM } from '../_lib/scene';
import {
  brightnessSlope,
  grainOpacity,
  blurDisc,
  blurToSvgStdDev,
  motionBlurPx,
  handheldLimit,
} from '../_lib/photo';

interface SceneSvgProps {
  camera: CameraState;
  offsetStops: number;
  className?: string;
  isTripod?: boolean;
}

export function SceneSvg({ camera, offsetStops, className = '', isTripod = false }: SceneSvgProps) {
  // 1. Brightness
  const slope = brightnessSlope(offsetStops);

  // 2. Grain
  const grainVal = grainOpacity(camera.iso);
  const showGrain = grainVal > 0;

  // 3. Depth of Field Blurs
  const getLayerBlur = (distanceM: number) => {
    const bMm = blurDisc(
      camera.focalLengthMm,
      camera.aperture,
      distanceM * 1000,
      camera.focusDistanceM * 1000
    );
    const blurSvg = blurToSvgStdDev(bMm, camera.sensorWidthMm, VB_W);
    // Limit max blur to prevent SVG performance death
    return Math.min(blurSvg, 30);
  };

  // 4. Motion Blur (subject only, horizontal)
  // Convert subject speed to pixels per second (very roughly assuming subject width in view)
  const pxPerMeter = VB_W / (camera.focusDistanceM * (camera.sensorWidthMm / camera.focalLengthMm));
  const speedPxS = camera.subjectSpeedMps * pxPerMeter;
  const mBlur = Math.min(motionBlurPx(speedPxS, camera.shutter) / 2, 100);

  // 5. Camera Shake (whole scene)
  const hhLimit = handheldLimit(camera.focalLengthMm, FF_SENSOR_WIDTH_MM / camera.sensorWidthMm);
  let shakeBlur = 0;
  if (!isTripod && camera.shutter > hhLimit) {
    shakeBlur = Math.min((camera.shutter / hhLimit) * 2, 15);
  }

  // Defs block for filters
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={`w-full h-auto bg-[#87ceeb] rounded-lg overflow-hidden shadow-md ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Global Brightness & Contrast Transfer */}
        <filter id="global-brightness" colorInterpolationFilters="linearRGB">
          <feComponentTransfer>
            <feFuncR type="linear" slope={slope} />
            <feFuncG type="linear" slope={slope} />
            <feFuncB type="linear" slope={slope} />
          </feComponentTransfer>
          {shakeBlur > 0 && <feGaussianBlur stdDeviation={shakeBlur} />}
        </filter>

        {/* Per-layer DOF blurs */}
        {SCENE_LAYERS.map((layer) => {
          const b = getLayerBlur(layer.distanceM);
          if (b < 0.5) return null;
          return (
            <filter key={`blur-${layer.id}`} id={`blur-${layer.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={b} />
            </filter>
          );
        })}

        {/* Motion blur for cyclist */}
        <filter id="motion-blur" x="-50%" y="-50%" width="200%" height="200%">
          {mBlur > 0.5 ? <feGaussianBlur stdDeviation={`${mBlur} 0`} /> : null}
        </filter>

        {/* Grain overlay */}
        {showGrain && (
          <filter id="film-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={grainVal} />
            </feComponentTransfer>
          </filter>
        )}
      </defs>

      <g filter="url(#global-brightness)">
        {/* Sky */}
        <rect
          width="100%"
          height="60%"
          fill="#5faadd"
          filter={getLayerBlur(10000) > 0.5 ? 'url(#blur-sky)' : undefined}
        />

        {/* Distant Hills */}
        <path
          d={`M0,${VB_H * 0.6} L150,${VB_H * 0.3} L350,${VB_H * 0.5} L600,${VB_H * 0.2} L${VB_W},${VB_H * 0.55} L${VB_W},${VB_H} L0,${VB_H} Z`}
          fill="#3b5d38"
          filter={getLayerBlur(100) > 0.5 ? 'url(#blur-background)' : undefined}
        />

        {/* Midground Tree */}
        <g filter={getLayerBlur(10) > 0.5 ? 'url(#blur-midground)' : undefined}>
          <rect x="650" y={VB_H * 0.4} width="20" height="200" fill="#4a3728" />
          <circle cx="660" cy={VB_H * 0.4} r="80" fill="#2d4c1e" />
          <circle cx="620" cy={VB_H * 0.35} r="60" fill="#3a5f27" />
          <circle cx="700" cy={VB_H * 0.38} r="70" fill="#223d16" />
        </g>

        {/* Cyclist (Moving Subject) */}
        <g
          transform={`translate(${VB_W * 0.3}, ${VB_H * 0.65})`}
          filter={
            mBlur > 0.5 && getLayerBlur(5) > 0.5
              ? 'url(#blur-cyclist) url(#motion-blur)'
              : mBlur > 0.5
              ? 'url(#motion-blur)'
              : getLayerBlur(5) > 0.5
              ? 'url(#blur-cyclist)'
              : undefined
          }
        >
          {/* Simple cyclist shape */}
          <circle cx="0" cy="0" r="15" fill="#e0e0e0" /> {/* Head */}
          <rect x="-10" y="15" width="20" height="40" fill="#cc3333" /> {/* Body */}
          <circle cx="-25" cy="65" r="25" fill="none" stroke="#333" strokeWidth="4" /> {/* Wheel 1 */}
          <circle cx="25" cy="65" r="25" fill="none" stroke="#333" strokeWidth="4" /> {/* Wheel 2 */}
          <line x1="-25" y1="65" x2="0" y2="45" stroke="#333" strokeWidth="4" /> {/* Frame */}
          <line x1="25" y1="65" x2="-5" y2="45" stroke="#333" strokeWidth="4" /> {/* Frame */}
          <line x1="-5" y1="45" x2="5" y2="15" stroke="#333" strokeWidth="4" /> {/* Handlebar stem */}
        </g>

        {/* Foreground Rock */}
        <path
          d={`M-50,${VB_H + 50} Q50,${VB_H * 0.7} 150,${VB_H * 0.85} T300,${VB_H + 50} Z`}
          fill="#444"
          filter={getLayerBlur(1.5) > 0.5 ? 'url(#blur-foreground)' : undefined}
        />
      </g>

      {/* Grain layer sits on top, covering everything */}
      {showGrain && <rect width="100%" height="100%" filter="url(#film-grain)" opacity="0.8" style={{ mixBlendMode: 'overlay' }} />}
    </svg>
  );
}
