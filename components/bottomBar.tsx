import {Animated as RNAnimated, LayoutChangeEvent, Pressable, StyleSheet, View} from "react-native";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {FontAwesome6} from "@expo/vector-icons";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {useEffect, useRef, useState} from "react";
import {DROP_SHADOW} from "@/utils/styles";

const ACTIVE_COLOR = "#0F3641";
const INACTIVE_COLOR = "white";
const COLOR_TRANSITION_DURATION = 100;
const TAB_VERTICAL_PADDING = 3;
const FROG_SIZE = 75;

function TabButtonContent({
    focused,
    label,
    icon,
}: {
    focused: boolean;
    label: string;
    icon: (color: string) => React.ReactNode;
}) {
    const progress = useRef(new RNAnimated.Value(focused ? 1 : 0)).current;

    useEffect(() => {
        RNAnimated.timing(progress, {
            toValue: focused ? 1 : 0,
            duration: COLOR_TRANSITION_DURATION,
            useNativeDriver: true,
        }).start();
    }, [focused]);

    const activeOpacity = progress;
    const inactiveOpacity = progress.interpolate({inputRange: [0, 1], outputRange: [1, 0]});

    return (
        <View className={"items-center justify-center gap-1"}>
            <View>
                <RNAnimated.View style={{opacity: inactiveOpacity}}>{icon(INACTIVE_COLOR)}</RNAnimated.View>
                <RNAnimated.View style={[StyleSheet.absoluteFill, {opacity: activeOpacity}]}>{icon(ACTIVE_COLOR)}</RNAnimated.View>
            </View>
            <View>
                <RNAnimated.Text className={"font-interSemiBold text-sm"} style={{opacity: inactiveOpacity, color: INACTIVE_COLOR}}>
                    {label}
                </RNAnimated.Text>
                <RNAnimated.Text
                    className={"font-interSemiBold text-sm"}
                    style={[StyleSheet.absoluteFill, {opacity: activeOpacity, color: ACTIVE_COLOR}]}>
                    {label}
                </RNAnimated.Text>
            </View>
        </View>
    );
}

export default function BottomBar({state, descriptors, navigation}: BottomTabBarProps) {

    const onFrogPress = () => {
        // TODO: decide what this button should do.
    };

    const [tabsWidth, setTabsWidth] = useState(0);
    const tabWidth = tabsWidth / state.routes.length;
    const pillOffset = useSharedValue(state.index * tabWidth);

    useEffect(() => {
        pillOffset.value = withSpring(state.index * tabWidth, {damping: 13, stiffness: 183, mass: 0.4});
    }, [state.index, tabWidth]);

    const pillStyle = useAnimatedStyle(() => ({
        transform: [{translateX: pillOffset.value}],
    }));

    const onTabsLayout = (event: LayoutChangeEvent) => {
        setTabsWidth(event.nativeEvent.layout.width);
    };

    //TODO review
    return (
        <View className={"absolute bottom-0 left-0 right-0 flex-row items-center px-6 pb-10 gap-4"}>
            <View className={"flex-row flex-1 bg-[#168AAD] rounded-full p-1.5"} style={DROP_SHADOW}>
                <View onLayout={onTabsLayout} className={"flex-row flex-1"}>
                    {tabsWidth > 0 ? (
                        <Animated.View
                            style={[
                                {
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    width: tabWidth,
                                    borderRadius: 9999,
                                    backgroundColor: 'white',
                                },
                                pillStyle,
                            ]}/>
                    ) : null}
                    {state.routes.map((route, index) => {
                        const {options} = descriptors[route.key];
                        const isFocused = state.index === index;
                        const label = options.title ?? route.name;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        return (
                            <Pressable
                                key={route.key}
                                onPress={onPress}
                                className={"flex-1 items-center justify-center rounded-full"}
                                style={{paddingVertical: TAB_VERTICAL_PADDING}}>
                                <TabButtonContent
                                    focused={isFocused}
                                    label={label}
                                    icon={(color) => options.tabBarIcon?.({focused: isFocused, color, size: 22})}/>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
            <Pressable onPress={onFrogPress}>
                <View
                    className={"bg-[#168AAD] rounded-full items-center justify-center"}
                    style={{width: FROG_SIZE, height: FROG_SIZE, ...DROP_SHADOW}}>
                    <FontAwesome6 name={"frog"} size={34} color={"white"}/>
                </View>
            </Pressable>
        </View>
    );
}
