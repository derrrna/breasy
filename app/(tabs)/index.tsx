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

    const tintColor = "#76C893";
    const trailColor = "#76C89370";

    return (
        <View className={"flex-col w-full bg-white h-full items-center overflow-hidden"}>

            <LilypadsBackground/>

            {/* CONFIG */}
            <View className={"flex-row w-full px-6 pt-14 mb-10 justify-between items-center"}>
                <View className={"flex-col"}>
                    <Text className={"text-[#0F3641] font-medium"}>{useSettingsContext().activePreset}</Text>
                    <Text className={"text-[#0F3641] font-medium"}>
                        Cycle: {`${currentCycle} / ${activePresetInfo.cycleCount}` }
                    </Text>
                </View>
                <View className={"flex-row items-center gap-3"}>
                    {/* Sound on / off button */}
                    <SoundSwitch/>
                    {/* Reset Button */}
                    <ResetButton onPress={reset}/>
                </View>

            </View>

            {/* EXERCISE VISUAL */}
            <View className={"mb-10"}>
                <AnimatedCircularProgress
                    size={350}
                    width={20}
                    fill={(breathProgress / phaseCount) * 100}
                    tintColor={tintColor}
                    backgroundColor={trailColor}
                    lineCap={"round"}
                    renderCap={({ center }) => (
                        <Circle cx={center.x} cy={center.y} r="10" fill={"#4D8261"} />
                    )}
                    rotation={0}
                    duration={1000}
                    prefill={0}>
                    {() => (
                        <View className={"justify-center items-center"}>
                            <Text className={"color-[#168AAD] text-8xl"}>{breathProgress}</Text>
                            <Text>{isInhalePhase ? "Inhale" : "Exhale"}</Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </View>

            {/* PLAY BUTTON */}
            <PlayButton/>
        </View>
    );
}
