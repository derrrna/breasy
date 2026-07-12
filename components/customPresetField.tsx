import {Text, TextInput, View} from "react-native";

interface CustomPresetFieldProps {
    name: string;
    value: number;
    onChangeValue: (value: number) => void;
}

export default function CustomPresetField({name, value, onChangeValue}: CustomPresetFieldProps) {
    return (
        <View className={"flex-row items-center"}>
            <Text className={"mr-3"}>{name}:</Text>
            <TextInput
                className={"border-b-2 h-14 w-16 text-black text-center px-1"}
                onChangeText={(text) => onChangeValue(Number(text))}
                value={value.toString()}
                keyboardType={"numeric"}/>
        </View>
    )
}