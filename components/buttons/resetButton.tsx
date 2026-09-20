import {Pressable, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import colors from "@/utils/colors";

interface ResetButtonProps {
    onPress: () => void;
}

export default function ResetButton(props: ResetButtonProps) {
    const rotateProgress = useSharedValue(0);

    const onPress = () => {
        rotateProgress.value = 0;
        rotateProgress.value = withTiming(1, {duration: 400});
        props.onPress();
    };

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{rotate: `${rotateProgress.value * -360}deg`}],
    }));

    return (
        <Pressable onPress={onPress}>
            <View className={"items-center rounded-xl justify-center w-14 h-14 overflow-hidden bg-primary"}>
                <Animated.View style={iconStyle}>
                    <FontAwesome6 name={"arrows-rotate"} color={colors.offWhite} size={28} />
                </Animated.View>
            </View>
        </Pressable>
    );
}
