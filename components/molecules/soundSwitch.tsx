import {useSettingsContext} from "@/contexts/settingsContext";
import { Switch } from 'react-native-switch';
import {Animated, View} from "react-native";
import React, {useEffect, useRef} from "react";
import MuteIcon from "@/components/atoms/muteIcon";
import VolumeIcon from "@/components/atoms/volumeIcon";
import colors from "@/utils/colors";

function AnimatedSoundIcon({ isSoundOn }: { isSoundOn: boolean }) {
    const progress = useRef(new Animated.Value(isSoundOn ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(progress, { toValue: isSoundOn ? 1 : 0, duration: 100, useNativeDriver: true }).start();
    }, [isSoundOn]);

    return (
        <View className={"w-[30px] h-8 items-center justify-center"}>
            <Animated.View className={"absolute inset-0 items-center justify-center"} style={{ opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
                <MuteIcon color={colors.primaryDark} size={25}/>
            </Animated.View>
            <Animated.View className={"absolute inset-0 items-center justify-center"} style={{ opacity: progress }}>
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
