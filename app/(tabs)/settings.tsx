import {ScrollView, View} from 'react-native';
import {useSettingsContext} from "@/contexts/settingsContext";
import SettingsSection from "@/components/form/settingsSection";
import ExerciseSelection from "@/components/form/exerciseSelection";
import Slider from "@/components/form/slider";
import CountPicker from "@/components/form/countPicker";
import {CUSTOM_CONSTRAINTS} from "@/utils/presets";
import colors from "@/utils/colors";
import ResetButton from "@/components/buttons/resetButton";

export default function Settings(){

    const settingsContext = useSettingsContext();

    return (
        <ScrollView className={"flex-1"}
                    contentContainerClassName={"bg-offWhite grow justify-center items-center px-8 pt-8"}>
            {/* BREATHING EXERCISE */}
            <SettingsSection
                title={"Breathing Exercise"}
                description={"Select a breathing exercise to perform."}>
                <ExerciseSelection/>
            </SettingsSection>

            {/* PACED BREATHING COUNTS */}
            <SettingsSection
                title={"Modify Paced Breathing"}
                description={"Adjust the counts for Paced Breathing."}>

                <CountPicker
                    name={"Inhale"}
                    value={settingsContext.inhaleCount}
                    onValueChange={settingsContext.setInhaleCount}
                    constraints={CUSTOM_CONSTRAINTS.inhale}/>

                <CountPicker
                    name={"Exhale"}
                    value={settingsContext.exhaleCount}
                    onValueChange={settingsContext.setExhaleCount}
                    constraints={CUSTOM_CONSTRAINTS.exhale}/>

                <CountPicker
                    name={"Cycle"}
                    value={settingsContext.cycleCount}
                    onValueChange={settingsContext.setCycleCount}
                    constraints={CUSTOM_CONSTRAINTS.cycle}/>

                {/* Back to the preset defaults. Provisional placement, to be judged on device. */}
                <View className={"flex-row justify-end mt-4 mb-5"}>
                    <ResetButton onPress={settingsContext.resetPacedCounts}/>
                </View>

            </SettingsSection>

            {/* VIBRATION STRENGTH */}
            <SettingsSection
                title={"Vibration Strength"}
                description={"Select the strength of vibration for Froggie."}>
                <Slider
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={`${colors.primary}80`}
                    thumbTintColor={colors.primary}
                    minimumValue={CUSTOM_CONSTRAINTS.vibration.min}
                    maximumValue={CUSTOM_CONSTRAINTS.vibration.max}
                    step={1}
                    renderStepNumber={true}
                    value={settingsContext.vibrationStrength}
                    onValueChange={settingsContext.setVibrationStrength}
                />
            </SettingsSection>
            <View className={"h-40"}></View>
        </ScrollView>
    )

}