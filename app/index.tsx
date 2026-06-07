import {Button, Text, View} from "react-native";
import "./global.css";

export default function Index() {

    //TODO
    const handlePlayButton = () => {}

    return (
        <View className="flex items-center justify-center bg-white">
            <Text> Made by Danna </Text>
            <Text> Breasy </Text>

            <Button
                title={"test button"}
                onPress={handlePlayButton}
            />

        </View>
    );
}
