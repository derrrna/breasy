export interface Preset {
    inhaleCount: number;
    exhaleCount: number;
    cycleCount: number;
    formattedName: string;
}

export const PRESET_NAMES = ["paced", "box", "sigh", "custom"] as const;
export type PresetNames = typeof PRESET_NAMES[number];

// TODO: risky `as` - widens PRESET_NAMES's element type so .includes(value)
// accepts a plain string. Revisit if PRESET_NAMES's shape ever changes.
export const isPresetName = (value: string): value is PresetNames =>
    (PRESET_NAMES as readonly string[]).includes(value);

export const CUSTOM_EXERCISE_NAME = "Custom Exercise";

export const CUSTOM_CONSTRAINTS: Record<"inhale" | "exhale" | "cycle", {min: number, max: number}> = {
    inhale: {min: 1, max: 6},
    exhale: {min: 1, max: 8},
    cycle: {min: 1, max: 10},
}

export const numberRange = (min: number, max: number): number[] =>
    Array.from({length: max - min + 1}, (_, i) => min + i);

export const BREATHING_PRESETS: Record<Exclude<PresetNames, "custom">, Preset> = {
    paced: {inhaleCount: 4, exhaleCount: 6, cycleCount: 3, formattedName: "Paced Breathing"},
    box: {inhaleCount: 4, exhaleCount: 4, cycleCount: 4, formattedName: "Box Breathing"},
    sigh: {inhaleCount: 2, exhaleCount: 6, cycleCount: 1, formattedName: "Physiological Sigh"},
}

export const getPreset = (activePreset: PresetNames, customPreset: Preset) => {
    if (activePreset === "custom") {
        return customPreset
    } else {
        return BREATHING_PRESETS[activePreset]
    }
}