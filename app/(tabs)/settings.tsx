import Header from "@/components/header";
import {ScrollView, Text, TextInput, View} from 'react-native';
import {SettingsContext} from "@/store/settingsContext";
import {useContext} from "react";
import Slider from "@react-native-community/slider";
import CustomPresetField from "@/components/customPresetField";
import {RadioButton} from "react-native-paper";

export default function Settings(){

    const settingsContext = useContext(SettingsContext);

    const handleRadioPress = (value: string) => {}

    const handleCustomChange = () => {

    }

    return (
        <ScrollView className={"flex-1"} contentContainerClassName={"grow justify-center items-center px-8"}>

            <Text className={"text-3xl py-6"}>Settings</Text>

            <View className={'flex-col w-full'}>
                <Text className={"text-xl my-3"}>Breathing Exercise</Text>
                <RadioButton.Group onValueChange={handleRadioPress} value={settingsContext?.activePreset ?? ''}>
                    <View className={"pl-5"}>
                        <RadioButton.Item
                            label={"Paced Breathing"}
                            value={"Paced Breathing"}
                            position={"leading"}
                            style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                            labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                        <RadioButton.Item
                            label={"Box Breathing"}
                            value={"Box Breathing"}
                            position={"leading"}
                            style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                            labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                        <RadioButton.Item
                            label={"TIPP"}
                            value={"TIPP"}
                            position={"leading"}
                            style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                            labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                        <RadioButton.Item
                            label={"Physiological Sigh"}
                            value={"Physiological Sigh"}
                            position={"leading"}
                            style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                            labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                        <RadioButton.Item
                            label={"Custom"}
                            value={"Custom"}
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