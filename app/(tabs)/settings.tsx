import {ScrollView, Text, View} from 'react-native';
import {SettingsContext} from "@/store/settingsContext";
import {useContext} from "react";
import Slider from "@react-native-community/slider";
import CustomPresetField from "@/components/customPresetField";
import {RadioButton} from "react-native-paper";
import {PRESET_NAMES, PresetNames} from "@/utils/presets";

// TODO: risky `as` - widens PRESET_NAMES's element type so .includes(value)
// accepts a plain string. Revisit if PRESET_NAMES's shape ever changes.
const isPresetName = (value: string): value is PresetNames =>
    (PRESET_NAMES as readonly string[]).includes(value);

export default function Settings(){

    const settingsContext = useContext(SettingsContext);

    const handleRadioPress = (value: string) => {
        if (isPresetName(value)) {
            settingsContext?.setActivePreset(value);
        }
    }

    const handleCustomChange = () => {}

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
                <CustomPresetField name={"Inhale Count"}/>
                <CustomPresetField name={"Exhale Count"}/>
                <CustomPresetField name={"Cycle Count"}/>
            </View>

            <View className={'flex-col w-full pt-8'}>
                <Text className={"text-xl my-3"}>Vibration Strength</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    renderStepNumber={true}
                    //TODO
                    onValueChange={settingsContext?.setVibrationStrength}
                />
            </View>
        </ScrollView>
    )

}