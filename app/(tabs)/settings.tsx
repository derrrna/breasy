import {ScrollView, View} from 'react-native';
import {SettingsContext} from "@/store/settingsContext";
import {useContext} from "react";
import CustomPresetField from "@/components/customPresetField";
import SettingsSection from "@/components/settingsSection";
import ExerciseSelection from "@/components/exerciseSelection";
import CustomSlider from "@/components/customSlider";

export default function Settings(){

    const settingsContext = useContext(SettingsContext);

    return (
        <ScrollView className={"flex-1"}
                    contentContainerClassName={"bg-[#FEFEFE] grow justify-center items-center px-8 pt-8"}>
            <SettingsSection
                title={"Breathing Exercise"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}>
                <ExerciseSelection/>
            </SettingsSection>

            <SettingsSection
                title={"Custom"}
                description={"Consectetur adipiscing elit sed do eiusmod tempor incididunt."}>
                <CustomPresetField
                    name={"Inhale Count"}
                    value={settingsContext?.inhaleCount ?? 4}
                    onChangeValue={(value) => settingsContext?.setInhaleCount(value)}/>
                <CustomPresetField
                    name={"Exhale Count"}
                    value={settingsContext?.exhaleCount ?? 6}
                    onChangeValue={(value) => settingsContext?.setExhaleCount(value)}/>
                <CustomPresetField
                    name={"Cycle Count"}
                    value={settingsContext?.cycleCount ?? 3}
                    onChangeValue={(value) => settingsContext?.setCycleCount(value)}/>
            </SettingsSection>

            <SettingsSection
                title={"Vibration Strength"}
                description={"Ut enim ad minim veniam quis nostrud exercitation ullamco."}>
                <CustomSlider
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