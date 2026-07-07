import {Switch, Text, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ResetButton from "@/components/resetButton";
import {useExerciseContext} from "@/store/exerciseContext";

export default function Index() {

    const {breathProgress, phaseCount, currentCycle, reset} = useExerciseContext();

    return (
        <View className={"flex flex-col w-full bg-white h-full items-center justify-center"}>

            {/* CONFIG */}
            <View className={"flex-row items-center justify-center px-6 pb-10 "}>
                {/* Sound on / off button */}
                <Switch></Switch>
                {/* Reset Button */}
                <ResetButton onPress={reset}/>
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
