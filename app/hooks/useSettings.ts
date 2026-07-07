import {useEffect, useState} from "react";
import { getData } from "@/app/helpers/getData";
import { storeData } from "@/app/helpers/storeData";
import {KEYS} from "@/app/utils/keys";

export const useSettings = () => {

    // SETTINGS
    const [activePreset, setActivePreset] = useState("dbt_paced")
    const [customPreset, setCustomPreset] = useState({
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

            if (active!== undefined) setActivePreset(active);
            // Stored as object (inhale, exhale, cycle count)
            if (custom !== undefined) setCustomPreset(JSON.parse(custom));
            if (vibration !== undefined) setVibrationStrength(Number(vibration));
            if (mute !== undefined) setIsMute(mute === "true");
        }
        //TODO
        loadSettings()
    }, [])

    // SETTING DATA
    //TODO: split if frequent change (eg updateVibrationStrength)
    const updateSettings = async () => {
        await Promise.all([
            storeData(KEYS.ACTIVE_PRESET, activePreset),
            storeData(KEYS.CUSTOM_PRESET, JSON.stringify(customPreset)),
            storeData(KEYS.VIBRATION_STRENGTH, String(vibrationStrength)),
            storeData(KEYS.MUTE_SOUND, String(isMute)),
        ])
    }

    return ({
        activePreset,
        setActivePreset,
        customPreset,
        setCustomPreset,
        vibrationStrength,
        setVibrationStrength,
        isMute, setIsMute})
}