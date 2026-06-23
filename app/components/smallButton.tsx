import {Pressable} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome6>["name"];

interface SmallButtonProps {
    onPress: () => void;
    iconName: FontAwesomeIconName;
}

export default function SmallButton(props: SmallButtonProps) {
    return (
        <Pressable onPress={props.onPress}
                   className={"items-center rounded-xl justify-center w-14 h-14 bg-[#76C893]"}>
            <FontAwesome6
                name={props.iconName}
                color={"#FEFEFE"}
                size={23}
                className={""}
            />
        </Pressable>
    )
}