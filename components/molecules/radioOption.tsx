import {Pressable, Text, View} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect} from "react";
import colors from "@/utils/colors";

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
                className={"rounded-full bg-primary items-center justify-center"}
                style={{width: RADIO_SIZE, height: RADIO_SIZE}}>
                <View
                    className={"rounded-full bg-primaryLight"}
                    style={{width: INNER_SIZE, height: INNER_SIZE}}/>
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            width: RADIO_SIZE,
                            height: RADIO_SIZE,
                            borderRadius: RADIO_SIZE / 2,
                            backgroundColor: colors.primary,
                        },
                        filledStyle,
                    ]}/>
            </View>
            <Text className={"text-textPrimary font-interSemiBold text-md"}>{label}</Text>
        </Pressable>
    );
}
