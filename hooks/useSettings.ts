import {useEffect, useState} from "react";
import { getData } from "@/helpers/getData";
import { storeData } from "@/helpers/storeData";
import {KEYS} from "@/utils/keys";
import {BREATHING_PRESETS, CUSTOM_CONSTRAINTS, isPresetName, PresetNames, Range} from "@/utils/presets";

// Storage holds strings, so a stored number can be missing, non-numeric, or out of
// range (older build, manual edit, corruption). Missing or NaN falls back to the
// default; out of range is clamped rather than discarded, since an in-range value the
// user chose is still valid data.
function parseStoredNumber(raw: string | undefined, fallback: number, range: Range): number {
    if (raw === undefined) return fallback
    const parsed = Number(raw)
    if (Number.isNaN(parsed)) return fallback
    return Math.min(Math.max(parsed, range.min), range.max)
}

function useSyncToStorage(key: string, value: string, isLoaded: boolean) {
    useEffect(() => {
        if (!isLoaded) return
        storeData(key, value)
    }, [value, isLoaded])
}

// Named so the load path below can fall back to the same values the state starts with.
// The three counts come from the Paced preset so there is one definition of "default".
const DEFAULTS = {
    inhale: BREATHING_PRESETS.paced.inhaleCount,
    exhale: BREATHING_PRESETS.paced.exhaleCount,
    cycle: BREATHING_PRESETS.paced.cycleCount,
    vibration: 0,
}

export const useSettings = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [activePreset, setActivePreset] = useState<PresetNames>("paced")
    const [inhaleCount, setInhaleCount] = useState(DEFAULTS.inhale)
    const [exhaleCount, setExhaleCount] = useState(DEFAULTS.exhale)
    const [cycleCount, setCycleCount] = useState(DEFAULTS.cycle)
    // TODO: When hardware is implemented, find mid value.
    const [vibrationStrength, setVibrationStrength] = useState(DEFAULTS.vibration)
    const [isSoundOn, setIsSoundOn] = useState(false)

    // MOUNT LOADING
    // When app mounts, load user settings (if not yet set, leave as default).
    useEffect(() => {

        // Wait for all settings to be retrieved.
        const loadSettings = async () => {
            const [active, inhale, exhale, cycle, vibration, soundOn] = await Promise.all([
                getData(KEYS.ACTIVE_PRESET),
                getData(KEYS.PACED_INHALE_COUNT),
                getData(KEYS.PACED_EXHALE_COUNT),
                getData(KEYS.PACED_CYCLE_COUNT),
                getData(KEYS.VIBRATION_STRENGTH),
                getData(KEYS.IS_SOUND_ON),
            ])

            if (active !== undefined && isPresetName(active)) setActivePreset(active);
            setInhaleCount(parseStoredNumber(inhale, DEFAULTS.inhale, CUSTOM_CONSTRAINTS.inhale));
            setExhaleCount(parseStoredNumber(exhale, DEFAULTS.exhale, CUSTOM_CONSTRAINTS.exhale));
            setCycleCount(parseStoredNumber(cycle, DEFAULTS.cycle, CUSTOM_CONSTRAINTS.cycle));
            setVibrationStrength(parseStoredNumber(vibration, DEFAULTS.vibration, CUSTOM_CONSTRAINTS.vibration));
            if (soundOn !== undefined) setIsSoundOn(soundOn === "true");

            setIsLoaded(true)
        }
        loadSettings().catch(console.error)
    }, [])

    // Updating Settings
    useSyncToStorage(KEYS.ACTIVE_PRESET, activePreset, isLoaded)
    useSyncToStorage(KEYS.PACED_INHALE_COUNT, String(inhaleCount), isLoaded)
    useSyncToStorage(KEYS.PACED_EXHALE_COUNT, String(exhaleCount), isLoaded)
    useSyncToStorage(KEYS.PACED_CYCLE_COUNT, String(cycleCount), isLoaded)

    // Puts the Paced counts back to the preset defaults. Lives here rather than in the
    // settings screen so the screen never needs to know what the defaults are.
    const resetPacedCounts = () => {
        setInhaleCount(DEFAULTS.inhale)
        setExhaleCount(DEFAULTS.exhale)
        setCycleCount(DEFAULTS.cycle)
    }
    useSyncToStorage(KEYS.VIBRATION_STRENGTH, String(vibrationStrength), isLoaded)
    useSyncToStorage(KEYS.IS_SOUND_ON, String(isSoundOn), isLoaded)

    return ({
        activePreset,
        setActivePreset,
        inhaleCount,
        setInhaleCount,
        exhaleCount,
        setExhaleCount,
        cycleCount,
        setCycleCount,
        resetPacedCounts,
        vibrationStrength,
        setVibrationStrength,
        isSoundOn, setIsSoundOn})
}