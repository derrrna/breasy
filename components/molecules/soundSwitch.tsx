import {useSettingsContext} from "@/contexts/settingsContext";
import { Switch } from 'react-native-switch';
import {View} from "react-native";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import React from "react";
import MuteIcon from "@/components/atoms/muteIcon";
import VolumeIcon from "@/components/atoms/volumeIcon";
import colors from "@/utils/colors";
import {useAnimatedValue} from "@/hooks/useAnimatedValue";

function AnimatedSoundIcon({ isSoundOn }: { isSoundOn: boolean }) {
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

export default function SoundSwitch() {

    const { isSoundOn, setIsSoundOn } = useSettingsContext()

    return (
        <Switch
            value={isSoundOn}
            onValueChange={setIsSoundOn}

            circleSize={40}
            circleBorderWidth={0}
            backgroundActive={colors.primary}
            backgroundInactive={colors.primarySoft}
            circleActiveColor={colors.offWhite}
            circleInActiveColor={colors.offWhite}

            barHeight={50}
            switchWidthMultiplier={2.3}
            renderActiveText={false}
            renderInActiveText={false}
            renderInsideCircle={() => <AnimatedSoundIcon isSoundOn={isSoundOn}/>}/>
    )
}
