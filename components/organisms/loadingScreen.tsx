import {Text, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import colors from "@/utils/colors";

export default function LoadingScreen() {
    return (
        <View className={"flex-1 items-center justify-center bg-primary"}>
            <View className={"flex-row items-center gap-3"}>
                <FontAwesome6 name={"leaf"} size={40} color={colors.secondary}/>
                <View className={"flex-col"}>
                    <Text className={"text-6xl leading-none color-white font-vividly"}>breasy</Text>
                    <Text className={"text-base color-white -mt-3 ml-1.5"}>breathe easier</Text>
                </View>
            </View>
        </View>
    )
}
