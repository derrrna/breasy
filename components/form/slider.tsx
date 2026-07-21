import {LayoutChangeEvent, Text, View} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect, useState} from "react";

const THUMB_SIZE = 24;
const TRACK_HEIGHT = 8;
const CONTAINER_HEIGHT = 44;

interface CustomSliderProps {
    minimumValue: number;
    maximumValue: number;
    step: number;
    value: number;
    onValueChange: (value: number) => void;
    minimumTrackTintColor: string;
    maximumTrackTintColor: string;
    thumbTintColor: string;
    renderStepNumber?: boolean;
}

export default function Slider({
    minimumValue,
    maximumValue,
    step,
    value,
    onValueChange,
    minimumTrackTintColor,
    maximumTrackTintColor,
    thumbTintColor,
    renderStepNumber,
}: CustomSliderProps) {
    const stepCount = Math.round((maximumValue - minimumValue) / step) + 1;
    const valueToFraction = (v: number) => (v - minimumValue) / (maximumValue - minimumValue);

    const [containerWidth, setContainerWidth] = useState(0);
    const fraction = useSharedValue(valueToFraction(value));
    const lastCommittedIndex = useSharedValue(Math.round(valueToFraction(value) * (stepCount - 1)));

    useEffect(() => {
        fraction.value = withTiming(valueToFraction(value), {duration: 100});
        lastCommittedIndex.value = Math.round(valueToFraction(value) * (stepCount - 1));
    }, [value]);

    const onLayout = (event: LayoutChangeEvent) => {
        setContainerWidth(event.nativeEvent.layout.width);
    };

    const commitFromTouchX = (x: number) => {
        'worklet';
        if (containerWidth <= THUMB_SIZE) return;

        const usableWidth = containerWidth - THUMB_SIZE;
        const rawFraction = (x - THUMB_SIZE / 2) / usableWidth;
        const clampedFraction = Math.min(Math.max(rawFraction, 0), 1);
        const index = Math.round(clampedFraction * (stepCount - 1));
        const snappedFraction = index / (stepCount - 1);

        fraction.value = withTiming(snappedFraction, {duration: 100});

        if (index !== lastCommittedIndex.value) {
            lastCommittedIndex.value = index;
            runOnJS(onValueChange)(minimumValue + index * step);
        }
    };

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            commitFromTouchX(event.x);
        });

    const tapGesture = Gesture.Tap()
        .onEnd((event) => {
            commitFromTouchX(event.x);
        });

    const composedGesture = Gesture.Race(panGesture, tapGesture);

    const usableWidth = Math.max(containerWidth - THUMB_SIZE, 0);

    const fillStyle = useAnimatedStyle(() => ({
        width: fraction.value * usableWidth,
    }));

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [{translateX: fraction.value * usableWidth}],
    }));

    const stepValues = Array.from({length: stepCount}, (_, i) => minimumValue + i * step);

    return (
        <View>
            <GestureDetector gesture={composedGesture}>
                <View onLayout={onLayout} style={{height: CONTAINER_HEIGHT, justifyContent: 'center'}}>
                    <View
                        style={{
                            position: 'absolute',
                            left: THUMB_SIZE / 2,
                            width: usableWidth,
                            height: TRACK_HEIGHT,
                            borderRadius: TRACK_HEIGHT / 2,
                            backgroundColor: maximumTrackTintColor,
                        }}/>
                    <Animated.View
                        style={[
                            {
                                position: 'absolute',
                                left: THUMB_SIZE / 2,
                                height: TRACK_HEIGHT,
                                borderRadius: TRACK_HEIGHT / 2,
                                backgroundColor: minimumTrackTintColor,
                            },
                            fillStyle,
                        ]}/>
                    <Animated.View
                        style={[
                            {
                                position: 'absolute',
                                left: 0,
                                width: THUMB_SIZE,
                                height: THUMB_SIZE,
                                borderRadius: THUMB_SIZE / 2,
                                backgroundColor: thumbTintColor,
                            },
                            thumbStyle,
                        ]}/>
                </View>
            </GestureDetector>
            {renderStepNumber ? (
                <View
                    className={"flex-row justify-between"}
                    style={{marginHorizontal: THUMB_SIZE / 2}}>
                    {stepValues.map((stepValue) => (
                        <Text key={stepValue} className={"text-[#0F3641] text-lg font-interSemiBold"}>{stepValue}</Text>
                    ))}
                </View>
            ) : null}
        </View>
    );
}
