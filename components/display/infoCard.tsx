import {Text, View} from "react-native";
import {ReactNode} from "react";
import {CARD_SHADOW} from "@/utils/styles";

interface InfoCardProps {
    label: string;
    children: ReactNode;
}

export default function InfoCard({label, children}: InfoCardProps) {
    // Trial: white + shadow instead of bg-card grey. Revert to bg-card if rejected.
    return (
        <View className={"flex-row justify-between items-center bg-white rounded-2xl px-5 py-4"} style={CARD_SHADOW}>
            <Text className={"text-textPrimary font-interBold"}>{label}</Text>
            {children}
        </View>
    );
}
