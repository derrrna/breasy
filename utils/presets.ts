export interface Preset {
    inhaleCount: number;
    exhaleCount: number;
    cycleCount: number;
    formattedName: string;
}

{/* TODO formatting of names when they come out for display*/}
export const PRESET_NAMES = ["paced", "box", "sigh", "custom"] as const;
export type PresetNames = typeof PRESET_NAMES[number];

// TODO: risky `as` - widens PRESET_NAMES's element type so .includes(value)
// accepts a plain string. Revisit if PRESET_NAMES's shape ever changes.
export const isPresetName = (value: string): value is PresetNames =>
    (PRESET_NAMES as readonly string[]).includes(value);

export const CUSTOM_EXERCISE_NAME = "Custom Exercise";

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