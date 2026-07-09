import {Text, TextInput, View} from "react-native";
import {useSettingsContext} from "@/store/settingsContext";

interface CustomPresetFieldProps {
    name: string;
}

export default function CustomPresetField(props: CustomPresetFieldProps) {

    const settingsContext = useSettingsContext();

    return (
        <View className={"flex-row items-center"}>
            <Text className={"mr-3"}>{props.name}:</Text>
            <TextInput
                className={"border-b-2 h-14 w-16 text-black text-center px-1"}
                placeholder={"4"}
                //TODO onChange
                value={settingsContext?.customPreset.inhaleCount.toString()}
                keyboardType={"numeric"}/>
        </View>
    )
}