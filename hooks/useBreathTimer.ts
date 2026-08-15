import {useEffect, useRef, useState} from "react";

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

    const currentCycleCopy = useRef(currentCycle)
    const isInhalePhaseCopy = useRef(isInhalePhase)
    const breathProgressCopy = useRef(breathProgress)
    const inhaleCountCopy = useRef(inhaleCount)
    const exhaleCountCopy = useRef(exhaleCount)
    const cycleCountCopy = useRef(cycleCount)

    inhaleCountCopy.current = inhaleCount
    exhaleCountCopy.current = exhaleCount
    cycleCountCopy.current = cycleCount

    // PLAY BUTTON (this wasn't called out as its own numbered step, but it's needed
    // for the return shape in Step 1 — same one-liner as exerciseContext.tsx:56-58).
    const toggleRunning = () => {
        setIsRunning(prev => !prev)
    }

    // STEP 4 — reset()
    // Same behavior as exerciseContext.tsx's original reset (lines 60-70): sets isRunning
    // false, breathProgress 0, isInhalePhase true, phaseCount back to inhaleCount,
    // currentCycle 0 — updating both the state AND the matching ref copies.
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

    useEffect(() => {

        // Conducts one tick's increment for whichever phase is current.
        const onePhase = (count: number) => {
            const nextProgress = breathProgressCopy.current + 1

            setBreathProgress(nextProgress)
            setPhaseCount(count)
            const isLastTick = nextProgress === count
            onTick(isLastTick)
            breathProgressCopy.current = nextProgress
        }

        // Once running, run:
        if (isRunning) {

            const interval = setInterval(() => {


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

    return ({isRunning, toggleRunning, breathProgress, phaseCount, isInhalePhase, currentCycle, reset})
}
