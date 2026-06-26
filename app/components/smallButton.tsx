import {Animated, Pressable} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React, {useRef} from "react";

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome6>["name"];

interface SmallButtonProps {
    onPress: () => void;
    iconName: FontAwesomeIconName;
}

export default function SmallButton(props: SmallButtonProps) {
    const colorAnim = useRef(new Animated.Value(0)).current;

    const onPressIn = () => Animated.timing(colorAnim, { toValue: 1, duration: 100, useNativeDriver: false }).start();
    const onPressOut = () => Animated.timing(colorAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();

    const backgroundColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#76C893', '#5aaf7a'],
    });

    return (
        <Pressable onPress={props.onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={{ backgroundColor }} className={"items-center rounded-xl justify-center w-14 h-14"}>
                <FontAwesome6 name={props.iconName} color={"#FEFEFE"} size={23} />
            </Animated.View>
        </Pressable>
    );
}
