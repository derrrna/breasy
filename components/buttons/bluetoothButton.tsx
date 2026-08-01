import {Pressable, View, Text} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";
import colors from "@/utils/colors";

export default function BluetoothButton() {

    //TODO
    const handleConnect = () => {}

    return (
        <Pressable onPress={handleConnect}>
            <View className={"bg-primary flex-row items-center gap-2 px-6 py-3 rounded-lg"}>
                <FontAwesome6 name={"frog"} color={colors.offWhite} size={22} />
            </View>
        </Pressable>
    )
}