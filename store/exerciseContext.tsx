import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {useSettingsContext} from "@/store/settingsContext";
import {useAudioPlayer} from "expo-audio";

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

export default function ExerciseContextProvider({children}: {children: ReactNode}) {

    const settingsContext = useSettingsContext();
    const {inhaleCount, exhaleCount, cycleCount} = settingsContext.customPreset
    const isMute = settingsContext.isMute;

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
    const isMuteCopy = useRef(isMute)

    inhaleCountCopy.current = inhaleCount
    exhaleCountCopy.current = exhaleCount
    cycleCountCopy.current = cycleCount
    isMuteCopy.current = isMute

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

    // SOUND
    const testSound = require("@/assets/audio/TEST_SOUND.mp3");
    const player = useAudioPlayer(testSound);

    useEffect(() => {

        // Conducts one phase, exhale OR inhale. Increments and completion-check
        // happen in the same tick so no second is lost resetting to 0.
        const onePhase = (count: number) => {

            const nextProgress = breathProgressCopy.current + 1
            const finishedPhase = nextProgress >= count

            setBreathProgress(nextProgress)
            setPhaseCount(count)

            //TODO Replace sound
            if (isMuteCopy.current) {
                void player.seekTo(0);
                player.play();
            }

            breathProgressCopy.current = finishedPhase ? 0 : nextProgress
            return finishedPhase
        }

        // Once running, run:
        if (isRunning) {

            const interval = setInterval(() => {

                if (currentCycleCopy.current < cycleCountCopy.current) {

                    // Inhale phase
                    if (isInhalePhaseCopy.current) {
                        const finished = onePhase(inhaleCountCopy.current)
                        if (finished) {
                            setIsInhalePhase(false)
                            isInhalePhaseCopy.current = false
                        }

                    // Exhale phase
                    } else {
                        const finished = onePhase(exhaleCountCopy.current)
                        if (finished) {
                            setIsInhalePhase(true)
                            isInhalePhaseCopy.current = true
                            // At the end of exhale phase, a cycle is completed
                            setCurrentCycle(currentCycleCopy.current + 1)
                            currentCycleCopy.current = currentCycleCopy.current + 1
                        }
                    }
                } else {
                    clearInterval(interval)
                    setIsRunning(false)
                }

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
