export interface Preset {
    inhaleCount: number;
    exhaleCount: number;
    cycleCount: number;
}

export const PRESET_NAMES = ["paced", "box", "sigh", "custom"] as const;
export type PresetNames = typeof PRESET_NAMES[number];

export const BREATHING_PRESETS: Record<Exclude<PresetNames, "custom">, Preset> = {
    paced: {inhaleCount: 4, exhaleCount: 6, cycleCount: 3},
    box: {inhaleCount: 4, exhaleCount: 4, cycleCount: 4},
    sigh: {inhaleCount: 2, exhaleCount: 6, cycleCount: 1},
}

export const getPreset = (activePreset: PresetNames, customPreset: Preset) => {
    if (activePreset === "custom") {
        return customPreset
    } else {
        return BREATHING_PRESETS[activePreset]
    }
}