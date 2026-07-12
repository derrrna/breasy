export interface Preset {
    inhaleCount: number;
    exhaleCount: number;
    cycleCount: number;
}

export type PresetNames = "paced" | "box" | "sigh" | "custom"

export const BREATHING_PRESETS: Record<Exclude<PresetNames, "custom">, Preset> = {
    paced: {inhaleCount: 4, exhaleCount: 6, cycleCount: 3},
    box: {inhaleCount: 4, exhaleCount: 4, cycleCount: 4},
    sigh: {inhaleCount: 2, exhaleCount: 6, cycleCount: 1},
}