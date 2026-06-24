import {Pressable, View} from "react-native";
import SmallButton from "@/app/components/smallButton";
import {FontAwesome6} from "@expo/vector-icons";

export default function BottomBar() {

    //TODO
    const handlePlayButton = () => {
    }

    return (
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
    )
}