import {Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import colors from "@/utils/colors";

interface TextPillButtonProps {
    label: string;
    onPress: () => void;
}

export default function TextPillButton({label, onPress}: TextPillButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.pill, {backgroundColor: pressed ? colors.primarySoft : colors.primary}]}>
            <Text className={"text-offWhite font-interSemiBold text-sm"}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pill: {
        alignSelf: "flex-start",
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
