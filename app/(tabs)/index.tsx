import {Switch, Text, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ResetButton from "@/components/resetButton";
import {useExerciseContext} from "@/store/exerciseContext";
import SoundSwitch from "@/components/soundSwitch";
import {useSettingsContext} from "@/store/settingsContext";
import {Circle} from "react-native-svg";
import PlayButton from "@/components/playButton";

export default function Index() {

    const {breathProgress, phaseCount, currentCycle, reset, isInhalePhase} = useExerciseContext();
    const activePresetInfo = useSettingsContext().activePresetInfo

    const tintColor = isInhalePhase ? "#76C893" : "#F4A259";
    const trailColor = isInhalePhase ? "#76C89370" : "#F4A25970";

    return (
        <View className={"flex-col w-full bg-white h-full items-center "}>

            {/* CONFIG */}
            <View className={"flex-row w-full px-6 pt-16 mb-10 justify-between"}>
                <View className={"flex-col"}>
                    {/* TODO */}
                    <Text>{useSettingsContext().activePreset}</Text>
                    <Text className={"color-[#168AAD] text-xl"}>
                        Cycle: {`${currentCycle} / ${activePresetInfo.cycleCount}` }
                    </Text>
                </View>
                <View className={"flex-row"}>
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
                    tintColor={tintColor as unknown as string}
                    backgroundColor={trailColor as unknown as string}
                    lineCap={"round"}
                    renderCap={({ center }) => (
                        <Circle cx={center.x} cy={center.y} r="10" fill={isInhalePhase ? "#4D8261" : "#A15C1E"} />
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
