import {Switch, Text, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ResetButton from "@/components/resetButton";
import {useExerciseContext} from "@/store/exerciseContext";
import SoundSwitch from "@/components/soundSwitch";
import {useSettingsContext} from "@/store/settingsContext";
import {Circle} from "react-native-svg";
import PlayButton from "@/components/playButton";
import LilypadsBackground from "@/components/lilypadsBackground";

export default function Index() {

    const {breathProgress, phaseCount, currentCycle, reset, isInhalePhase} = useExerciseContext();
    const activePresetInfo = useSettingsContext().activePresetInfo

    const tintColor = "#7FC391";
    const trailColor = "#76C89370";

    return (
        <View className={"flex-col w-full bg-white h-full items-center overflow-hidden"}>

            <LilypadsBackground/>

            {/* CONFIG */}
            <View className={"flex-row w-full px-6 pt-12 mb-16 justify-between items-center"}>
                <View className={"flex-col"}>
                    <Text className={"text-[#0F3641] font-interSemiBold"}>{activePresetInfo.formattedName}</Text>
                    <Text className={"text-[#0F3641] font-interSemiBold"}>
                        Cycle {`${currentCycle} / ${activePresetInfo.cycleCount}` }
                    </Text>
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
                    width={25}
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
                            <Text className={"color-[#168AAD] text-9xl font-interRegular"}>{breathProgress}</Text>
                            <Text className={"color-[#0F3641] text-3xl font-interMedium"}>{isInhalePhase ? "Inhale" : "Exhale"}</Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </View>

            {/* PLAY BUTTON */}
            <PlayButton/>
        </View>
    );
}
