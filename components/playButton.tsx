import {Pressable} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React, {useEffect} from "react";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming} from "react-native-reanimated";
import {useExerciseContext} from "@/contexts/exerciseContext";
import colors from "@/utils/colors";

export default function PlayButton() {

    const {isRunning, toggleRunning} = useExerciseContext();

    const pressScale = useSharedValue(1);
    const iconScale = useSharedValue(1);

    const onPressIn = () => {
        pressScale.value = withTiming(0.98, {duration: 15});
    };
    const onPressOut = () => {
        pressScale.value = withSpring(1, {stiffness: 100, damping: 10});
    };

    useEffect(() => {
        iconScale.value = withSequence(
            withTiming(0, {duration: 120, easing: Easing.out(Easing.quad)}),
            withTiming(1, {duration: 130, easing: Easing.out(Easing.quad)}),
        );
    }, [isRunning]);

    const pressStyle = useAnimatedStyle(() => ({
        transform: [{scale: pressScale.value}],
        backgroundColor: isRunning ? colors.secondary : colors.secondaryLight,
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{scale: iconScale.value}],
    }));

    return (
        <Pressable onPress={toggleRunning} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={pressStyle}
                           className={"  w-[110px] h-[110px]  rounded-full items-center justify-center"}>
                <Animated.View style={iconStyle}>
                    <FontAwesome6 name={isRunning ? "pause" : "play"} color={"white"} size={55} style={{ marginLeft: isRunning ? 0 : 4 }}/>
                </Animated.View>
            </Animated.View>
        </Pressable>
    )
}
