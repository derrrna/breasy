import React, {createContext, ReactNode, useContext, useMemo} from "react";
import { useSettings } from "@/hooks/useSettings";
import {getPreset, Preset, PresetNames} from "@/utils/presets";

export interface settingsContextValue {
    activePreset: PresetNames;
    activePresetInfo: Preset;
    setActivePreset: (activePreset: PresetNames) => void;
    inhaleCount: number;
    setInhaleCount: (inhaleCount: number) => void;
    exhaleCount: number;
    setExhaleCount: (exhaleCount: number) => void;
    cycleCount: number;
    setCycleCount: (cycleCount: number) => void;
    vibrationStrength: number;
    setVibrationStrength: (vibrationStrength: number) => void;
    isSoundOn: boolean;
    setIsSoundOn: (isSoundOn: boolean) => void;
}

export const SettingsContext = createContext<settingsContextValue | null >(null);

export function useSettingsContext(): settingsContextValue {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettingsContext must be used within a SettingsContextProvider");
    }
    return context;
}

export default function SettingsContextProvider({children}: {children: ReactNode}) {
    const settings = useSettings()
    const customPresetInfo = useMemo(() => ({
        inhaleCount: settings.inhaleCount,
        exhaleCount: settings.exhaleCount,
        cycleCount: settings.cycleCount,
    }), [settings.inhaleCount, settings.exhaleCount, settings.cycleCount])
    const activePresetInfo = getPreset(settings.activePreset, customPresetInfo)

    return (
        <SettingsContext.Provider
            value={{
                activePreset: settings.activePreset,
                setActivePreset: settings.setActivePreset,
                activePresetInfo: activePresetInfo,

                inhaleCount: settings.inhaleCount,
                setInhaleCount: settings.setInhaleCount,
                exhaleCount: settings.exhaleCount,
                setExhaleCount: settings.setExhaleCount,
                cycleCount: settings.cycleCount,
                setCycleCount: settings.setCycleCount,

                vibrationStrength: settings.vibrationStrength,
                setVibrationStrength: settings.setVibrationStrength,

                isSoundOn: settings.isSoundOn,
                setIsSoundOn: settings.setIsSoundOn,
            }}>
            {children}
        </SettingsContext.Provider>
    )
}