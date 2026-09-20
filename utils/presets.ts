export interface Preset {
    inhaleCount: number;
    // Ticks to hold after inhale and again after exhale. 0 means no hold phases.
    holdCount: number;
    exhaleCount: number;
    cycleCount: number;
    formattedName: string;
}

export type PhaseKind = "inhale" | "hold" | "exhale";

export interface Phase {
    kind: PhaseKind;
    count: number;
}

export const PRESET_NAMES = ["paced", "box", "sigh"] as const;
export type PresetNames = typeof PRESET_NAMES[number];

// TODO: risky `as` - widens PRESET_NAMES's element type so .includes(value)
// accepts a plain string. Revisit if PRESET_NAMES's shape ever changes.
export const isPresetName = (value: string): value is PresetNames =>
    (PRESET_NAMES as readonly string[]).includes(value);

export interface Range {
    min: number;
    max: number;
}

// Valid ranges for every user-set number. Read by the pickers/slider for their bounds
// and by useSettings to clamp values loaded from storage, so both agree by construction.
export const CUSTOM_CONSTRAINTS: Record<"inhale" | "exhale" | "cycle" | "vibration", Range> = {
    inhale: {min: 1, max: 6},
    exhale: {min: 1, max: 8},
    cycle: {min: 1, max: 10},
    vibration: {min: 0, max: 5},
}

export const numberRange = (min: number, max: number): number[] =>
    Array.from({length: max - min + 1}, (_, i) => min + i);

// Paced is the one editable preset. Its entry here holds the DEFAULT counts, which
// useSettings starts from and the reset button returns to. Box and Sigh are fixed.
export const BREATHING_PRESETS: Record<PresetNames, Preset> = {
    paced: {inhaleCount: 4, holdCount: 0, exhaleCount: 6, cycleCount: 3, formattedName: "Paced Breathing"},
    box: {inhaleCount: 4, holdCount: 4, exhaleCount: 4, cycleCount: 4, formattedName: "Box Breathing"},
    sigh: {inhaleCount: 2, holdCount: 0, exhaleCount: 6, cycleCount: 1, formattedName: "Physiological Sigh"},
}

// Turns a preset's flat counts into the ordered phase list the timer walks. This is
// the ONE place that encodes the breathing pattern (box = inhale, hold, exhale, hold);
// useBreathTimer just iterates whatever comes back.
export const buildPhases = (preset: Preset): Phase[] => {
    // Written as the pattern itself: holds are spread in only when the preset has them,
    // so Paced and Sigh collapse to [inhale, exhale] with no branching elsewhere.
    const hold: Phase[] = preset.holdCount > 0 ? [{kind: "hold", count: preset.holdCount}] : [];
    return [
        {kind: "inhale", count: preset.inhaleCount},
        ...hold,
        {kind: "exhale", count: preset.exhaleCount},
        ...hold,
    ];
}

export type PresetCounts = Pick<Preset, "inhaleCount" | "exhaleCount" | "cycleCount">;

// For Paced, the user's counts override the defaults; the name comes from the preset.
export const getPreset = (activePreset: PresetNames, pacedCounts: PresetCounts): Preset => {
    if (activePreset === "paced") {
        return {...BREATHING_PRESETS.paced, ...pacedCounts}
    } else {
        return BREATHING_PRESETS[activePreset]
    }
}