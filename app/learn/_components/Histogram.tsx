'use client';
import React, { useMemo } from 'react';
import { CameraState } from '../_lib/useCameraState';
import { SCENE_LAYERS } from '../_lib/scene';
import { exposureOffset } from '../_lib/photo';

interface HistogramProps {
  camera: CameraState;
  offsetStops: number;
}

export function Histogram({ camera, offsetStops }: HistogramProps) {
  // We'll generate a simulated histogram based on the scene layers and the current offset.
  // Each layer has a base luminanceEV.
  
  const bins = useMemo(() => {
    const numBins = 50;
    const binCounts = new Array(numBins).fill(0);
    
    // Simulate pixels. Sky is bright, rocks are dark, etc.
    // Instead of rendering a real image and counting pixels, we just drop some Gaussian bumps 
    // at the EV values of the layers, shifted by offsetStops.
    
    SCENE_LAYERS.forEach(layer => {
      // Map baseEV + offset to a bin.
      // Let's say a correctly exposed mid-gray is EV 0 relative to meter.
      // The meter centers on sceneEV.
      const relativeEV = layer.luminanceStops + offsetStops;
      
      // EV range on histogram: -4 to +4 (roughly).
      // Let's map -4 EV to bin 0, +4 EV to bin 49.
      const centerBin = Math.round(((relativeEV + 4) / 8) * (numBins - 1));
      
      // Add a bump of width `spread` (simulating texture/variance in that layer)
      const spread = 2; // bins
      const weight = layer.id === 'sky' ? 40 : layer.id === 'background' ? 30 : 20; // rough area
      
      for (let i = 0; i < numBins; i++) {
        const dist = Math.abs(i - centerBin);
        if (dist < spread * 3) {
          binCounts[i] += weight * Math.exp(-(dist * dist) / (2 * spread * spread));
        }
      }
    });
    
    // Add some clipping spikes if data falls off the edges
    let under = 0;
    let over = 0;
    
    SCENE_LAYERS.forEach(layer => {
      const relativeEV = layer.luminanceStops + offsetStops;
      if (relativeEV < -4) under += (layer.id === 'sky' ? 40 : 20) * Math.min(Math.abs(relativeEV + 4), 3);
      if (relativeEV > 4) over += (layer.id === 'sky' ? 40 : 20) * Math.min(relativeEV - 4, 3);
    });
    
    binCounts[0] += under;
    binCounts[numBins - 1] += over;

    return binCounts;
  }, [camera.sceneEV, offsetStops]);

  const maxCount = Math.max(...bins, 1); // Avoid division by zero

  // Determine clipping
  const isUnderexposed = bins[0] > maxCount * 0.2;
  const isOverexposed = bins[bins.length - 1] > maxCount * 0.2;

  return (
    <div className="bg-bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
        <span>Histogram</span>
        <div className="flex gap-3">
          {isUnderexposed && <span className="text-blue-400 animate-pulse">Crushed Shadows</span>}
          {isOverexposed && <span className="text-red-400 animate-pulse">Blown Highlights</span>}
        </div>
      </div>
      
      <div className="h-24 w-full flex items-end gap-[1px] bg-bg relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex justify-between">
          <div className="w-px h-full bg-border/50"></div>
          <div className="w-px h-full bg-border/50"></div>
          <div className="w-px h-full bg-border/50"></div>
          <div className="w-px h-full bg-border/50"></div>
          <div className="w-px h-full bg-border/50"></div>
        </div>
        
        {/* Bars */}
        {bins.map((count, i) => {
          const heightPct = (count / maxCount) * 100;
          
          let color = 'bg-text-muted';
          if (i === 0 && isUnderexposed) color = 'bg-blue-500';
          else if (i === bins.length - 1 && isOverexposed) color = 'bg-red-500';
          
          return (
            <div 
              key={i} 
              className={`flex-1 ${color} rounded-t-sm opacity-80 z-10 transition-all duration-300 ease-out`}
              style={{ height: `${Math.min(100, Math.max(2, heightPct))}%` }}
            />
          );
        })}
      </div>
      
      <div className="flex justify-between text-[10px] text-text-muted px-1 mt-1 font-mono">
        <span>Blacks</span>
        <span>Shadows</span>
        <span>Midtones</span>
        <span>Highlights</span>
        <span>Whites</span>
      </div>
    </div>
  );
}
