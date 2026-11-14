'use client';
import React from 'react';
import { useCameraState } from '../_lib/useCameraState';
import { SceneSvg } from '../_components/SceneSvg';
import { IsoSlider } from '../_components/SettingSlider';
import { ChapterNav, SourcesFooter, WorkedExample } from '../_components/ChapterShared';
import { MiniQuiz, Challenge, LiveSummary } from '../_components/InteractiveShared';
import { getChapter } from '../_content/chapters';
import { ISO_FULL, formatISO } from '../_lib/photo';

export default function IsoAndNoisePage() {
  const chapter = getChapter('iso-and-noise');
  // Lock aperture and shutter, only allow ISO changes to see effect on brightness/grain
  const { state, setIso, offsetStops } = useCameraState({
    aperture: 5.6,
    shutter: 1/125,
    iso: 100,
    sceneEV: 10, // A slightly dim scene
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
          ISO measures the sensitivity of your camera's image sensor. The term itself is a historical carryover from the International Organization for Standardization, which created the speed ratings for analog film.
        </p>
        <p>
          In a modern digital camera, increasing the ISO doesn't magically make the sensor more sensitive to photons. Instead, it <strong>amplifies the electrical signal</strong> that the sensor has already captured. 
        </p>
        <div className="my-8 p-6 bg-amber/5 border-l-4 border-amber rounded-r-2xl">
          <p className="m-0 text-amber-light font-medium">
            The Catch: Amplification isn't perfect. When you amplify the signal (the light), you also amplify the random electronic interference (the noise) that is always present in the circuit.
          </p>
        </div>
        <p>
          Base ISO (usually ISO 100 or 200 depending on the camera) produces the cleanest, most vibrant image. As you double the ISO (e.g., 100 → 200 → 400), you mathematically double the brightness, but you simultaneously increase the visible grain and reduce the color fidelity and dynamic range.
        </p>
      </div>

      <div className="bg-bg-elevated p-8 md:p-10 rounded-3xl border border-border/50 mb-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-dark via-amber to-amber-light"></div>
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-text-primary">ISO Noise Simulator</h3>
          <p className="text-base text-text-secondary max-w-2xl">
            This scene is slightly dim. We have locked the Aperture and Shutter Speed. Increase the ISO to brighten the exposure, and observe how the image becomes progressively noisier (grainier) at higher values.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-xl overflow-hidden border border-border/50 bg-black relative">
              <SceneSvg camera={state} offsetStops={offsetStops} className="w-full h-auto" isTripod={true} />
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md font-mono text-sm text-text-primary border border-border/50 shadow-lg">
                EV Offset: {offsetStops > 0 ? '+' : ''}{offsetStops.toFixed(1)}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            <div className="bg-bg-card p-6 rounded-2xl border border-border/50 flex flex-col gap-5 shadow-inner">
              <div className="flex justify-between text-xs text-text-muted uppercase tracking-widest mb-1">
                <span>Locked Settings</span>
              </div>
              <div className="flex justify-between font-mono text-lg text-text-primary mb-3 px-2 py-3 bg-bg-elevated rounded-lg border border-border/30">
                <span>f/5.6</span>
                <span>1/125s</span>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-1" />
              <IsoSlider value={state.iso} onChange={setIso} options={ISO_FULL} />
            </div>

            <Challenge 
              goal="Increase the ISO until the exposure is correct (EV Offset is 0.0)."
              isSuccess={isExposed}
            />
          </div>
        </div>
        
        <LiveSummary message={
          state.iso >= 3200 ? "⚠️ Exposure is good, but notice the heavy digital noise (grain) introduced by high amplification. Colors may also appear washed out." :
          state.iso <= 400 && offsetStops < -1 ? "⚠️ The image is clean, but far too dark. The sensor needs more amplification to produce a usable image." :
          "✅ Good balance. Some modern full-frame sensors can handle ISO 800-1600 very cleanly without distracting noise."
        } />
      </div>

      <div className="prose prose-invert prose-lg max-w-none mb-16 text-text-secondary">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">When to embrace High ISO</h2>
        <p>
          If high ISO adds ugly noise and destroys dynamic range, why would you ever use it? Often, you simply have no choice. If you are shooting indoors, at night, or need an extremely fast shutter speed to freeze sports action, there isn't enough physical light reaching the sensor.
        </p>
        <blockquote className="border-l-4 border-amber pl-6 py-2 my-8 italic text-xl text-text-primary bg-bg-card/50 rounded-r-xl">
          "A noisy, sharp picture is always better than a clean, blurry picture."
        </blockquote>
        <p>
          Never be afraid to raise your ISO when the situation demands it. Modern noise reduction software (like Lightroom's AI Denoise or Topaz) can clean up ISO 6400 remarkably well, but no software can fix a photograph ruined by severe motion blur.
        </p>

        <h3 className="text-2xl font-heading font-bold text-text-primary mt-12 mb-4">The Mathematics Behind EV and ISO</h3>
        <p>
          Exposure Value (EV) can be calculated for any specific ISO setting. The standard formula uses ISO 100 as the baseline ($EV_{100}$). The mathematical relationship is logarithmic base-2, because every photographic "stop" exactly doubles or halves the amount of light.
        </p>
        <WorkedExample 
          formula="EV_S = EV_100 + log2(ISO / 100)"
          values="EV_100 = 10 (dim scene), ISO = 1600"
          result="EV_S = 10 + log2(16) = 10 + 4 = 14"
        />
      </div>

      <div className="mb-16">
        <MiniQuiz questions={[
          {
            question: "Which ISO setting will produce the cleanest image with the highest dynamic range?",
            options: ["ISO 100 (Base ISO)", "ISO 800", "ISO 6400"],
            answerIndex: 0,
            explanation: "ISO 100 (base ISO) requires the least electrical amplification, thereby producing the cleanest signal-to-noise ratio."
          }
        ]} />
      </div>

      <SourcesFooter sources={[
        "Sensor noise characteristics: Clarkvision.com - Digital Sensor Performance.",
        "EV at ISO math based on standard APEX system equations.",
        "Signal-to-noise ratio behavior in CMOS sensors."
      ]} />

      <ChapterNav chapter={chapter} />
    </div>
  );
}
