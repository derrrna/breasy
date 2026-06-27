import {Pressable, Switch, Text, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Header from "@/app/components/header";
import SmallButton from "@/app/components/smallButton";
import {FontAwesome6} from "@expo/vector-icons";
import {useEffect, useState} from "react";

export default function Index() {

    //TODO: Change to not be hardcoded once settings implemented
    {/* CONFIG SETTINGS */}
    const [inhaleCount, setInhaleCount] = useState(4)
    const [exhaleCount, setExhaleCount] = useState(6)

    const [cycleCount, setCycleCount] = useState(3)
    const [currentCycle, setCurrentCycle] = useState(0)

    {/* COUNTDOWN */}
    const [pressedPlay, setPressedPlay] = useState(false)
    const [breathProgress, setBreathProgress] = useState(0)

    const [isInhalePhase, setIsInhalePhase] = useState(true)

    const handlePlayButton = () => {
        setPressedPlay(true)
    }

    useEffect(() => {

        if (pressedPlay) {
            // 1. Increment breath progress by 1 per second.
            const interval = setInterval(() => {
                setBreathProgress(prev => {
                    if (prev < inhaleCount) {
                        return prev + 1
                    } else { //TODO: This needs to branch based on pause or stop
                        clearInterval(interval)
                        setPressedPlay(false)
                        return 0
                    }
                });
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
                <SmallButton onPress={handlePlayButton} iconName={"volume-high"}/>
                {/* Restart Button */}
                <SmallButton onPress={handlePlayButton} iconName={"arrow-rotate-right"}/>
            </View>

            {/* EXERCISE VISUAL */}
            <View>
                <AnimatedCircularProgress
                    size={350}
                    width={20}
                    //TODO: Edit to accomodate for exhale later
                    fill={(breathProgress / inhaleCount) * 100}
                    tintColor={"#76C893"}
                    backgroundColor={"#76C89370"}
                    lineCap={"round"}
                    rotation={0}
                    duration={1000}
                    prefill={0}
                    style={{  }}>
                    {() => (
                        <Text className={"color-[#168AAD] text-8xl"}>{breathProgress}</Text>
                    )}
                </AnimatedCircularProgress>
            </View>

            <Text>Bluetooth connection</Text>
        </View>
    );
}
