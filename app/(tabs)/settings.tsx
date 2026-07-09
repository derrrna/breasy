import Header from "@/components/header";
import {ScrollView, Text, TextInput, View} from 'react-native';
import RadioButton from "@/components/radioButton";
import {SettingsContext} from "@/store/settingsContext";
import {useContext} from "react";
import Slider from "@react-native-community/slider";
import CustomPresetField from "@/components/customPresetField";

export default function Settings(){

    const settingsContext = useContext(SettingsContext);

    const handleRadioPress = () => {}

    const handleCustomChange = () => {

    }

    return (
        <ScrollView contentContainerClassName={"justify-center items-center px-8"}>

            <Text className={"text-3xl py-6"}>Settings</Text>

            <View className={'flex-col w-full'}>
                <Text className={"text-xl my-3"}>Breathing Exercise</Text>
                <View className={"pl-5"}>
                    <RadioButton optionName={"Box Breathing"} handlePress={handleRadioPress}/>
                    <RadioButton optionName={"TIPP"} handlePress={handleRadioPress}/>
                    <RadioButton optionName={"Physiological Sigh"} handlePress={handleRadioPress}/>
                    <RadioButton optionName={"Custom"} handlePress={handleRadioPress}/>
                </View>
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