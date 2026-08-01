import {Text, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import colors from "@/utils/colors";

const HEADER_SHADOW = {
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 16,
};

export default function Header() {
    return (
        <View
            className={"flex-row bg-primary pt-14 pb-4 px-6 items-center gap-3"}
            // TODO: shadow does not render here (tested shadow* props, elevation-only, and extreme
            // values up to elevation:50 - none visible on Android/Expo Go). Works fine on plain Views
            // elsewhere (bottomBar.tsx), so likely specific to this component being rendered inside
            // React Navigation's Stack `header` slot, or an Expo Go limitation. Revisit in a dev build.
            style={HEADER_SHADOW}>
            <FontAwesome6 name={"leaf"} size={40} color={colors.secondary}/>
            <View className={"flex-col"}>
                <Text className={"text-6xl leading-none color-white font-vividly"}>breasy</Text>
                <Text className={"text-base color-white -mt-3 ml-1.5"}>breathe easier</Text>
            </View>
        </View>
    )
}
