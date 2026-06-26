import {Pressable, Text, View} from "react-native";
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
        <View className={"flex flex-col w-full h-full"}>

            {/* HEADER */}
            <Header/>

            {/* CONTENT */}
            <View className={"flex-1 bg-white items-center justify-center"}>
                <Text className={"mb-16"}> Bluetooth Connection</Text>
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

            {/* BOTTOM BAR */}
            <View className={"flex-row justify-evenly items-center bg-[#168AAD] px-6 pb-10 pt-6"}>
                {/* Restart Button */}
                <SmallButton onPress={handlePlayButton} iconName={"arrow-rotate-right"}/>
                {/* Sound on / off button */}
                <SmallButton onPress={handlePlayButton} iconName={"volume-high"}/>

                {/* Big play-pause button */}
                <Pressable onPress={handlePlayButton}
                           className={"-mt-[60px] w-[92px] h-[92px] bg-[#76C893] rounded-full items-center justify-center"}>
                    <FontAwesome6 name={"play"} color={"white"} size={40} style={{ marginLeft: 4 }}/>
                </Pressable>

                {/* Bluetooth button*/}
                <SmallButton onPress={handlePlayButton} iconName={"bluetooth-b"}/>
                {/* Settings Button */}
                <SmallButton onPress={handlePlayButton} iconName={"gear"}/>
            </View>

        </View>
    );
}
