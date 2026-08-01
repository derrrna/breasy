import {useSettingsContext} from "@/contexts/settingsContext";
import { Switch } from 'react-native-switch';
import colors from "@/utils/colors";
import SoundIcon from "@/components/icons/soundIcon";

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
