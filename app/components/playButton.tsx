import {Pressable, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import {Text} from "react-native";
import React from "react";
import {useExerciseContext} from "@/app/store/exerciseContext";

export default function PlayButton() {

    const {isRunning, toggleRunning} = useExerciseContext();

    return (
        <Pressable onPress={toggleRunning}
                   className={" mt-[-60px] w-[110px] h-[110px] m-5 bg-[#76C893] rounded-full items-center justify-center"}>
            <FontAwesome6 name={isRunning ? "pause" : "play"} color={"white"} size={55} style={{ marginLeft: isRunning ? 0 : 4 }}/>
        </Pressable>
    )
}