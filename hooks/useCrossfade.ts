import {Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect, useState} from "react";

const FADE_DURATION = 150;

export function useCrossfade<T>(value: T) {
    const [displayedValue, setDisplayedValue] = useState(value);
    const opacity = useSharedValue(1);

    useEffect(() => {
        if (value === displayedValue) return;

        opacity.value = withTiming(0, {duration: FADE_DURATION, easing: Easing.linear}, (finished) => {
            if (!finished) return;
            runOnJS(setDisplayedValue)(value);
            opacity.value = withTiming(1, {duration: FADE_DURATION, easing: Easing.linear});
        });
    }, [value, displayedValue]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return {displayedValue, animatedStyle};
}
