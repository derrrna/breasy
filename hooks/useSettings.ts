import {useEffect, useState} from "react";
import { getData } from "@/helpers/getData";
import { storeData } from "@/helpers/storeData";
import {KEYS} from "@/utils/keys";
import {isPresetName, PresetNames} from "@/utils/presets";

function useSyncToStorage(key: string, value: string, isLoaded: boolean) {
    useEffect(() => {
        if (!isLoaded) return
        storeData(key, value)
    }, [value, isLoaded])
}

export const useSettings = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [activePreset, setActivePreset] = useState<PresetNames>("paced")
    const [inhaleCount, setInhaleCount] = useState(4)
    const [exhaleCount, setExhaleCount] = useState(6)
    const [cycleCount, setCycleCount] = useState(3)
    // TODO: When hardware is implemented, find mid value.
    const [vibrationStrength, setVibrationStrength] = useState(0)
    const [isMute, setIsMute] = useState(false)

    // MOUNT LOADING
    // When app mounts, load user settings (if not yet set, leave as default).
    useEffect(() => {

        // Wait for all settings to be retrieved.
        const loadSettings = async () => {
            const [active, inhale, exhale, cycle, vibration, mute] = await Promise.all([
                getData(KEYS.ACTIVE_PRESET),
                getData(KEYS.CUSTOM_INHALE_COUNT),
                getData(KEYS.CUSTOM_EXHALE_COUNT),
                getData(KEYS.CUSTOM_CYCLE_COUNT),
                getData(KEYS.VIBRATION_STRENGTH),
                getData(KEYS.MUTE_SOUND),
            ])

            if (active !== undefined && isPresetName(active)) setActivePreset(active);
            if (inhale !== undefined) setInhaleCount(Number(inhale));
            if (exhale !== undefined) setExhaleCount(Number(exhale));
            if (cycle !== undefined) setCycleCount(Number(cycle));
            if (vibration !== undefined) setVibrationStrength(Number(vibration));
            if (mute !== undefined) setIsMute(mute === "true");

            setIsLoaded(true)
        }
        loadSettings().catch(console.error)
    }, [])

    // Updating Settings
    useSyncToStorage(KEYS.ACTIVE_PRESET, activePreset, isLoaded)
    useSyncToStorage(KEYS.CUSTOM_INHALE_COUNT, String(inhaleCount), isLoaded)
    useSyncToStorage(KEYS.CUSTOM_EXHALE_COUNT, String(exhaleCount), isLoaded)
    useSyncToStorage(KEYS.CUSTOM_CYCLE_COUNT, String(cycleCount), isLoaded)
    useSyncToStorage(KEYS.VIBRATION_STRENGTH, String(vibrationStrength), isLoaded)
    useSyncToStorage(KEYS.MUTE_SOUND, String(isMute), isLoaded)

    return ({
        activePreset,
        setActivePreset,
        inhaleCount,
        setInhaleCount,
        exhaleCount,
        setExhaleCount,
        cycleCount,
        setCycleCount,
        vibrationStrength,
        setVibrationStrength,
        isMute, setIsMute})
}