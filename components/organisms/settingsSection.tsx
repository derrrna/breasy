import {View, Text} from "react-native";
import {ReactNode} from "react";

interface SettingsSectionProps {
    title: string,
    description: string,
    children: ReactNode,
    className?: string,
}

export default function SettingsSection({title, description, children, className}: SettingsSectionProps) {

    return (
        <View className={`flex-col w-full mb-2 ${className ?? ''}`}>
            <Text className={"text-xl font-interBold pt-4 text-textPrimary"}>{title}</Text>
            <Text className={"text-textPrimary font-interRegular mb-3"}>{description}</Text>
            {children}
            <View className={"bg-border h-0.5 w-full mt-4 rounded-full"}/>
        </View>
    )

}