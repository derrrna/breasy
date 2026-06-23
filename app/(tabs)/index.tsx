import {Button, Pressable, Text, View} from "react-native";
import {FontAwesome, FontAwesome6} from "@expo/vector-icons";
import SmallButton from "@/app/components/smallButton";

export default function Index() {

    //TODO
    const handlePlayButton = () => {
    }

    return (
        <View className={"flex flex-col w-full h-full"}>

            {/* HEADER */}
            <View className={"flex-row bg-[#168AAD] pt-20 pb-4 px-6 items-center gap-3"}>
                <FontAwesome name={"leaf"} size={40} color={"#76C893"}/>
                <View className={"flex-col"}>
                    <Text className={"text-4xl font-bold color-white"}>breasy</Text>
                    <Text className={"text-base color-white"}>breathe easier</Text>
                </View>
            </View>

            {/* MIDDLE */}
            <View className={"flex-1 bg-white"}>
                <Text> PLACEHOLDER </Text>
            </View>

            {/* BOTTOM BAR */}
            <View className={"flex-row justify-evenly items-center bg-[#168AAD] px-6 pb-10 pt-6"}>
                {/* Restart Button */}
                <SmallButton onPress={handlePlayButton} iconName={"arrow-rotate-right"}/>
                {/* Sound on / off button */}
                <SmallButton onPress={handlePlayButton} iconName={"volume-high"}/>

                {/* Big play-pause button */}
                <Pressable
                    onPress={handlePlayButton}
                    className={"items-center justify-center rounded-full bg-[#76C893]"}
                    style={{ width: 92, height: 92, marginTop: -60 }}>
                    {/* Big play-pause button TODO: replace with actual playbutton instead */}
                    <FontAwesome name={"play"} color={"#FEFEFE"} size={46} className={"ml-4"} />
                </Pressable>

                {/* Bluetooth button*/}
                <SmallButton onPress={handlePlayButton} iconName={"bluetooth-b"}/>
                {/* Settings Button */}
                <SmallButton onPress={handlePlayButton} iconName={"cog"}/>
            </View>

        </View>
    );
}
