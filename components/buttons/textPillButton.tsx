import {Pressable, Text} from "react-native";
import React from "react";
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import colors from "@/utils/colors";

interface TextPillButtonProps {
    label: string;
    onPress: () => void;
}

export default function TextPillButton({label, onPress}: TextPillButtonProps) {
    const colorProgress = useSharedValue(0);

    const onPressIn = () => {
        colorProgress.value = withTiming(1, {duration: 100});
    };
    const onPressOut = () => {
        colorProgress.value = withTiming(0, {duration: 200});
    };

    const containerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(colorProgress.value, [0, 1], [colors.primary, colors.primarySoft]),
    }));

    return (
        <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={{alignSelf: "flex-start"}}>
            <Animated.View style={containerStyle} className={"rounded-xl px-5 py-3 items-center justify-center"}>
                <Text className={"text-offWhite font-interSemiBold text-sm"}>{label}</Text>
            </Animated.View>
        </Pressable>
    );
}
