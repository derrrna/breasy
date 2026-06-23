import {Button, Pressable, Text, View} from "react-native";
import {FontAwesome, FontAwesome6} from "@expo/vector-icons";
import SmallButton from "@/app/components/smallButton";

export default function Index() {

    //TODO
    const handlePlayButton = () => {
    }

    return (
        <View className={"flex-1 flex-col justify-center"}>

            {/* HEADER */}
            <View className={"flex-row bg-[#168AAD]"}>
                <FontAwesome name={"leaf"} className={"h-full"} color={"#76C893"}/>
                <View className={"flex-col"}>
                    <Text className={"text-5xl color-white"} style={{ lineHeight: 64 }}>breasy</Text>
                    <Text className={"text-xl color-white"}>breathe easier</Text>
                </View>
            </View>

            {/* MIDDLE */}
            <View className={"bg-orange-300"}>
                <Text> PLACEHOLDER </Text>
            </View>

            {/* BOTTOM BAR */}
            <View className={"flex-row"}>
                {/* Restart Button */}
                <SmallButton onPress={handlePlayButton} iconName={"arrow-rotate-right"}/>
                {/* Sound on / off button */}
                <SmallButton onPress={handlePlayButton} iconName={"volume-high"}/>

                {/* Big play-pause button*/}
                <Pressable onPress={handlePlayButton}>
                    <FontAwesome name={"play"} color={"#76C893"} size={100} />
                </Pressable>

                {/* Bluetooth button*/}
                <SmallButton onPress={handlePlayButton} iconName={"bluetooth-b"}/>
                {/* Settings Button */}
                <SmallButton onPress={handlePlayButton} iconName={"cog"}/>
            </View>

        </View>
    );
}
