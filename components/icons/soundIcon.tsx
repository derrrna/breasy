import {View} from "react-native";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import MuteIcon from "@/components/icons/muteIcon";
import VolumeIcon from "@/components/icons/volumeIcon";
import colors from "@/utils/colors";
import {useAnimatedValue} from "@/hooks/useAnimatedValue";

interface SoundIconProps {
    isSoundOn: boolean;
}

export default function SoundIcon({isSoundOn}: SoundIconProps) {
    const progress = useAnimatedValue(isSoundOn ? 1 : 0, {duration: 100});

    const muteStyle = useAnimatedStyle(() => ({opacity: 1 - progress.value}));
    const volumeStyle = useAnimatedStyle(() => ({opacity: progress.value}));

    return (
        <View className={"w-[30px] h-8 items-center justify-center"}>
            <Animated.View className={"absolute inset-0 items-center justify-center"} style={muteStyle}>
                <MuteIcon color={colors.primaryDark} size={25}/>
            </Animated.View>
            <Animated.View className={"absolute inset-0 items-center justify-center"} style={volumeStyle}>
                <VolumeIcon color={colors.primary} size={25}/>
            </Animated.View>
        </View>
    );
}
