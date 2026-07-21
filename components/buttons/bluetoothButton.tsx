import {Pressable, View, Text} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";

export default function BluetoothButton() {

    const handleConnect = () => {}

    return (
        <Pressable onPress={handleConnect}>
            <View className={"bg-[#168AAD] flex-row items-center gap-2 px-6 py-3 rounded-lg"}>
                <FontAwesome6 name={"frog"} color={"#FEFEFE"} size={22} />
                <Text className={"text-white text-lg"}>froggie connected</Text>
            </View>
        </Pressable>
    )
}