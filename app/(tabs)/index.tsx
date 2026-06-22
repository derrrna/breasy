import {Button, Pressable, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function Index() {

    //TODO
    const handlePlayButton = () => {
    }

    return (
        <View className={"flex-1 flex-col items-center justify-center"}>

            <View className={"flex-col items-center mb-[80px]"}>
                <Text className={"text-5xl"} style={{ lineHeight: 64 }}> breasy </Text>
                <Text className={"text-xl"}> Made by Danna </Text>
            </View>

            <Pressable onPress={handlePlayButton}>
                <Ionicons name="play-circle" color={"#76C893"} size={300} />
            </Pressable>

        </View>
    );
}
