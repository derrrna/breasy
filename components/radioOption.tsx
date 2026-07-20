import {Pressable, Text, View} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect} from "react";

const RADIO_SIZE = 25;
const BORDER_WIDTH = 5;
const RADIO_COLOR = "#168AAD";
const RADIO_UNCHECKED_FILL = "#F8FDFF";
const INNER_SIZE = RADIO_SIZE - BORDER_WIDTH * 2;

interface RadioOptionProps {
    label: string;
    checked: boolean;
    onPress: () => void;
}

export default function RadioOption({label, checked, onPress}: RadioOptionProps) {
    const unfilled = useSharedValue(checked ? 0 : 1);

    useEffect(() => {
        unfilled.value = withTiming(checked ? 0 : 1, {duration: 150});
    }, [checked]);

    const unfilledStyle = useAnimatedStyle(() => ({
        transform: [{scale: unfilled.value}],
    }));

    return (
        <Pressable onPress={onPress} className={"flex-row items-center py-3 gap-3"}>
            <View
                style={{
                    width: RADIO_SIZE,
                    height: RADIO_SIZE,
                    borderRadius: RADIO_SIZE / 2,
                    backgroundColor: RADIO_COLOR,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Animated.View
                    style={[
                        {
                            width: INNER_SIZE,
                            height: INNER_SIZE,
                            borderRadius: INNER_SIZE / 2,
                            backgroundColor: RADIO_UNCHECKED_FILL,
                        },
                        unfilledStyle,
                    ]}/>
            </View>
            <Text className={"text-[#0F3641] font-interSemiBold text-[13px]"}>{label}</Text>
        </Pressable>
    );
}
