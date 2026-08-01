import {LayoutChangeEvent, Pressable, StyleSheet, View} from "react-native";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {FontAwesome6} from "@expo/vector-icons";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import {useState} from "react";
import {DROP_SHADOW} from "@/utils/styles";
import colors from "@/utils/colors";
import {useAnimatedValue} from "@/hooks/useAnimatedValue";

const ACTIVE_COLOR = colors.textPrimary;
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
    const progress = useAnimatedValue(focused ? 1 : 0, {duration: COLOR_TRANSITION_DURATION});
    const activeStyle = useAnimatedStyle(() => ({opacity: progress.value}));
    const inactiveStyle = useAnimatedStyle(() => ({opacity: 1 - progress.value}));
    const activeTextStyle = useAnimatedStyle(() => ({opacity: progress.value, color: ACTIVE_COLOR}));
    const inactiveTextStyle = useAnimatedStyle(() => ({opacity: 1 - progress.value, color: INACTIVE_COLOR}));

    return (
        <View className={"items-center justify-center gap-1"}>
            <View>
                <Animated.View style={inactiveStyle}>
                    {icon(INACTIVE_COLOR)}
                </Animated.View>
                <Animated.View style={[StyleSheet.absoluteFill, activeStyle]}>
                    {icon(ACTIVE_COLOR)}
                </Animated.View>
            </View>
            <View>
                <Animated.Text className={"font-interSemiBold text-sm"} style={inactiveTextStyle}>
                    {label}
                </Animated.Text>
                <Animated.Text className={"font-interSemiBold text-sm"} style={[StyleSheet.absoluteFill, activeTextStyle]}>
                    {label}
                </Animated.Text>
            </View>
        </View>
    );
}

export default function BottomBar({state, descriptors, navigation}: BottomTabBarProps) {

    const [tabsWidth, setTabsWidth] = useState(0);
    const tabWidth = tabsWidth / state.routes.length;
    const pillOffset = useAnimatedValue(state.index * tabWidth, {spring: {damping: 16, stiffness: 164.7, mass: 0.4}});

    const pillStyle = useAnimatedStyle(() => ({
        transform: [{translateX: pillOffset.value}],
    }));

    const onTabsLayout = (event: LayoutChangeEvent) => {
        setTabsWidth(event.nativeEvent.layout.width);
    };

    const onFrogPress = () => {
        // TODO: decide what this button should do.
    };

    const renderTab = (route: (typeof state.routes)[number], index: number) => {
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
                    icon={(color) => options.tabBarIcon?.({focused: isFocused, color, size: 22})}
                />
            </Pressable>
        );
    };

    return (
        <View className={"absolute bottom-0 left-0 right-0 flex-row items-center px-6 pb-10 gap-4"}>

            {/* TABS */}
            <View className={"flex-row flex-1 bg-primary rounded-full p-1.5"} style={DROP_SHADOW}>
                <View onLayout={onTabsLayout} className={"flex-row flex-1"}>

                    {/* ACTIVE TAB PILL */}
                    {tabsWidth > 0 ? (
                        <Animated.View
                            className={"absolute top-0 bottom-0 left-0 rounded-full bg-white"}
                            style={[{width: tabWidth}, pillStyle]}
                        />
                    ) : null}

                    {state.routes.map(renderTab)}

                </View>
            </View>

            {/* FROG BUTTON */}
            <Pressable onPress={onFrogPress}>
                <View
                    className={"bg-primary rounded-full items-center justify-center"}
                    style={{width: FROG_SIZE, height: FROG_SIZE, ...DROP_SHADOW}}>
                    <FontAwesome6 name={"frog"} size={34} color={"white"}/>
                </View>
            </Pressable>

        </View>
    );
}
