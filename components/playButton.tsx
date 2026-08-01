import {Animated, Easing, Pressable} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React, {useEffect, useRef} from "react";
import {useExerciseContext} from "@/contexts/exerciseContext";
import colors from "@/utils/colors";

export default function PlayButton() {

    const {isRunning, toggleRunning} = useExerciseContext();

    const pressScale = useRef(new Animated.Value(1)).current;
    const iconScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => Animated.timing(pressScale, { toValue: 0.98, duration: 15, useNativeDriver: true }).start();
    const onPressOut = () => Animated.spring(pressScale, { toValue: 1, tension: 100, friction: 10, useNativeDriver: true }).start();

    useEffect(() => {
        Animated.sequence([
            Animated.timing(iconScale, { toValue: 0, duration: 120, easing: Easing.out(Easing.quad), useNativeDriver: true }),
            Animated.timing(iconScale, { toValue: 1, duration: 130, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        ]).start();
    }, [isRunning]);

    return (
        <Pressable onPress={toggleRunning} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={{ transform: [{ scale: pressScale }], backgroundColor: isRunning ? colors.secondary : colors.secondaryLight }}
                           className={"  w-[110px] h-[110px]  rounded-full items-center justify-center"}>
                <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                    <FontAwesome6 name={isRunning ? "pause" : "play"} color={"white"} size={55} style={{ marginLeft: isRunning ? 0 : 4 }}/>
                </Animated.View>
            </Animated.View>
        </Pressable>
    )
}
