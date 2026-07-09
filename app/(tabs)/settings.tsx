import Header from "@/components/header";
import {ScrollView, Text, View} from 'react-native';
import RadioButton from "@/components/radioButton";
import {SettingsContext} from "@/store/settingsContext";
import {useContext} from "react";
import Slider from "@react-native-community/slider";

export default function Settings(){

    const settingsContext = useContext(SettingsContext);

    const handleRadioPress = () => {}

    return (
        <ScrollView contentContainerClassName={"justify-center items-center px-8"}>

            <Text className={"text-3xl py-6"}>Settings</Text>

            <View className={'flex-col w-full'}>
                <Text className={"text-xl my-3"}>Breathing Exercise</Text>
                <View className={"pl-5"}>
                    <RadioButton optionName={"Box Breathing"} handlePress={handleRadioPress}/>
                    <RadioButton optionName={"TIPP"} handlePress={handleRadioPress}/>
                    <RadioButton optionName={"Third Option"} handlePress={handleRadioPress}/>
                </View>

            </View>

            <View className={'flex-col w-full pt-8'}>
                <Text className={"text-xl my-3"}>Vibration Count</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    renderStepNumber={true}
                />
            </View>
        </ScrollView>
    )

}