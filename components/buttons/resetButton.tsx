import {Pressable} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import colors from "@/utils/colors";

interface ResetButtonProps {
    onPress: () => void;
}

export default function ResetButton(props: ResetButtonProps) {
    const colorProgress = useSharedValue(0);
    const rotateProgress = useSharedValue(0);

    const onPressIn = () => {
        colorProgress.value = withTiming(1, {duration: 100});
    };
    const onPressOut = () => {
        colorProgress.value = withTiming(0, {duration: 200});
    };

    const onPress = () => {
        rotateProgress.value = 0;
        rotateProgress.value = withTiming(1, {duration: 400});
        props.onPress();
    };

    const containerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(colorProgress.value, [0, 1], [colors.primarySoft, colors.primary]),
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{rotate: `${rotateProgress.value * -360}deg`}],
    }));

    return (
        <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={containerStyle} className={"items-center rounded-xl justify-center w-14 h-14 overflow-hidden"}>
                <Animated.View style={iconStyle}>
                    <FontAwesome6 name={"arrows-rotate"} color={colors.offWhite} size={34} />
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}
