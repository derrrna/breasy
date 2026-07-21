import {Dropdown} from "react-native-element-dropdown";
import {numberRange} from "@/utils/presets";
import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {FontAwesome5} from "@expo/vector-icons";
import {interpolateColor, runOnJS, useAnimatedReaction, useSharedValue, withTiming} from "react-native-reanimated";

const BORDER_INACTIVE_COLOR = "#F4F4F4";
const BORDER_ACTIVE_COLOR = "#168AAD";

interface CountPickerProps {
    name: string;
    value: number;
    onValueChange: (value: number) => void;
    constraints: {min: number, max: number};
    marginBottom?: number;
}

export default function CountPicker({name, value, onValueChange, constraints, marginBottom}: CountPickerProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [borderColor, setBorderColor] = useState(BORDER_INACTIVE_COLOR);
    const focusProgress = useSharedValue(0);

    useEffect(() => {
        focusProgress.value = withTiming(isFocused ? 1 : 0, {duration: 200});
    }, [isFocused]);

    useAnimatedReaction(
        () => interpolateColor(focusProgress.value, [0, 1], [BORDER_INACTIVE_COLOR, BORDER_ACTIVE_COLOR]),
        (color) => {
            runOnJS(setBorderColor)(color);
        }
    );

    const data = numberRange(constraints.min, constraints.max).map((count) => ({
        label: count.toString(),
        value: count,
    }));

    return (
        <View style={{marginBottom}}>
            <Text className={"font-interSemiBold mb-3 text-md mt-5"}>{name} Count</Text>
            <Dropdown
                data={data}
                labelField={"label"}
                valueField={"value"}
                value={value}
                onChange={(item) => onValueChange(item.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    borderWidth: 2.5,
                    borderColor,
                }}
                fontFamily={"Inter_400Regular"}
                itemTextStyle={{paddingLeft: 10}}
                selectedTextStyle={{paddingVertical: 15, paddingLeft: 25}}
                containerStyle={{borderColor: "#F4F4F4"}}
                renderRightIcon={(visible) => (
                    <FontAwesome5
                        name={"chevron-down"}
                        size={14}
                        color={"#0F3641"}
                        style={{marginRight: 20, transform: [{rotate: visible ? "180deg" : "0deg"}]}}/>
                )}/>
        </View>
    )
}
