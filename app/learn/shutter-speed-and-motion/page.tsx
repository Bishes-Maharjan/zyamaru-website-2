'use client';
import React from 'react';
import { useCameraState } from '../_lib/useCameraState';
import { SceneSvg } from '../_components/SceneSvg';
import { ShutterSlider } from '../_components/SettingSlider';
import { ChapterNav, SourcesFooter, WorkedExample } from '../_components/ChapterShared';
import { MiniQuiz, Challenge, LiveSummary } from '../_components/InteractiveShared';
import { getChapter } from '../_content/chapters';
import { SHUTTER_FULL } from '../_lib/photo';

export default function ShutterSpeedPage() {
  const chapter = getChapter('shutter-speed-and-motion');
  const { state, setShutter, offsetStops } = useCameraState({
    aperture: 4,
    iso: 400,
    shutter: 1/8, // Start dangerously slow
    sceneEV: 11,
    focalLengthMm: 50,
    sensorWidthMm: 36, // Full frame
    subjectSpeedMps: 8, // Cyclist speed
  });

  const isShakeFree = state.shutter <= 1/60;
  const isSubjectFrozen = state.shutter <= 1/500;
  const isSuccess = isShakeFree && isSubjectFrozen;

  if (!chapter) return null;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <header className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs uppercase tracking-widest font-semibold mb-6">
          Chapter {chapter.number}
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight text-text-primary">
          {chapter.title}
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
          {chapter.summary}
        </p>
      </header>

      <div className="prose prose-invert prose-lg max-w-none mb-16 text-text-secondary">
        <p className="lead text-xl text-text-primary font-medium">
          Shutter speed is the literal length of time your camera's sensor is exposed to light. It acts as a physical or electronic curtain that opens and closes in fractions of a second.
        </p>
        <p>
          While aperture controls light via the <em>size</em> of the opening, shutter speed controls it via <em>time</em>. Because subjects and photographers are rarely perfectly still, time introduces a profound side-effect into photography: <strong className="text-amber">Motion Blur</strong>.
        </p>
        <div className="my-8 p-6 bg-bg-card border border-border/50 rounded-2xl">
          <h4 className="text-text-primary font-bold mb-2">The Two Types of Motion Blur</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-amber text-xl mt-1">1.</span>
              <span><strong>Subject Blur:</strong> When your subject moves across the frame while the shutter is open. This can ruin a sports shot or create a beautiful, smooth waterfall effect.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber text-xl mt-1">2.</span>
              <span><strong>Camera Shake:</strong> When your hands wobble while holding the camera. This smears the <em>entire</em> scene globally, making the image look soft or out of focus.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-bg-elevated p-8 md:p-10 rounded-3xl border border-border/50 mb-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-dark via-amber to-amber-light"></div>
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-text-primary">Motion Blur Simulator</h3>
          <p className="text-base text-text-secondary max-w-2xl">
            A cyclist is moving across your frame at 29 km/h (8 m/s). You are shooting handheld with a 50mm lens. 
            Notice how slow shutter speeds induce global camera shake, while medium speeds cure the shake but still fail to freeze the cyclist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-xl overflow-hidden border border-border/50 bg-black relative">
              <SceneSvg 
                camera={state} 
                offsetStops={offsetStops} 
                className="w-full h-auto transition-all duration-300" 
                isTripod={false} 
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {!isShakeFree && <span className="px-2 py-1 bg-red-500/80 backdrop-blur-md rounded text-white text-xs font-bold uppercase tracking-wider">Camera Shake</span>}
                {!isSubjectFrozen && isShakeFree && <span className="px-2 py-1 bg-amber-500/80 backdrop-blur-md rounded text-white text-xs font-bold uppercase tracking-wider">Subject Blur</span>}
                {isSuccess && <span className="px-2 py-1 bg-green-500/80 backdrop-blur-md rounded text-white text-xs font-bold uppercase tracking-wider">Completely Frozen</span>}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            <div className="bg-bg-card p-6 rounded-2xl border border-border/50 flex flex-col gap-5 shadow-inner">
              <div className="flex justify-between text-xs text-text-muted uppercase tracking-widest mb-1">
                <span>Locked Settings</span>
              </div>
              <div className="flex justify-between font-mono text-lg text-text-primary mb-3 px-2 py-3 bg-bg-elevated rounded-lg border border-border/30">
                <span>f/4</span>
                <span>ISO 400</span>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-1" />
              <ShutterSlider value={state.shutter} onChange={setShutter} options={SHUTTER_FULL} />
            </div>

            <Challenge 
              goal="Increase the shutter speed until the whole scene is sharp (no shake) AND the cyclist is completely frozen."
              isSuccess={isSuccess}
            />
          </div>
        </div>
        
        <LiveSummary message={
          !isShakeFree ? "⚠️ The shutter speed is too slow to handhold a 50mm lens. The entire scene is vibrating with camera shake." :
          !isSubjectFrozen ? "⚠️ Camera shake is eliminated, but the cyclist is still moving too fast across the frame. Go faster!" :
          "✅ Perfect! The shutter is fast enough to neutralize your hand movements AND freeze the fast-moving cyclist in mid-air."
        } />
      </div>

      <div className="prose prose-invert prose-lg max-w-none mb-16 text-text-secondary">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">The Reciprocal Rule</h2>
        <p>
          Exactly how slow can you shoot without using a tripod before your hand movements ruin the shot? A classic photographic rule of thumb is the <strong>Reciprocal Rule</strong>:
        </p>
        <blockquote className="border-l-4 border-amber pl-6 py-2 my-8 italic text-xl text-text-primary bg-bg-card/50 rounded-r-xl">
          Your shutter speed denominator must be at least your lens's focal length.
        </blockquote>
        <p>
          If you are using a <strong>50mm</strong> lens, you need at least <strong>1/50s</strong> (so you round up to 1/60s). If you zoom in to a massive <strong>200mm</strong> sports lens, your tiny hand micro-jitter is magnified immensely, meaning you need at least <strong>1/200s</strong> (or 1/250s) just to keep the background sharp.
        </p>
        <p className="text-sm italic text-text-muted border-t border-border/50 pt-4">
          Note: Modern cameras and lenses often feature optical or in-body Image Stabilization (OIS/IBIS). This acts as a dampener, effectively allowing you to break the reciprocal rule by 3 to 7 stops depending on the technology. However, IBIS cannot freeze a moving subject—it only cures your own hand shake.
        </p>

        <h3 className="text-2xl font-heading font-bold text-text-primary mt-12 mb-4">Mathematics of the Handheld Limit</h3>
        <WorkedExample 
          formula="Limit(s) = 1 / (FocalLength_mm × CropFactor)"
          values="FocalLength = 50mm, Full Frame Sensor (Crop = 1.0)"
          result="1 / 50 = 0.02s (1/50s)"
        />
      </div>

      <div className="mb-16">
        <MiniQuiz questions={[
          {
            question: "You are photographing a fast-flying eagle with a 200mm lens. Which shutter speed is most appropriate to ensure the bird's wings are perfectly frozen?",
            options: ["1/15s", "1/250s", "1/2000s"],
            answerIndex: 2,
            explanation: "While 1/250s will cure your own camera shake (via the reciprocal rule), fast action requires very fast shutter speeds (like 1/1000s or 1/2000s) to freeze the subject itself."
          }
        ]} />
      </div>

      <SourcesFooter sources={[
        "The Reciprocal Rule: Standard photography principle.",
        "Motion blur velocity formulas: Derived from pixel-pitch and subject velocity across the focal plane.",
        "Image stabilization compensation theory."
      ]} />

      <ChapterNav chapter={chapter} />
    </div>
  );
}
