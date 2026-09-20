import {Pressable, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";
import colors from "@/utils/colors";

export default function FrogButton() {

    const onPress = () => {
        // TODO: decide what this button should do.
    };

    return (
        <Pressable onPress={onPress}>
            <View className={"items-center rounded-xl justify-center w-14 h-14 overflow-hidden bg-primary"}>
                <FontAwesome6 name={"frog"} color={colors.offWhite} size={25} />
            </View>
        </Pressable>
    );
}
