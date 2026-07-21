import {Pressable, Text, View} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect} from "react";

const RADIO_SIZE = 28;
const BORDER_WIDTH = 3;
const INNER_SIZE = RADIO_SIZE - BORDER_WIDTH * 2;

interface RadioOptionProps {
    label: string;
    checked: boolean;
    onPress: () => void;
}

export default function RadioOption({label, checked, onPress}: RadioOptionProps) {
    const filled = useSharedValue(checked ? 1 : 0);

    useEffect(() => {
        filled.value = withTiming(checked ? 0.5 : 0, {duration: 150});
    }, [checked]);

    const filledStyle = useAnimatedStyle(() => ({
        transform: [{scale: filled.value}],
    }));

    return (
        <Pressable onPress={onPress} className={"flex-row items-center py-3 gap-3"}>
            <View
                className={"rounded-full bg-[#168AAD] items-center justify-center"}
                style={{width: RADIO_SIZE, height: RADIO_SIZE}}>
                <View
                    className={"rounded-full bg-[#F8FDFF]"}
                    style={{width: INNER_SIZE, height: INNER_SIZE}}/>
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            width: RADIO_SIZE,
                            height: RADIO_SIZE,
                            borderRadius: RADIO_SIZE / 2,
                            backgroundColor: '#168AAD',
                        },
                        filledStyle,
                    ]}/>
            </View>
            <Text className={"text-[#0F3641] font-interSemiBold text-md"}>{label}</Text>
        </Pressable>
    );
}
