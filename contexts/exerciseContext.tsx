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

    const [currentCycle, setCurrentCycle] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [breathProgress, setBreathProgress] = useState(0)
    const [isInhalePhase, setIsInhalePhase] = useState(true)
    const [phaseCount, setPhaseCount] = useState(inhaleCount)

    // NOTE: Redundancy
    const currentCycleCopy = useRef(currentCycle)
    const isInhalePhaseCopy = useRef(isInhalePhase)
    const breathProgressCopy = useRef(breathProgress)
    const inhaleCountCopy = useRef(inhaleCount)
    const exhaleCountCopy = useRef(exhaleCount)
    const cycleCountCopy = useRef(cycleCount)
    const isSoundOnCopy = useRef(isSoundOn)

    inhaleCountCopy.current = inhaleCount
    exhaleCountCopy.current = exhaleCount
    cycleCountCopy.current = cycleCount
    isSoundOnCopy.current = isSoundOn

    // PLAY BUTTON
    const toggleRunning = () => {
        setIsRunning(prev => !prev)
    }

    // RESET BUTTON
    const reset = () => {
        setIsRunning(false)
        setBreathProgress(0)
        setIsInhalePhase(true)
        setPhaseCount(inhaleCount)
        setCurrentCycle(0)
        breathProgressCopy.current = 0
        isInhalePhaseCopy.current = true
        currentCycleCopy.current = 0
    }

    // Note: Resets everytime the exercise is changed.
    useEffect(() => {
        reset()
    }, [settingsContext.activePresetInfo])

    // SOUND
    const chimePlayer = useAudioPlayer(CHIME);
    const completeChimePlayer = useAudioPlayer(COMPLETE_CHIME);

    useEffect(() => {

        // Conducts one tick's increment for whichever phase is current.
        const onePhase = (count: number) => {
            const nextProgress = breathProgressCopy.current + 1

            setBreathProgress(nextProgress)
            setPhaseCount(count)

            if (isSoundOnCopy.current) {
                const isLastTick = nextProgress === count

                const soundPlayer = isLastTick ? completeChimePlayer : chimePlayer
                void soundPlayer.seekTo(0);
                soundPlayer.play();
            }

            breathProgressCopy.current = nextProgress
        }

        // Once running, run:
        if (isRunning) {

            const interval = setInterval(() => {

                // If last tick's increment already reached the current
                // phase's target, flip now - before this tick's increment -
                // so the completed count (e.g. 4/4) stays on screen, in its
                // own phase's color, for one full tick before switching.
                const currentCount = isInhalePhaseCopy.current ? inhaleCountCopy.current : exhaleCountCopy.current
                if (breathProgressCopy.current >= currentCount) {
                    breathProgressCopy.current = 0
                    if (isInhalePhaseCopy.current) {
                        setIsInhalePhase(false)
                        isInhalePhaseCopy.current = false
                    } else {
                        setIsInhalePhase(true)
                        isInhalePhaseCopy.current = true
                        // A full cycle just completed.
                        setCurrentCycle(currentCycleCopy.current + 1)
                        currentCycleCopy.current = currentCycleCopy.current + 1
                    }
                }

                if (currentCycleCopy.current >= cycleCountCopy.current) {
                    clearInterval(interval)
                    setIsRunning(false)
                    return
                }

                onePhase(isInhalePhaseCopy.current ? inhaleCountCopy.current : exhaleCountCopy.current)

            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [isRunning])

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
