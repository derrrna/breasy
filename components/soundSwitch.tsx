import {useSettingsContext} from "@/store/settingsContext";
import { Switch } from 'react-native-switch';
import {FontAwesome5} from "@expo/vector-icons";
import React from "react";

export default function SoundSwitch() {

    const { isMute, setIsMute } = useSettingsContext()

    return (
        <Switch
            value={isMute}
            onValueChange={setIsMute}

            circleSize={40}
            circleBorderWidth={0}
            backgroundActive={"#168AAD"}
            backgroundInactive={"#168AAD"}
            circleActiveColor={"#FEFEFE"}
            circleInActiveColor={"#FEFEFE"}

            barHeight={55}
            switchWidthMultiplier={2.4}
            renderActiveText={false}
            renderInActiveText={false}
            renderInsideCircle={() => <FontAwesome5 name={ isMute ? "volume-up": "volume-mute"}
                                                    color={isMute ? "#168AAD" : "#126E8A"} size={25}/>}/>
    )
}