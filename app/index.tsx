import {Pressable, Text, View} from "react-native";
import Animated from "react-native-reanimated";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {FontAwesome6} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import ResetButton from "@/components/buttons/resetButton";
import FrogButton from "@/components/buttons/frogButton";
import {useExerciseContext} from "@/contexts/exerciseContext";
import SoundSwitch from "@/components/buttons/soundSwitch";
import {useSettingsContext} from "@/contexts/settingsContext";
import {Circle} from "react-native-svg";
import PlayButton from "@/components/buttons/playButton";
import LilypadsBackground from "@/components/display/lilypadsBackground";
import OdometerDigit from "@/components/display/odometerDigit";
import InfoCard from "@/components/display/infoCard";
import CogIcon from "@/components/icons/cogIcon";
import {useCrossfade} from "@/hooks/useCrossfade";
import colors from "@/utils/colors";
import {DROP_SHADOW} from "@/utils/styles";
import {PhaseKind} from "@/utils/presets";

// Everything the home screen shows per phase, kept together so a new phase kind is
// one row here rather than three scattered conditionals.
const PHASE_DISPLAY: Record<PhaseKind, {label: string, ring: string, cap: string}> = {
    inhale: {label: "Inhale", ring: colors.secondary, cap: colors.secondaryDark},
    hold: {label: "Hold", ring: colors.hold, cap: colors.holdDark},
    exhale: {label: "Exhale", ring: colors.secondary, cap: colors.secondaryDark},
};

// Wordmark spec from Figma: 32px with -8% tracking (32 * -0.08 = -2.56).
const LOGO_FONT_SIZE = 32;
const LOGO_LETTER_SPACING = LOGO_FONT_SIZE * -0.08;

// Horizontal spacing, px from the screen edge.
const RESET_EDGE_MARGIN = 24;   // left edge to reset button (frog follows at CONTROL_GAP)
const SWITCH_EDGE_MARGIN = 24;  // right edge to sound switch, and to the settings gear
const CARDS_EDGE_MARGIN = 24;   // both edges to the info cards
const CONTROL_GAP = 8;          // reset to frog

// Vertical spacing, px above each block.
const LOGO_TOP = 65;        // status bar to wordmark / gear
const HEADER_BOTTOM = 12;   // wordmark to header shadow edge
const CONTROLS_TOP = 45;    // wordmark to reset / frog / sound row
const RING_TOP = 25;        // controls row to progress ring
const PLAY_TOP = 26;        // ring to play button
const CARDS_TOP = 40;       // play button to info cards
const CARD_GAP = 10;        // between the two cards

export default function Index() {

    const {breathProgress, phaseCount, currentCycle, reset, phase} = useExerciseContext();
    const {ring, cap} = PHASE_DISPLAY[phase];
    const activePresetInfo = useSettingsContext().activePresetInfo
    const router = useRouter();

    // Crossfade transition for the phase label swap.
    const {displayedValue: displayedPhase, animatedStyle: phaseAnimatedStyle} = useCrossfade(phase);

    return (
        <View className={"flex-col w-full bg-offWhite h-full items-center overflow-hidden"}>

            <LilypadsBackground/>

            {/* HEADER */}
            <View className={"w-full flex-row items-center justify-between bg-offWhite z-10"}
                  style={{paddingTop: LOGO_TOP, paddingBottom: HEADER_BOTTOM, paddingLeft: RESET_EDGE_MARGIN, paddingRight: SWITCH_EDGE_MARGIN, ...DROP_SHADOW}}>
                <View className={"flex-row items-center gap-1"}>
                    <FontAwesome6 name={"leaf"} size={28} color={colors.secondary}/>
                    <Text
                        className={"font-workSansLight"}
                        style={{fontSize: LOGO_FONT_SIZE, letterSpacing: LOGO_LETTER_SPACING, color: colors.primary}}>
                        breasy
                    </Text>
                </View>
                <Pressable onPress={() => router.push("/settings")} hitSlop={12}>
                    <CogIcon size={30} color={colors.primary}/>
                </Pressable>
            </View>

            {/* CONTROLS */}
            <View className={"flex-row w-full items-center"} style={{marginTop: CONTROLS_TOP}}>
                <View className={"flex-row"} style={{marginLeft: RESET_EDGE_MARGIN, gap: CONTROL_GAP}}>
                    <ResetButton onPress={reset}/>
                    <FrogButton/>
                </View>
                <View style={{marginLeft: "auto", marginRight: SWITCH_EDGE_MARGIN}}>
                    <SoundSwitch/>
                </View>
            </View>

            {/* EXERCISE VISUAL */}
            <View style={{marginTop: RING_TOP}}>
                <AnimatedCircularProgress
                    size={340}
                    width={28}
                    fill={(breathProgress / phaseCount) * 100}
                    tintColor={ring}
                    backgroundColor={`${ring}70`}
                    lineCap={"round"}
                    renderCap={({ center }) => (
                        <Circle cx={center.x} cy={center.y} r="8" fill={cap} />
                    )}
                    rotation={0}
                    duration={1000}
                    prefill={0}>
                    {() => (
                        <View className={"justify-center items-center"}>
                            <Text className={"color-primary text-8xl font-interRegular"}>{breathProgress}</Text>
                            <Animated.View style={phaseAnimatedStyle}>
                                <Text className={"color-textPrimary text-3xl font-interMedium"}>
                                    {PHASE_DISPLAY[displayedPhase].label}
                                </Text>
                            </Animated.View>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </View>

            {/* PLAY BUTTON */}
            <View style={{marginTop: PLAY_TOP}}>
                <PlayButton/>
            </View>

            {/* INFO CARDS */}
            <View className={"w-full"} style={{marginTop: CARDS_TOP, gap: CARD_GAP, paddingHorizontal: CARDS_EDGE_MARGIN}}>
                <InfoCard label={"Current Exercise"}>
                    <Text className={"text-textPrimary font-interRegular"}>{activePresetInfo.formattedName}</Text>
                </InfoCard>
                <InfoCard label={"Progress"}>
                    <View className={"flex-row items-baseline"}>
                        <OdometerDigit digit={currentCycle} className={"text-textPrimary font-interRegular"}/>
                        <Text className={"text-textPrimary font-interRegular"}>{` / ${activePresetInfo.cycleCount}`}</Text>
                    </View>
                </InfoCard>
            </View>
        </View>
    );
}
