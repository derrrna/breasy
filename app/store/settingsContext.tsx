import React, {createContext, ReactNode, useContext} from "react";
import { useSettings } from "@/app/hooks/useSettings";

export interface settingsContextValue {
    activePreset: string;
    setActivePreset: (activePreset: string) => void;

    customPreset: { inhaleCount: number, exhaleCount: number, cycleCount: number };
    setCustomPreset: (customPreset: { inhaleCount: number, exhaleCount: number, cycleCount: number }) => void;

    vibrationStrength: number;
    setVibrationStrength: (vibrationStrength: number) => void;

    isMute: boolean;
    setIsMute: (isMute: boolean) => void;
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

    return (
        <SettingsContext.Provider
            value={{
                activePreset: settings.activePreset,
                setActivePreset: settings.setActivePreset,

                customPreset: settings.customPreset,
                setCustomPreset: settings.setCustomPreset,

                vibrationStrength: settings.vibrationStrength,
                setVibrationStrength: settings.setVibrationStrength,

                isMute: settings.isMute,
                setIsMute: settings.setIsMute,
            }}>
            {children}
        </SettingsContext.Provider>
    )
}