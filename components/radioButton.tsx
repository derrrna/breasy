import {Pressable, Text, View} from "react-native";

interface RadioButtonProps {
    optionName: string;
    handlePress: () => void;
}

export default function RadioButton(props: RadioButtonProps) {
    return (
        <View className={'flex-row items-center'}>
            <Pressable onPress={props.handlePress} className={'bg-black w-2 h-2'}/>
            <Text>{props.optionName}</Text>
        </View>
    )
}