import {useSettingsContext} from "@/store/settingsContext";
import { Switch } from 'react-native-switch';
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";

export default function SoundSwitch() {

    const { isMute, setIsMute } = useSettingsContext()

    // value (bool) — on/off state
    // onValueChange (func) — fires on toggle
    // disabled (bool)
    // activeText / inActiveText (string) — text labels for on/off states
    // circleSize (number) — thumb diameter
    // barHeight (number) — track height
    // circleBorderWidth (number)
    // backgroundActive / backgroundInactive (color) — track colour per state
    // circleActiveColor / circleInActiveColor (color) — thumb colour per state
    // renderInsideCircle (func) — render prop, puts a custom component (icon, text, image) inside the thumb
    // renderActiveText / renderInActiveText (bool) — whether to show the text labels
    // changeValueImmediately (bool) — if rendering inside circle, update state immediately or wait for animation to finish
    // innerCircleStyle / outerCircleStyle (style objects)
    // switchLeftPx / switchRightPx (number) — padding denominators for thumb travel distance on each side
    // switchWidthMultiplier (number) — multiplied by circleSize to get total switch width
    //     switchBorderRadius (number) — border radius of the track, defaults to circleSize if unset

    return (
        <Switch
            value={isMute}
            onValueChange={(prevState)=> setIsMute(!prevState)}

            circleSize={40}
            circleBorderWidth={0}
            backgroundActive={"#168AAD"}
            backgroundInactive={"#168AAD"}

            barHeight={55}
            renderInsideCircle={() => {
                return (<FontAwesome6 name={"volume-high"} color={"#168AAD"} size={28}/>)
            }}/>
    )

}