import {useEffect, useEffectEvent, useState} from "react";
import {Phase, PhaseKind} from "@/utils/presets";

// Drives the breathing exercise: one tick per second, walking the preset's phase list
// (e.g. inhale, hold, exhale, hold) for `count` ticks each, repeated cycleCount times.
// The hook knows nothing about which kinds of phase exist; that lives in buildPhases.
export default function useBreathTimer(
       phases: Phase[],
       cycleCount: number,
       onTick: (isLastTick: boolean) => void)
{
    const [currentCycle, setCurrentCycle] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [breathProgress, setBreathProgress] = useState(0)
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [phaseCount, setPhaseCount] = useState(phases[0].count)

    const isComplete = currentCycle >= cycleCount

    // Clamped because the phase list can shrink on a preset change (Box → Paced) in the
    // render before the reset effect in exerciseContext brings the index back to 0.
    const safeIndex = Math.min(phaseIndex, phases.length - 1)
    const phase: PhaseKind = phases[safeIndex].kind

    const toggleRunning = () => {
        if (isComplete) return
        setIsRunning(prev => !prev)
    }

    const reset = () => {
        setIsRunning(false)
        setBreathProgress(0)
        setPhaseIndex(0)
        setPhaseCount(phases[0].count)
        setCurrentCycle(0)
    }

    const tick = useEffectEvent(() => {
        let progress = breathProgress
        let index = safeIndex
        let cycle = currentCycle

        // Phase rollover: the current phase finished on the previous tick.
        if (progress >= phases[index].count) {
            progress = 0
            index += 1
            if (index >= phases.length) {
                // Every phase done: a full cycle just completed.
                index = 0
                cycle += 1
            }
        }

        if (cycle >= cycleCount) {
            setPhaseIndex(index)
            setCurrentCycle(cycle)
            setIsRunning(false)
            return
        }

        // One tick of progress in whichever phase is now current.
        const nextProgress = progress + 1
        const count = phases[index].count
        setBreathProgress(nextProgress)
        setPhaseIndex(index)
        setCurrentCycle(cycle)
        setPhaseCount(count)
        onTick(nextProgress === count)
    })

    useEffect(() => {
        if (!isRunning) return
        const interval = setInterval(tick, 1000)
        return () => clearInterval(interval)
    }, [isRunning])

    return ({isRunning, isComplete, toggleRunning, breathProgress, phaseCount, phase, currentCycle, reset})
}
