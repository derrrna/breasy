import {View} from "react-native";
import {useSettingsContext} from "@/contexts/settingsContext";
import {BREATHING_PRESETS, CUSTOM_EXERCISE_NAME, PRESET_NAMES, PresetNames} from "@/utils/presets";
import RadioOption from "@/components/molecules/radioOption";

const EXERCISE_OPTIONS: {label: string, value: PresetNames}[] = PRESET_NAMES.map((value) => ({
    value,
    label: value === "custom" ? CUSTOM_EXERCISE_NAME : BREATHING_PRESETS[value].formattedName,
}));

export default function ExerciseSelection() {

    const {activePreset, setActivePreset} = useSettingsContext();

    return (
        <View className={"pl-5"}>
            {EXERCISE_OPTIONS.map(({label, value}) => (
                <RadioOption
                    key={value}
                    label={label}
                    checked={activePreset === value}
                    onPress={() => setActivePreset(value)}/>
            ))}
        </View>
    )
}
