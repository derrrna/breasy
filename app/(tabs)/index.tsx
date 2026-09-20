import {Text, View} from "react-native";
import Animated from "react-native-reanimated";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ResetButton from "@/components/buttons/resetButton";
import {useExerciseContext} from "@/contexts/exerciseContext";
import SoundSwitch from "@/components/buttons/soundSwitch";
import {useSettingsContext} from "@/contexts/settingsContext";
import {Circle} from "react-native-svg";
import PlayButton from "@/components/buttons/playButton";
import LilypadsBackground from "@/components/display/lilypadsBackground";
import OdometerDigit from "@/components/display/odometerDigit";
import {useCrossfade} from "@/hooks/useCrossfade";
import colors from "@/utils/colors";
import {PhaseKind} from "@/utils/presets";

// Everything the home screen shows per phase, kept together so a new phase kind is
// one row here rather than three scattered conditionals.
const PHASE_DISPLAY: Record<PhaseKind, {label: string, ring: string, cap: string}> = {
    inhale: {label: "Inhale", ring: colors.secondary, cap: colors.secondaryDark},
    hold: {label: "Hold", ring: colors.hold, cap: colors.holdDark},
    exhale: {label: "Exhale", ring: colors.secondary, cap: colors.secondaryDark},
};

export default function Index() {

    const {breathProgress, phaseCount, currentCycle, reset, phase} = useExerciseContext();
    const {ring, cap} = PHASE_DISPLAY[phase];
    const activePresetInfo = useSettingsContext().activePresetInfo

    // Crossfade transition for the phase label swap.
    const {displayedValue: displayedPhase, animatedStyle: phaseAnimatedStyle} = useCrossfade(phase);

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
                    tintColor={ring}
                    backgroundColor={`${ring}70`}
                    lineCap={"round"}
                    renderCap={({ center }) => (
                        <Circle cx={center.x} cy={center.y} r="8" fill={cap} />
                    )}
                    rotation={0}
                    duration={1000}
                    prefill={0}>
                    {() => (
                        <View className={"justify-center items-center"}>
                            <Text className={"color-primary text-8xl font-interRegular"}>{breathProgress}</Text>
                            <Animated.View style={phaseAnimatedStyle}>
                                <Text className={"color-textPrimary text-3xl font-interMedium"}>
                                    {PHASE_DISPLAY[displayedPhase].label}
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
