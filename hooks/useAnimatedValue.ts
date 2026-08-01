import {useEffect} from "react";
import {useSharedValue, withSpring, withTiming, WithSpringConfig, WithTimingConfig} from "react-native-reanimated";

type SpringOptions = {spring: WithSpringConfig};

export function useAnimatedValue(target: number, options: WithTimingConfig | SpringOptions = {}) {
    const value = useSharedValue(target);

    useEffect(() => {
        value.value = "spring" in options
            ? withSpring(target, options.spring)
            : withTiming(target, options);
    }, [target]);

    return value;
}
