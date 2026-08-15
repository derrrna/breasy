import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {useSettingsContext} from "@/contexts/settingsContext";
import {useAudioPlayer} from "expo-audio";

const CHIME = require("@/assets/audio/chime.mp3");
const COMPLETE_CHIME = require("@/assets/audio/completeChime.mp3");

export interface exerciseContextValue {
    isRunning: boolean;
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

//TODO this file is getting too big. separate out.
export default function ExerciseContextProvider({children}: {children: ReactNode}) {

    const settingsContext = useSettingsContext();
    const {inhaleCount, exhaleCount, cycleCount} = settingsContext.activePresetInfo
    const isSoundOn = settingsContext.isSoundOn;

    // SOUND
    const chimePlayer = useAudioPlayer(CHIME);
    const completeChimePlayer = useAudioPlayer(COMPLETE_CHIME);

    // SCAFFOLD — fill this in. See can-you-analyse-any-warm-tower.md plan / hooks/useBreathTimer.ts.
    //
    // The timer/phase state machine (state, ref-copies, toggleRunning, reset, and the
    // interval effect that used to live directly in this function) has moved into
    // useBreathTimer (hooks/useBreathTimer.ts). This provider's job now is just: call
    // that hook, and decide what to do when it reports a tick.
    //
    // Call useBreathTimer({ inhaleCount, exhaleCount, cycleCount, onTick }), where
    // onTick is a function you define here: (isLastTick: boolean) => void.
    //
    // onTick should do what the original onePhase() did with sound: if isSoundOn,
    // pick completeChimePlayer when isLastTick is true, otherwise chimePlayer, then
    // void player.seekTo(0) and player.play(). Nothing else — the hook now owns
    // deciding WHEN a tick happens, this provider only owns WHAT SOUND plays when it does.
    //
    // Destructure what you need from the hook's return value:
    //   isRunning, toggleRunning, breathProgress, phaseCount, isInhalePhase,
    //   currentCycle, reset
    // You'll use all of these in the JSX below, and `reset` in the effect right after.

    const onTick = (isLastTick: boolean) => {
        if (isSoundOnCopy) {

            const soundPlayer = isLastTick ? completeChimePlayer : chimePlayer
            void soundPlayer.seekTo(0);
            soundPlayer.play();
        }
    }
    // Note: Resets everytime the exercise is changed.
    // Same as before, but now calling the `reset` that came back from useBreathTimer,
    // not a locally-defined one.
    useEffect(() => {
        reset()
    }, [settingsContext.activePresetInfo])

    return (
        <ExerciseContext.Provider
            value={{
                isRunning,
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
