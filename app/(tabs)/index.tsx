import {Switch, Text, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ResetButton from "@/components/resetButton";
import {useExerciseContext} from "@/store/exerciseContext";
import SoundSwitch from "@/components/soundSwitch";
import {useSettingsContext} from "@/store/settingsContext";

export default function Index() {

    const {breathProgress, phaseCount, currentCycle, reset} = useExerciseContext();
    const {customPreset} = useSettingsContext();

    return (
        <View className={"flex-col w-full bg-white h-full items-center "}>

            {/* CONFIG */}
            <View className={"flex-row w-full px-6 pt-16 mb-10 justify-between"}>
                {/* Sound on / off button */}
                <SoundSwitch/>
                {/* Reset Button */}
                <ResetButton onPress={reset}/>
            </View>

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
                        <View className={"justify-center items-center"}>
                            <Text className={"color-[#168AAD] text-8xl"}>{breathProgress}</Text>
                            <Text className={"color-[#168AAD] text-xl"}>
                                Cycle: {`${currentCycle} / ${customPreset.cycleCount}` }
                            </Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </View>
            <Text>Bluetooth connection</Text>
        </View>
    );
}
