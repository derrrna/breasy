import {Animated, Pressable} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React, {useRef} from "react";
import colors from "@/utils/colors";

interface ResetButtonProps {
    onPress: () => void;
}

export default function ResetButton(props: ResetButtonProps) {
    const colorAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const spinBgAnim = useRef(new Animated.Value(0)).current;

    const onPressIn = () => Animated.timing(colorAnim, { toValue: 1, duration: 100, useNativeDriver: false }).start();
    const onPressOut = () => Animated.timing(colorAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();

    const onPress = () => {
        rotateAnim.setValue(0);
        spinBgAnim.setValue(1);
        Animated.timing(rotateAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start(() => {
            Animated.timing(spinBgAnim, { toValue: 0, duration: 150, useNativeDriver: false }).start();
        });
        props.onPress();
    };

    const backgroundColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.primarySoft, colors.primary],
    });

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg'],
    });

    return (
        <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={{ backgroundColor }} className={"items-center rounded-xl justify-center w-14 h-14 overflow-hidden"}>
                <Animated.View className={"absolute inset-0 bg-primary"} style={{ opacity: spinBgAnim }} />
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <FontAwesome6 name={"arrows-rotate"} color={colors.offWhite} size={34} />
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}
