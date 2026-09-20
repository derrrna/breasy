import React, {createContext, ReactNode, useContext, useEffect, useMemo} from "react";
import {useSettingsContext} from "@/contexts/settingsContext";
import {useAudioPlayer} from "expo-audio";
import useBreathTimer from "@/hooks/useBreathTimer";
import {buildPhases, PhaseKind} from "@/utils/presets";

const CHIME = require("@/assets/audio/chime.mp3");
const COMPLETE_CHIME = require("@/assets/audio/completeChime.mp3");

export interface exerciseContextValue {
    isRunning: boolean;
    isComplete: boolean;
    toggleRunning: () => void;
    breathProgress: number;
    phaseCount: number;
    phase: PhaseKind;
    currentCycle: number;
    reset: () => void;
}

export const ExerciseContext = createContext<exerciseContextValue | null>(null);

export function useExerciseContext(): exerciseContextValue {
    const context = useContext(ExerciseContext);
    if (!context) {
        throw new Error("useExerciseContext must be used within an ExerciseContextProvider");
    }
    return context;
}

export default function ExerciseContextProvider({children}: {children: ReactNode}) {

    const settingsContext = useSettingsContext();
    const activePresetInfo = settingsContext.activePresetInfo
    const {inhaleCount, holdCount, exhaleCount, cycleCount} = activePresetInfo
    const isSoundOn = settingsContext.isSoundOn;

    // Memoised on the counts so the array identity only changes when the pattern does.
    const phases = useMemo(() => buildPhases(activePresetInfo), [inhaleCount, holdCount, exhaleCount])

    const chimePlayer = useAudioPlayer(CHIME);
    const completeChimePlayer = useAudioPlayer(COMPLETE_CHIME);

    const onTick = (isLastTick: boolean) => {
        if (isSoundOn) {
            const soundPlayer = isLastTick ? completeChimePlayer : chimePlayer
            void soundPlayer.seekTo(0);
            soundPlayer.play();
        }
    }

    const {isRunning, isComplete, toggleRunning, breathProgress, phaseCount, phase, currentCycle, reset} = useBreathTimer(
        phases,
        cycleCount,
        onTick,
    )

    useEffect(() => {
        reset()
    }, [settingsContext.activePreset, inhaleCount, holdCount, exhaleCount, cycleCount])

    return (
        <ExerciseContext.Provider
            value={{
                isRunning,
                isComplete,
                toggleRunning,
                breathProgress,
                phaseCount,
                phase,
                currentCycle,
                reset,
            }}>
            {children}
        </ExerciseContext.Provider>
    )
}
