'use client';
import React, { useId } from 'react';
import { formatAperture, formatShutter, formatISO } from '../_lib/photo';

interface SettingSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  options: readonly number[];
  formatDisplay?: (val: number) => string;
  disabled?: boolean;
}

export function SettingSlider({
  label,
  value,
  onChange,
  options,
  formatDisplay = (v) => v.toString(),
  disabled = false,
}: SettingSliderProps) {
  const id = useId();
  const currentIndex = options.indexOf(value) !== -1 ? options.indexOf(value) : 0;
  
  // Find nearest index if value isn't exactly in options (due to third-stop toggling)
  const effectiveIndex = options.indexOf(value) !== -1 
    ? options.indexOf(value) 
    : options.reduce((nearestIdx, opt, idx) => {
        return Math.abs(Math.log2(opt/value)) < Math.abs(Math.log2(options[nearestIdx]/value)) ? idx : nearestIdx;
      }, 0);

  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <div className="flex justify-between items-end">
        <label htmlFor={id} className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
          {label}
        </label>
        <span className="text-amber font-mono bg-bg-elevated px-2 py-0.5 rounded border border-border">
          {formatDisplay(options[effectiveIndex])}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={options.length - 1}
        step={1}
        value={effectiveIndex}
        onChange={(e) => onChange(options[parseInt(e.target.value)])}
        disabled={disabled}
        className="w-full h-2 bg-bg-elevated rounded-lg appearance-none cursor-pointer accent-amber disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="flex justify-between text-xs text-text-muted mt-1 px-1">
        <span>{formatDisplay(options[0])}</span>
        <span>{formatDisplay(options[options.length - 1])}</span>
      </div>
    </div>
  );
}

export function ApertureSlider({ value, onChange, options, disabled }: Omit<SettingSliderProps, 'label' | 'formatDisplay'>) {
  return <SettingSlider label="Aperture" value={value} onChange={onChange} options={options} formatDisplay={formatAperture} disabled={disabled} />;
}

export function ShutterSlider({ value, onChange, options, disabled }: Omit<SettingSliderProps, 'label' | 'formatDisplay'>) {
  return <SettingSlider label="Shutter Speed" value={value} onChange={onChange} options={options} formatDisplay={formatShutter} disabled={disabled} />;
}

export function IsoSlider({ value, onChange, options, disabled }: Omit<SettingSliderProps, 'label' | 'formatDisplay'>) {
  return <SettingSlider label="ISO" value={value} onChange={onChange} options={options} formatDisplay={formatISO} disabled={disabled} />;
}
