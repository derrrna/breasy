import {Pressable, Text, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import SmallButton from "@/app/components/smallButton";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Index() {

    //TODO
    const handlePlayButton = () => {
    }

    return (
        <View className={"flex flex-col w-full h-full"}>

            {/* HEADER */}
            <View className={"flex-row bg-[#168AAD] pt-20 pb-4 px-6 items-center gap-3"}>
                <FontAwesome6 name={"leaf"} size={40} color={"#76C893"}/>
                <View className={"flex-col"}>
                    <Text className={"text-6xl leading-none color-white font-vividly"}>breasy</Text>
                    <Text className={"text-base color-white -mt-3 ml-1.5"}>breathe easier.</Text>
                </View>
            </View>

            {/* CONTENT */}
            <View className={"flex-1 bg-white justify-center items-center"}>
                <Text className={"mb-16"}> Bluetooth Connection</Text>

                <AnimatedCircularProgress
                    size={350}
                    width={20}
                    fill={50}
                    tintColor={"#76C893"}
                    backgroundColor={"#76C89370"}
                    lineCap={"round"}
                    rotation={0}
                >

                </AnimatedCircularProgress>

                <Text className={"color-[#168AAD] text-8xl mt-5"}>5</Text>
            </View>

            {/* BOTTOM BAR */}
            <View className={"flex-row justify-evenly items-center bg-[#168AAD] px-6 pb-10 pt-6"}>
                {/* Restart Button */}
                <SmallButton onPress={handlePlayButton} iconName={"arrow-rotate-right"}/>
                {/* Sound on / off button */}
                <SmallButton onPress={handlePlayButton} iconName={"volume-high"}/>

                {/* Big play-pause button */}
                <Pressable onPress={handlePlayButton}
                           className={"-mt-[60px] w-[92px] h-[92px] bg-[#76C893] rounded-full items-center justify-center"}>
                    <FontAwesome6 name={"play"} color={"white"} size={40} style={{ marginLeft: 4 }}/>
                </Pressable>

                {/* Bluetooth button*/}
                <SmallButton onPress={handlePlayButton} iconName={"bluetooth-b"}/>
                {/* Settings Button */}
                <SmallButton onPress={handlePlayButton} iconName={"gear"}/>
            </View>

        </View>
    );
}
