import {useEffect, useEffectEvent, useState} from "react";

// Drives the breathing exercise: one tick per second, inhale for inhaleCount ticks,
// exhale for exhaleCount ticks, repeat for cycleCount cycles, then stop.
export default function useBreathTimer(
       inhaleCount: number,
       exhaleCount: number,
       cycleCount: number,
       onTick: (isLastTick: boolean) => void)
{
    const [currentCycle, setCurrentCycle] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [breathProgress, setBreathProgress] = useState(0)
    const [isInhalePhase, setIsInhalePhase] = useState(true)
    const [phaseCount, setPhaseCount] = useState(inhaleCount)

    const isComplete = currentCycle >= cycleCount

    const toggleRunning = () => {
        if (isComplete) return
        setIsRunning(prev => !prev)
    }

    const reset = () => {
        setIsRunning(false)
        setBreathProgress(0)
        setIsInhalePhase(true)
        setPhaseCount(inhaleCount)
        setCurrentCycle(0)
    }

    const tick = useEffectEvent(() => {
        const countFor = (inhale: boolean) => inhale ? inhaleCount : exhaleCount

        let progress = breathProgress
        let inhale = isInhalePhase
        let cycle = currentCycle

        // Phase rollover: the current phase finished on the previous tick.
        if (progress >= countFor(inhale)) {
            progress = 0
            if (inhale) {
                inhale = false
            } else {
                // A full cycle just completed.
                inhale = true
                cycle += 1
            }
        }

        if (cycle >= cycleCount) {
            setIsInhalePhase(inhale)
            setCurrentCycle(cycle)
            setIsRunning(false)
            return
        }

        // One tick of progress in whichever phase is now current.
        const nextProgress = progress + 1
        const count = countFor(inhale)
        setBreathProgress(nextProgress)
        setIsInhalePhase(inhale)
        setCurrentCycle(cycle)
        setPhaseCount(count)
        onTick(nextProgress === count)
    })

    useEffect(() => {
        if (!isRunning) return
        const interval = setInterval(tick, 1000)
        return () => clearInterval(interval)
    }, [isRunning])

    return ({isRunning, isComplete, toggleRunning, breathProgress, phaseCount, isInhalePhase, currentCycle, reset})
}
