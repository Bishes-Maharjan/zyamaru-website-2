'use client';
import React from 'react';
import { useCameraState } from '../_lib/useCameraState';
import { SceneSvg } from '../_components/SceneSvg';
import { ApertureSlider, ShutterSlider, IsoSlider } from '../_components/SettingSlider';
import { ReadoutPanel } from '../_components/ReadoutPanel';
import { Histogram } from '../_components/Histogram';
import { ChapterNav, SourcesFooter } from '../_components/ChapterShared';
import { MiniQuiz, Challenge, LiveSummary } from '../_components/InteractiveShared';
import { getChapter } from '../_content/chapters';
import { APERTURE_FULL, SHUTTER_FULL, ISO_FULL } from '../_lib/photo';

export default function ExposureTrianglePage() {
  const chapter = getChapter('exposure-triangle');
  const { state, setAperture, setShutter, setIso, offsetStops } = useCameraState({
    aperture: 8,
    shutter: 1/125,
    iso: 100,
    sceneEV: 12,
  });

  const isExposed = Math.abs(offsetStops) < 0.5;

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
          The exposure triangle is the absolute foundation of all photography and cinematography. Before you worry about composition, lighting, or directing subjects, you must master the mechanics of how your camera records light.
        </p>
        <p>
          It consists of three fundamental variables: 
          <strong className="text-amber"> Aperture</strong>, <strong className="text-amber">Shutter Speed</strong>, and <strong className="text-amber">ISO</strong>. 
          Together, they control exactly how much light reaches your camera's sensor, determining how bright or dark your final image will be.
        </p>
        
        <div className="my-10 p-8 bg-bg-card border border-border/50 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-4 relative z-10">The Bucket Analogy</h3>
          <p className="relative z-10 mb-4">
            Think of capturing an image like filling a bucket with a hose:
          </p>
          <ul className="space-y-3 relative z-10">
            <li className="flex items-start gap-3">
              <span className="text-amber text-xl">1.</span>
              <span><strong>Aperture</strong> is the width of the hose. A wider hose lets more water through at once.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber text-xl">2.</span>
              <span><strong>Shutter Speed</strong> is how long you leave the water running.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber text-xl">3.</span>
              <span><strong>ISO</strong> is the sensitivity of the bucket (in digital terms, it's amplification after the fact).</span>
            </li>
          </ul>
          <p className="mt-4 text-sm italic relative z-10">
            If you open the aperture wider (letting in more light), you have to use a faster shutter speed (less time) to keep the same amount of water (light) in the bucket.
          </p>
        </div>
      </div>

      <div className="bg-bg-elevated p-8 md:p-10 rounded-3xl border border-border/50 mb-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-dark via-amber to-amber-light"></div>
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-text-primary">Exposure Simulator</h3>
          <p className="text-base text-text-secondary max-w-2xl">
            You are in manual mode (M). Adjust the three sliders below to balance the exposure. Watch how the meter on the LCD panel reacts, and see the simulated histogram shift as the image gets brighter or darker.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-xl overflow-hidden border border-border/50 bg-black">
              <SceneSvg camera={state} offsetStops={offsetStops} className="w-full h-auto" isTripod={true} />
            </div>
            <Histogram camera={state} offsetStops={offsetStops} />
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ReadoutPanel camera={state} offsetStops={offsetStops} />
            
            <div className="bg-bg-card p-6 rounded-2xl border border-border/50 flex flex-col gap-5 shadow-inner">
              <ApertureSlider value={state.aperture} onChange={setAperture} options={APERTURE_FULL} />
              <ShutterSlider value={state.shutter} onChange={setShutter} options={SHUTTER_FULL} />
              <IsoSlider value={state.iso} onChange={setIso} options={ISO_FULL} />
            </div>

            <Challenge 
              goal="Adjust the settings until the exposure meter reads exactly 0 EV (correct exposure)."
              isSuccess={isExposed}
            />
          </div>
        </div>
        
        <LiveSummary message={
          offsetStops > 1 ? "⚠️ The image is overexposed (too bright). Try a faster shutter speed, narrower aperture (higher f-number), or lower ISO." :
          offsetStops < -1 ? "⚠️ The image is underexposed (too dark). Try a slower shutter speed, wider aperture (lower f-number), or higher ISO." :
          "✅ The image is correctly exposed! Notice how the histogram is well-centered with no clipping on the edges."
        } />
      </div>

      <div className="prose prose-invert prose-lg max-w-none mb-16 text-text-secondary">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">The Trade-offs: Why we don't just use one setting</h2>
        <p>
          If exposure was purely about getting the right amount of light, cameras would only need a single brightness dial. 
          But each of these three settings introduces a profound <em>creative side-effect</em> that fundamentally alters how your image feels.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
          <div className="p-6 bg-bg-card rounded-2xl border border-border/50 hover:border-amber/50 transition-colors group">
            <div className="w-12 h-12 bg-amber/10 text-amber rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h4 className="text-lg font-bold text-text-primary mb-2">Aperture</h4>
            <p className="text-sm text-text-muted">Controls Depth of Field. Determines how much of the background is blurry vs sharp.</p>
          </div>
          
          <div className="p-6 bg-bg-card rounded-2xl border border-border/50 hover:border-amber/50 transition-colors group">
            <div className="w-12 h-12 bg-amber/10 text-amber rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="text-lg font-bold text-text-primary mb-2">Shutter Speed</h4>
            <p className="text-sm text-text-muted">Controls Motion Blur. Determines whether a moving subject is frozen in time or smeared.</p>
          </div>
          
          <div className="p-6 bg-bg-card rounded-2xl border border-border/50 hover:border-amber/50 transition-colors group">
            <div className="w-12 h-12 bg-amber/10 text-amber rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h4 className="text-lg font-bold text-text-primary mb-2">ISO</h4>
            <p className="text-sm text-text-muted">Controls Image Noise. Determines how clean or grainy/noisy the final image appears.</p>
          </div>
        </div>
        
        <p>
          In the subsequent chapters of this masterclass, we will isolate each of these settings one by one to understand their side-effects in complete detail.
        </p>
      </div>

      <div className="mb-16">
        <MiniQuiz questions={[
          {
            question: "If your image is too dark (underexposed), which of the following changes will NOT make it brighter?",
            options: [
              "Opening the aperture wider (e.g. going from f/8 to f/4)",
              "Using a faster shutter speed (e.g. going from 1/60 to 1/250)",
              "Increasing the ISO (e.g. going from 100 to 400)"
            ],
            answerIndex: 1,
            explanation: "A faster shutter speed lets light in for a shorter amount of time, which actually makes the image darker, not brighter. To brighten it, you would need a slower shutter speed."
          }
        ]} />
      </div>

      <SourcesFooter sources={[
        "Understanding Exposure (4th Edition) by Bryan Peterson.",
        "Histogram interpretation based on standard digital sensor clipping behavior.",
        "Sensitometry and exposure calculations derived from the APEX system."
      ]} />

      <ChapterNav chapter={chapter} />
    </div>
  );
}
