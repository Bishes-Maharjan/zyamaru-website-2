'use client';
import React from 'react';
import { CameraState } from '../_lib/useCameraState';
import { formatAperture, formatShutter, formatISO, formatEV } from '../_lib/photo';

interface ReadoutPanelProps {
  camera: CameraState;
  offsetStops: number;
}

export function ReadoutPanel({ camera, offsetStops }: ReadoutPanelProps) {
  // Exposure meter dots (-3 to +3)
  const meterMin = -3;
  const meterMax = 3;
  
  // Calculate which dot to illuminate
  const clampedOffset = Math.max(meterMin, Math.min(meterMax, offsetStops));
  // Snap to nearest 1/3 stop for display
  const displayOffset = Math.round(clampedOffset * 3) / 3;

  return (
    <div className="bg-[#111] border-2 border-[#333] rounded-md p-4 font-mono shadow-inner text-green-500 w-full max-w-sm mx-auto flex flex-col gap-4">
      {/* Top row: Settings */}
      <div className="flex justify-between items-center text-xl sm:text-2xl font-bold tracking-tight">
        <div className="w-1/3 text-left">{formatShutter(camera.shutter)}</div>
        <div className="w-1/3 text-center">{formatAperture(camera.aperture)}</div>
        <div className="w-1/3 text-right">{formatISO(camera.iso)}</div>
      </div>

      {/* Bottom row: Meter and mode */}
      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-500">M</div>
        
        {/* Exposure Meter */}
        <div className="flex-1 px-4 flex flex-col items-center">
          <div className="relative h-4 flex items-center justify-between w-full max-w-[200px]">
            {/* Base line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#333]" />
            
            {/* Ticks: -3, -2, -1, 0, 1, 2, 3 */}
            {[-3, -2, -1, 0, 1, 2, 3].map((val) => (
              <div key={val} className="relative flex flex-col items-center">
                <div className={`w-0.5 h-2 ${val === 0 ? 'bg-gray-400 h-3' : 'bg-[#555]'}`} />
                {val !== 0 && Math.abs(val) % 1 === 0 && (
                  <span className="absolute top-3 text-[10px] text-[#555]">
                    {val > 0 ? `+${val}` : val}
                  </span>
                )}
              </div>
            ))}

            {/* Indicator */}
            <div 
              className="absolute w-2 h-3 bg-green-500 transition-all duration-300"
              style={{ 
                left: `calc(${((displayOffset - meterMin) / (meterMax - meterMin)) * 100}% - 4px)`,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </div>
        </div>

        <div className="w-12 text-right">
          {displayOffset > 0 ? '+' : ''}{displayOffset.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
