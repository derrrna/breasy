import React, {createContext, ReactNode, useContext, useEffect} from "react";
import {useSettingsContext} from "@/contexts/settingsContext";
import {useAudioPlayer} from "expo-audio";
import useBreathTimer from "@/hooks/useBreathTimer";

const CHIME = require("@/assets/audio/chime.mp3");
const COMPLETE_CHIME = require("@/assets/audio/completeChime.mp3");

export interface exerciseContextValue {
    isRunning: boolean;
    isComplete: boolean;
    toggleRunning: () => void;
    breathProgress: number;
    phaseCount: number;
    isInhalePhase: boolean;
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
    const {inhaleCount, exhaleCount, cycleCount} = settingsContext.activePresetInfo
    const isSoundOn = settingsContext.isSoundOn;

    const chimePlayer = useAudioPlayer(CHIME);
    const completeChimePlayer = useAudioPlayer(COMPLETE_CHIME);

    const onTick = (isLastTick: boolean) => {
        if (isSoundOn) {
            const soundPlayer = isLastTick ? completeChimePlayer : chimePlayer
            void soundPlayer.seekTo(0);
            soundPlayer.play();
        }
    }

    const {isRunning, isComplete, toggleRunning, breathProgress, phaseCount, isInhalePhase, currentCycle, reset} = useBreathTimer(
        inhaleCount,
        exhaleCount,
        cycleCount,
        onTick,
    )

    useEffect(() => {
        reset()
    }, [settingsContext.activePreset, inhaleCount, exhaleCount, cycleCount])

    return (
        <ExerciseContext.Provider
            value={{
                isRunning,
                isComplete,
                toggleRunning,
                breathProgress,
                phaseCount,
                isInhalePhase,
                currentCycle,
                reset,
            }}>
            {children}
        </ExerciseContext.Provider>
    )
}
