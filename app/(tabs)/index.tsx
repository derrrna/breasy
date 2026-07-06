import {Pressable, Switch, Text, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Header from "@/app/components/header";
import SmallButton from "@/app/components/smallButton";
import {FontAwesome6} from "@expo/vector-icons";
import {useEffect, useRef, useState} from "react";
import {next} from "sucrase/dist/types/parser/tokenizer";

export default function Index() {

    //TODO: Change to not be hardcoded once settings implemented
    // CONFIG SETTINGS
    const [inhaleCount, setInhaleCount] = useState(4)
    const [exhaleCount, setExhaleCount] = useState(6)
    const [cycleCount, setCycleCount] = useState(3)
    const [currentCycle, setCurrentCycle] = useState(0)

    // EXERCISE VISUAL
    const [pressedPlay, setPressedPlay] = useState(false)
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

    inhaleCountCopy.current = inhaleCount
    exhaleCountCopy.current = exhaleCount
    cycleCountCopy.current = cycleCount

    const handlePlayButton = () => {
        setPressedPlay(true)
    }

    // RESET BUTTON
    const handleResetButton = () => {
        setPressedPlay(false)
        setBreathProgress(0)
        setIsInhalePhase(true)
        setPhaseCount(inhaleCount)
        setCurrentCycle(0)
        breathProgressCopy.current = 0
        isInhalePhaseCopy.current = true
        currentCycleCopy.current = 0
    }

    useEffect(() => {

        // Conducts one phase, exhale OR inhale. Increments and completion-check
        // happen in the same tick so no second is lost resetting to 0.
        const onePhase = (count: number) => {

            const nextProgress = breathProgressCopy.current + 1
            const finishedPhase = nextProgress >= count

            setBreathProgress(nextProgress)
            setPhaseCount(count)
            breathProgressCopy.current = finishedPhase ? 0 : nextProgress

            return finishedPhase
        }

        // Once play button has been pressed, run:
        if (pressedPlay) {

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
                    setPressedPlay(false)
                }

            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [pressedPlay])

    return (
        <View className={"flex flex-col w-full bg-white h-full items-center justify-center"}>

            {/* CONFIG */}
            <View className={"flex-row items-center justify-center px-6 pb-10 "}>
                {/* Sound on / off button */}
                <Switch></Switch>
                <SmallButton onPress={handlePlayButton} iconName={"volume-high"}/>
                {/* Reset Button */}
                <SmallButton onPress={handleResetButton} iconName={"arrow-rotate-right"}/>
            </View>
            <Text>Cycle Count: {currentCycle}</Text>

            {/* EXERCISE VISUAL */}
            <View>
                <AnimatedCircularProgress
                    size={350}
                    width={20}
                    fill={(breathProgress / phaseCount) * 100}
                    tintColor={"#76C893"}
                    backgroundColor={"#76C89370"}
                    lineCap={"round"}
                    rotation={0}
                    duration={1000}
                    prefill={0}>
                    {() => (
                        <Text className={"color-[#168AAD] text-8xl"}>{breathProgress}</Text>
                    )}
                </AnimatedCircularProgress>
            </View>
            <Text>Bluetooth connection</Text>
        </View>
    );
}
