import {Button, Pressable, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function Index() {

    //TODO
    const handlePlayButton = () => {
    }

    return (
        <View className={"flex-1 flex-col bg-white items-center justify-center"}>

            <View className={"flex-col items-center "}>
                <Text> Made by Danna </Text>
                <Text> Breasy </Text>
            </View>

            <Pressable onPress={handlePlayButton}>
                <Ionicons name="play-circle" color={"#76C893"} size={300} />
            </Pressable>

        </View>
    );
}
