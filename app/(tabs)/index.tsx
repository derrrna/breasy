import {Switch, Text, View} from "react-native";
import Animated, {Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ResetButton from "@/components/resetButton";
import {useExerciseContext} from "@/store/exerciseContext";
import SoundSwitch from "@/components/soundSwitch";
import {useSettingsContext} from "@/store/settingsContext";
import {Circle} from "react-native-svg";
import PlayButton from "@/components/playButton";
import LilypadsBackground from "@/components/lilypadsBackground";
import OdometerDigit from "@/components/odometerDigit";
import {useEffect, useState} from "react";

export default function Index() {

    const {breathProgress, phaseCount, currentCycle, reset, isInhalePhase} = useExerciseContext();
    const activePresetInfo = useSettingsContext().activePresetInfo

    const tintColor = "#7FC391";
    const trailColor = "#76C89370";

    // Crossfade transition for the Inhale/Exhale label swap.
    const [displayedPhase, setDisplayedPhase] = useState(isInhalePhase);
    const phaseOpacity = useSharedValue(1);

    useEffect(() => {
        if (isInhalePhase === displayedPhase) return;

        phaseOpacity.value = withTiming(0, {duration: 150, easing: Easing.linear}, (finished) => {
            if (!finished) return;
            runOnJS(setDisplayedPhase)(isInhalePhase);
            phaseOpacity.value = withTiming(1, {duration: 150, easing: Easing.linear});
        });
    }, [isInhalePhase, displayedPhase]);

    const phaseAnimatedStyle = useAnimatedStyle(() => ({
        opacity: phaseOpacity.value,
    }));

    return (
        <View className={"flex-col w-full bg-white h-full items-center overflow-hidden"}>

            <LilypadsBackground/>

            {/* CONFIG */}
            <View className={"flex-row w-full px-6 pt-12 mb-14 justify-between items-center"}>
                <View className={"flex-col pl-4"}>
                    <Text className={"text-[#0F3641] font-interSemiBold"}>{activePresetInfo.formattedName}</Text>
                    <View className={"flex-row items-baseline -mt-1"}>
                        <Text className={"text-[#0F3641] font-interSemiBold"}>Cycle </Text>
                        <OdometerDigit digit={currentCycle} className={"text-[#0F3641] font-interSemiBold"}/>
                        <Text className={"text-[#0F3641] font-interSemiBold"}>{` / ${activePresetInfo.cycleCount}`}</Text>
                    </View>
                </View>
                <View className={"flex-row items-center gap-4"}>
                    {/* Sound on / off button */}
                    <SoundSwitch/>
                    {/* Reset Button */}
                    <ResetButton onPress={reset}/>
                </View>
            </View>

            {/* EXERCISE VISUAL */}
            <View className={"mb-10"}>
                <AnimatedCircularProgress
                    size={340}
                    width={28}
                    fill={(breathProgress / phaseCount) * 100}
                    tintColor={tintColor}
                    backgroundColor={trailColor}
                    lineCap={"round"}
                    renderCap={({ center }) => (
                        <Circle cx={center.x} cy={center.y} r="8" fill={"#4D8261"} />
                    )}
                    rotation={0}
                    duration={1000}
                    prefill={0}>
                    {() => (
                        <View className={"justify-center items-center"}>
                            <Text className={"color-[#168AAD] text-8xl font-interRegular"}>{breathProgress}</Text>
                            <Animated.View style={phaseAnimatedStyle}>
                                <Text className={"color-[#0F3641] text-3xl font-interMedium"}>
                                    {displayedPhase ? "Inhale" : "Exhale"}
                                </Text>
                            </Animated.View>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </View>

            {/* PLAY BUTTON */}
            <PlayButton/>
        </View>
    );
}
