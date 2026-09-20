import {Pressable, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";
import {useRouter} from "expo-router";
import colors from "@/utils/colors";

// 80% of the 56px reset/frog buttons.
const SIZE = 45;
const ICON_SIZE = 22;

export default function BackButton() {
    const router = useRouter();

    return (
        <Pressable onPress={() => router.back()}>
            <View className={"items-center rounded-xl justify-center overflow-hidden bg-primary"} style={{width: SIZE, height: SIZE}}>
                <FontAwesome6 name={"arrow-left"} color={colors.offWhite} size={ICON_SIZE} />
            </View>
        </Pressable>
    );
}
