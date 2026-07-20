import {useSettingsContext} from "@/store/settingsContext";
import { Switch } from 'react-native-switch';
import {FontAwesome5} from "@expo/vector-icons";
import {Animated, View} from "react-native";
import React, {useEffect, useRef} from "react";

function AnimatedSoundIcon({ isSoundOn }: { isSoundOn: boolean }) {
    const progress = useRef(new Animated.Value(isSoundOn ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(progress, { toValue: isSoundOn ? 1 : 0, duration: 100, useNativeDriver: true }).start();
    }, [isSoundOn]);

    return (
        <View className={"w-[30px] h-8 items-center justify-center"}>
            <Animated.View className={"absolute inset-0 items-center justify-center"} style={{ opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
                <FontAwesome5 name={"volume-mute"} color={"#126E8A"} size={25}/>
            </Animated.View>
            <Animated.View className={"absolute inset-0 items-center justify-center"} style={{ opacity: progress }}>
                <FontAwesome5 name={"volume-up"} color={"#168AAD"} size={25}/>
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
            backgroundActive={"#168AAD"}
            backgroundInactive={"#8AC4D5"}
            circleActiveColor={"#FEFEFE"}
            circleInActiveColor={"#FEFEFE"}

            barHeight={50}
            switchWidthMultiplier={2.3}
            renderActiveText={false}
            renderInActiveText={false}
            renderInsideCircle={() => <AnimatedSoundIcon isSoundOn={isSoundOn}/>}/>
    )
}
