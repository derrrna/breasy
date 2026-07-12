import {useEffect, useState} from "react";
import { getData } from "@/helpers/getData";
import { storeData } from "@/helpers/storeData";
import {KEYS} from "@/utils/keys";
import {isPresetName, Preset, PresetNames} from "@/utils/presets";

function useSyncToStorage(key: string, value: string, isLoaded: boolean) {
    useEffect(() => {
        if (!isLoaded) return
        storeData(key, value)
    }, [value, isLoaded])
}

export const useSettings = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [activePreset, setActivePreset] = useState<PresetNames>("paced")
    const [customPreset, setCustomPreset] = useState<Preset>({
        inhaleCount: 4,
        exhaleCount: 6,
        cycleCount: 3
    })
    // TODO: When hardware is implemented, find mid value.
    const [vibrationStrength, setVibrationStrength] = useState(0)
    const [isMute, setIsMute] = useState(false)

    // MOUNT LOADING
    // When app mounts, load user settings (if not yet set, leave as default).
    useEffect(() => {

        // Wait for all settings to be retrieved.
        const loadSettings = async () => {
            const [active, custom, vibration, mute] = await Promise.all([
                getData(KEYS.ACTIVE_PRESET),
                getData(KEYS.CUSTOM_PRESET),
                getData(KEYS.VIBRATION_STRENGTH),
                getData(KEYS.MUTE_SOUND),
            ])

            if (active !== undefined && isPresetName(active)) setActivePreset(active);
            // TODO Stored as object (inhale, exhale, cycle count)
            if (custom !== undefined) setCustomPreset(JSON.parse(custom));
            if (vibration !== undefined) setVibrationStrength(Number(vibration));
            if (mute !== undefined) setIsMute(mute === "true");

            setIsLoaded(true)
        }
        loadSettings().catch(console.error)
    }, [])

    // Updating Settings
    useSyncToStorage(KEYS.ACTIVE_PRESET, activePreset, isLoaded)
    useSyncToStorage(KEYS.CUSTOM_PRESET, JSON.stringify(customPreset), isLoaded)
    useSyncToStorage(KEYS.VIBRATION_STRENGTH, String(vibrationStrength), isLoaded)
    useSyncToStorage(KEYS.MUTE_SOUND, String(isMute), isLoaded)

    return ({
        activePreset,
        setActivePreset,
        customPreset,
        setCustomPreset,
        vibrationStrength,
        setVibrationStrength,
        isMute, setIsMute})
}