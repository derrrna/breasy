import {ScrollView, View} from 'react-native';
import {SettingsContext} from "@/store/settingsContext";
import {useContext} from "react";
import SettingsSection from "@/components/form/settingsSection";
import ExerciseSelection from "@/components/form/exerciseSelection";
import Slider from "@/components/form/slider";
import CountPicker from "@/components/form/countPicker";
import {CUSTOM_CONSTRAINTS} from "@/utils/presets";

export default function Settings(){

    const settingsContext = useContext(SettingsContext);

    return (
        <ScrollView className={"flex-1"}
                    contentContainerClassName={"bg-[#FEFEFE] grow justify-center items-center px-8 pt-8"}>
            <SettingsSection
                title={"Breathing Exercise"}
                description={"Select a breathing exercise to perform."}>
                <ExerciseSelection/>
            </SettingsSection>

            <SettingsSection
                title={"Custom Exercise"}
                description={"Set a custom breathing exercise."}>

                <CountPicker
                    name={"Inhale"}
                    value={settingsContext?.inhaleCount ?? 4}
                    onValueChange={(value) => settingsContext?.setInhaleCount(value)}
                    constraints={CUSTOM_CONSTRAINTS.inhale}/>

                <CountPicker
                    name={"Exhale"}
                    value={settingsContext?.exhaleCount ?? 6}
                    onValueChange={(value) => settingsContext?.setExhaleCount(value)}
                    constraints={CUSTOM_CONSTRAINTS.exhale}/>

                <CountPicker
                    name={"Cycle"}
                    value={settingsContext?.cycleCount ?? 3}
                    onValueChange={(value) => settingsContext?.setCycleCount(value)}
                    constraints={CUSTOM_CONSTRAINTS.cycle}
                    marginBottom={20}/>

            </SettingsSection>

            <SettingsSection
                title={"Vibration Strength"}
                description={"Select the strength of vibration for Froggie."}>
                <Slider
                    minimumTrackTintColor={"#168AAD"}
                    maximumTrackTintColor={"#168AAD80"}
                    thumbTintColor={"#168AAD"}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    renderStepNumber={true}
                    value={settingsContext?.vibrationStrength ?? 0}
                    onValueChange={(v) => settingsContext?.setVibrationStrength(v)}
                />
            </SettingsSection>
            <View className={"h-40"}></View>
        </ScrollView>
    )

}