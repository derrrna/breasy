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
            <Text className={"text-xl font-interBold pt-4 text-[#0F3641]"}>{title}</Text>
            <Text className={"text-[#0F3641] font-interRegular mb-3"}>{description}</Text>
            {children}
            <View className={"bg-[#F4F4F4] h-0.5 w-full mt-4 rounded-full"}/>
        </View>
    )

}