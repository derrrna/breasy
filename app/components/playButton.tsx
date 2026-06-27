import {Pressable, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import {Text} from "react-native";
import React from "react";

export default function PlayButton() {

    const handlePlayButton = () => {}

    return (
        <Pressable onPress={handlePlayButton}
                   className={" mt-[-60px] w-[110px] h-[110px] m-5 bg-[#76C893] rounded-full items-center justify-center"}>
            <FontAwesome6 name={"play"} color={"white"} size={55} style={{ marginLeft: 4 }}/>
        </Pressable>
    )
}