import {Pressable, Text, View} from "react-native";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {FontAwesome6} from "@expo/vector-icons";

export default function BottomBar({state, descriptors, navigation}: BottomTabBarProps) {

    const onFrogPress = () => {
        // TODO: decide what this button should do.
    };

    //TODO review
    return (
        <View className={"flex-row items-center px-6 pb-10 gap-4"}>
            <View className={"flex-row flex-1 bg-[#168AAD] rounded-full p-1.5"}>
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
                            className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-full ${isFocused ? "bg-white" : ""}`}>
                            {options.tabBarIcon?.({
                                focused: isFocused,
                                color: isFocused ? "#168AAD" : "white",
                                size: 22,
                            })}
                            <Text className={isFocused ? "text-[#168AAD] font-interSemiBold" : "text-white font-interSemiBold"}>
                                {label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            <Pressable
                onPress={onFrogPress}
                className={"bg-[#168AAD] rounded-full w-16 h-16 items-center justify-center"}>
                <FontAwesome6 name={"frog"} size={26} color={"white"}/>
            </Pressable>
        </View>
    );
}
