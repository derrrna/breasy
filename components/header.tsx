import {Text, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";

export default function Header() {
    return (
        <View
            className={"flex-row bg-[#168AAD] pt-14 pb-4 px-6 items-center gap-3"}
            // TODO: shadow/elevation not rendering on Android, cause unconfirmed - investigate.
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.8,
                shadowRadius: 12,
                elevation: 24,
            }}>
            <FontAwesome6 name={"leaf"} size={40} color={"#76C893"}/>
            <View className={"flex-col"}>
                <Text className={"text-6xl leading-none color-white font-vividly"}>breasy</Text>
                <Text className={"text-base color-white -mt-3 ml-1.5"}>breathe easier</Text>
            </View>
        </View>
    )
}