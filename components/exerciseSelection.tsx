import {View} from "react-native";
import {RadioButton} from "react-native-paper";
import {useSettingsContext} from "@/store/settingsContext";
import {isPresetName} from "@/utils/presets";

export default function ExerciseSelection() {

    const {activePreset, setActivePreset} = useSettingsContext();

    const handleRadioPress = (value: string) => {
        if (isPresetName(value)) {
            setActivePreset(value);
        }
    }

    return (
        <RadioButton.Group onValueChange={handleRadioPress} value={activePreset}>
            <View className={"pl-5"}>
                <RadioButton.Item
                    label={"Paced Breathing"}
                    value={"paced"}
                    position={"leading"}
                    style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                    labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                <RadioButton.Item
                    label={"Box Breathing"}
                    value={"box"}
                    position={"leading"}
                    style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                    labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                <RadioButton.Item
                    label={"Physiological Sigh"}
                    value={"sigh"}
                    position={"leading"}
                    style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                    labelStyle={{textAlign: 'left', flexGrow: 0}}/>
                <RadioButton.Item
                    label={"Custom"}
                    value={"custom"}
                    position={"leading"}
                    style={{justifyContent: 'flex-start', paddingHorizontal: 0}}
                    labelStyle={{textAlign: 'left', flexGrow: 0}}/>
            </View>
        </RadioButton.Group>
    )
}
