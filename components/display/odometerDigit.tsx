import {Text, View} from "react-native";
import Animated, {Easing, useAnimatedStyle} from "react-native-reanimated";
import {useAnimatedValue} from "@/hooks/useAnimatedValue";

const DIGIT_HEIGHT = 24;
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface OdometerDigitProps {
    digit: number;
    className?: string;
}

// TODO: single-digit only (0-9) - custom presets have no cap on cycle count
// yet, so currentCycle can exceed 9. Add validation on the custom breathing
// exercise fields to cap cycle count, or extend this to multi-digit columns.
export default function OdometerDigit({digit, className}: OdometerDigitProps) {

    const translateY = useAnimatedValue(digit * -DIGIT_HEIGHT, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
    });

    const stripStyle = useAnimatedStyle(() => ({
        transform: [{translateY: translateY.value}],
    }));

    return (
        <View style={{height: DIGIT_HEIGHT, overflow: "hidden"}}>
            <Animated.View style={stripStyle}>
                {DIGITS.map((d) => (
                    <Text key={d} className={className} style={{height: DIGIT_HEIGHT, lineHeight: DIGIT_HEIGHT}}>
                        {d}
                    </Text>
                ))}
            </Animated.View>
        </View>
    );
}
