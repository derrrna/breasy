import {Pressable, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import {Text} from "react-native";

export default function NavigationBar() {

    const handlePlayButton = () => {}

    return (
        <View className={"flex-row bg-[#168AAD] justify-evenly items-center"}>

            {/* FROG BLUETOOTH CONNECTION */}
            <View className={'flex-col items-center'}>
                <Pressable className={'bg-black w-3 h-3'}>
                </Pressable>
                <Text>Froggie</Text>
            </View>

            {/* Big play-pause button */}
            <Pressable onPress={handlePlayButton}
                       className={" mt-[-60px] w-[110px] h-[110px] m-5 bg-[#76C893] rounded-full items-center justify-center"}>
                <FontAwesome6 name={"play"} color={"white"} size={55} style={{ marginLeft: 4 }}/>
            </Pressable>

            {/* SETTINGS */}
            <View className={'flex-col items-center'}>
                <Pressable className={'bg-black w-3 h-3'}>
                </Pressable>
                <Text>Settings</Text>
            </View>
        </View>
    )
}