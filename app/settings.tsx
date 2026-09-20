import {ScrollView, Text, View} from 'react-native';
import {DROP_SHADOW} from "@/utils/styles";
import {useSettingsContext} from "@/contexts/settingsContext";
import SettingsSection from "@/components/form/settingsSection";
import ExerciseSelection from "@/components/form/exerciseSelection";
import Slider from "@/components/form/slider";
import CountPicker from "@/components/form/countPicker";
import {CUSTOM_CONSTRAINTS} from "@/utils/presets";
import colors from "@/utils/colors";
import BackButton from "@/components/buttons/backButton";
import TextPillButton from "@/components/buttons/textPillButton";

// Spacing, px. Same edge margin as the home screen controls.
const HEADER_TOP = 65;
const EDGE_MARGIN = 24;
const RESET_PILL_TOP = 4;       // description to "Reset to Default"
const RESET_PILL_BOTTOM = 16;   // "Reset to Default" to first picker
const HEADER_BOTTOM = 12;

export default function Settings(){

    const settingsContext = useSettingsContext();

    return (
        <View className={"flex-1 bg-offWhite"}>

            {/* HEADER */}
            <View
                className={"bg-offWhite z-10"}
                style={{paddingTop: HEADER_TOP, paddingBottom: HEADER_BOTTOM, paddingHorizontal: EDGE_MARGIN, ...DROP_SHADOW}}>
                <View className={"flex-row items-center"}>
                    <BackButton/>
                    <View className={"absolute inset-0 items-center justify-center"} pointerEvents={"none"}>
                        <Text className={"text-textPrimary font-interMedium text-lg"}>settings</Text>
                    </View>
                </View>
            </View>

        <ScrollView className={"flex-1"}
                    contentContainerClassName={"grow items-center px-8 pt-8"}>
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

                <View style={{marginTop: RESET_PILL_TOP, marginBottom: RESET_PILL_BOTTOM}}>
                    <TextPillButton label={"Reset to Default"} onPress={settingsContext.resetPacedCounts}/>
                </View>

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
                    constraints={CUSTOM_CONSTRAINTS.cycle}
                    marginBottom={20}/>

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
        </View>
    )

}