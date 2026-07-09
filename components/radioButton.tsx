import {Pressable, Text, View} from "react-native";

interface RadioButtonProps {
    optionName: string;
    handlePress: () => void;
}

export default function RadioButton(props: RadioButtonProps) {
    return (
        <View className={'flex-row items-center py-3'}>
            <Pressable onPress={props.handlePress} className={'bg-black w-7 h-7 rounded-full'}/>
            <Text className={"ml-5"}>{props.optionName}</Text>
        </View>
    )
}