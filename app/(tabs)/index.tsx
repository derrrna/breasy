import {Switch, Text, View} from "react-native";
import Animated from "react-native-reanimated";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ResetButton from "@/components/atoms/resetButton";
import {useExerciseContext} from "@/contexts/exerciseContext";
import SoundSwitch from "@/components/molecules/soundSwitch";
import {useSettingsContext} from "@/contexts/settingsContext";
import {Circle} from "react-native-svg";
import PlayButton from "@/components/playButton";
import LilypadsBackground from "@/components/organisms/lilypadsBackground";
import OdometerDigit from "@/components/atoms/odometerDigit";
import {useCrossfade} from "@/hooks/useCrossfade";
import colors from "@/utils/colors";

export default function Index() {

    const {breathProgress, phaseCount, currentCycle, reset, isInhalePhase} = useExerciseContext();
    const activePresetInfo = useSettingsContext().activePresetInfo

    // Crossfade transition for the Inhale/Exhale label swap.
    const {displayedValue: displayedPhase, animatedStyle: phaseAnimatedStyle} = useCrossfade(isInhalePhase);

    return (
        <View className={"flex-col w-full bg-white h-full items-center overflow-hidden"}>

            <LilypadsBackground/>

            {/* CONFIG */}
            <View className={"flex-row w-full px-6 pt-12 mb-14 justify-between items-center"}>
                <View className={"flex-col pl-4"}>
                    <Text className={"text-textPrimary font-interSemiBold"}>{activePresetInfo.formattedName}</Text>
                    <View className={"flex-row items-baseline -mt-1"}>
                        <Text className={"text-textPrimary font-interSemiBold"}>Cycle </Text>
                        <OdometerDigit digit={currentCycle} className={"text-textPrimary font-interSemiBold"}/>
                        <Text className={"text-textPrimary font-interSemiBold"}>{` / ${activePresetInfo.cycleCount}`}</Text>
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
            <View className={"mb-8"}>
                <AnimatedCircularProgress
                    size={340}
                    width={28}
                    fill={(breathProgress / phaseCount) * 100}
                    tintColor={colors.secondary}
                    backgroundColor={`${colors.secondary}70`}
                    lineCap={"round"}
                    renderCap={({ center }) => (
                        <Circle cx={center.x} cy={center.y} r="8" fill={colors.secondaryDark} />
                    )}
                    rotation={0}
                    duration={1000}
                    prefill={0}>
                    {() => (
                        <View className={"justify-center items-center"}>
                            <Text className={"color-primary text-8xl font-interRegular"}>{breathProgress}</Text>
                            <Animated.View style={phaseAnimatedStyle}>
                                <Text className={"color-textPrimary text-3xl font-interMedium"}>
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
