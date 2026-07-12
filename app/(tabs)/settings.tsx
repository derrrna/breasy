import {ScrollView, Text, View} from 'react-native';
import {SettingsContext} from "@/store/settingsContext";
import {useContext} from "react";
import Slider from "@react-native-community/slider";
import CustomPresetField from "@/components/customPresetField";
import {RadioButton} from "react-native-paper";
import {isPresetName} from "@/utils/presets";

export default function Settings(){

    const settingsContext = useContext(SettingsContext);

    const handleRadioPress = (value: string) => {
        if (isPresetName(value)) {
            settingsContext?.setActivePreset(value);
        }
    }

    return (
        <ScrollView className={"flex-1"} contentContainerClassName={"grow justify-center items-center px-8"}>

            <Text className={"text-3xl py-6"}>Settings</Text>

            <View className={'flex-col w-full'}>
                <Text className={"text-xl my-3"}>Breathing Exercise</Text>
                <RadioButton.Group onValueChange={handleRadioPress} value={settingsContext?.activePreset ?? "paced"}>
                    <View className={"pl-5"}>
                        <RadioButton.Item
                            label={"Paced Breathing"}
                            value={"paced"}
                            position={"leading"}
                            style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                            labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                        <RadioButton.Item
                            label={"Box Breathing"}
                            value={"box"}
                            position={"leading"}
                            style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                            labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                        <RadioButton.Item
                            label={"Physiological Sigh"}
                            value={"sigh"}
                            position={"leading"}
                            style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                            labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                        <RadioButton.Item
                            label={"Custom"}
                            value={"custom"}
                            position={"leading"}
                            style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                            labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                    </View>
                </RadioButton.Group>
            </View>

            <View className={'flex-col w-full'}>
                <Text className={"text-xl my-3"}>Custom</Text>
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
            </View>

            <View className={'flex-col w-full pt-8'}>
                <Text className={"text-xl my-3"}>Vibration Strength</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    renderStepNumber={true}
                    value={settingsContext?.vibrationStrength}
                    onValueChange={settingsContext?.setVibrationStrength}
                />
            </View>
        </ScrollView>
    )

}