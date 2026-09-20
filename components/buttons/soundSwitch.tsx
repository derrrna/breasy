import {useSettingsContext} from "@/contexts/settingsContext";
import { Switch } from 'react-native-switch';
import colors from "@/utils/colors";
import SoundIcon from "@/components/icons/soundIcon";

// TODO: last third-party control left (Dev Log #11 removed the others so every control
//  matches the design). Compare on device against a hand-built Pressable + reanimated
//  circle before deciding whether to replace react-native-switch.
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
            renderInsideCircle={() => <SoundIcon isSoundOn={isSoundOn}/>}/>
    )
}
