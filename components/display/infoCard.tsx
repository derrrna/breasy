import {Text, View} from "react-native";
import {ReactNode} from "react";

interface InfoCardProps {
    label: string;
    children: ReactNode;
}

export default function InfoCard({label, children}: InfoCardProps) {
    return (
        <View className={"flex-row justify-between items-center bg-card rounded-2xl px-5 py-4"}>
            <Text className={"text-textPrimary font-interBold"}>{label}</Text>
            {children}
        </View>
    );
}
