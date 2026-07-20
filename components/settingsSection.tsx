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
        <View className={`flex-col w-full ${className ?? ''}`}>
            <Text className={"text-xl my-3"}>{title}</Text>
            <Text>{description}</Text>
            {children}
        </View>
    )

}