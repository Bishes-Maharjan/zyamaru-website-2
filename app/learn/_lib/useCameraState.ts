import { useState, useMemo } from 'react';
import {
  APERTURE_FULL,
  APERTURE_THIRDS,
  SHUTTER_FULL,
  SHUTTER_THIRDS,
  ISO_FULL,
  ISO_THIRDS,
  snapToNearest,
  exposureOffset,
  evAtISO,
} from './photo';

export interface CameraState {
  aperture: number;
  shutter: number;
  iso: number;
  focalLengthMm: number;
  focusDistanceM: number;
  sceneEV: number;
  sensorWidthMm: number;
  useThirdStops: boolean;
  subjectSpeedMps: number;
}

export interface CameraStateControls {
  state: CameraState;
  setAperture: (val: number) => void;
  setShutter: (val: number) => void;
  setIso: (val: number) => void;
  setFocalLengthMm: (val: number) => void;
  setFocusDistanceM: (val: number) => void;
  setSceneEV: (val: number) => void;
  setSensorWidthMm: (val: number) => void;
  setUseThirdStops: (val: boolean) => void;
  setSubjectSpeedMps: (val: number) => void;
  offsetStops: number;
}

const DEFAULT_STATE: CameraState = {
  aperture: 8,
  shutter: 1 / 125,
  iso: 100,
  focalLengthMm: 50,
  focusDistanceM: 5,
  sceneEV: 12,
  sensorWidthMm: 36, // Full frame
  useThirdStops: false,
  subjectSpeedMps: 8, // Cyclist
};

export function useCameraState(initial: Partial<CameraState> = {}): CameraStateControls {
  const [state, setState] = useState<CameraState>({ ...DEFAULT_STATE, ...initial });

  const setAperture = (val: number) => {
    setState((prev) => ({
      ...prev,
      aperture: snapToNearest(val, prev.useThirdStops ? APERTURE_THIRDS : APERTURE_FULL),
    }));
  };

  const setShutter = (val: number) => {
    setState((prev) => ({
      ...prev,
      shutter: snapToNearest(val, prev.useThirdStops ? SHUTTER_THIRDS : SHUTTER_FULL),
    }));
  };

  const setIso = (val: number) => {
    setState((prev) => ({
      ...prev,
      iso: snapToNearest(val, prev.useThirdStops ? ISO_THIRDS : ISO_FULL),
    }));
  };

  const setFocalLengthMm = (val: number) => setState((prev) => ({ ...prev, focalLengthMm: val }));
  const setFocusDistanceM = (val: number) => setState((prev) => ({ ...prev, focusDistanceM: val }));
  const setSceneEV = (val: number) => setState((prev) => ({ ...prev, sceneEV: val }));
  const setSensorWidthMm = (val: number) => setState((prev) => ({ ...prev, sensorWidthMm: val }));
  const setUseThirdStops = (val: boolean) => setState((prev) => ({ ...prev, useThirdStops: val }));
  const setSubjectSpeedMps = (val: number) => setState((prev) => ({ ...prev, subjectSpeedMps: val }));

  const offsetStops = useMemo(
    () => exposureOffset(state.sceneEV, state.aperture, state.shutter, state.iso),
    [state.sceneEV, state.aperture, state.shutter, state.iso]
  );

  return {
    state,
    setAperture,
    setShutter,
    setIso,
    setFocalLengthMm,
    setFocusDistanceM,
    setSceneEV,
    setSensorWidthMm,
    setUseThirdStops,
    setSubjectSpeedMps,
    offsetStops,
  };
}
