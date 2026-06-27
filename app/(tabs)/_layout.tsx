import {Tabs} from 'expo-router';
import {FontAwesome, FontAwesome6} from "@expo/vector-icons";
import {Pressable, View} from "react-native";
import Header from "@/app/components/header";
import PlayButton from "@/app/components/playButton";
import React from "react";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#fdf0d5',
                tabBarInactiveTintColor: 'white',
                animation: 'shift',
                tabBarStyle: {
                    backgroundColor: '#168AAD',
                    height: '12%',
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                }
            }}>

            {/* Home */}
            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={30} name={"home"} color={color} />
                }}
            />

            {/* Play-Pause Button */}
            <Tabs.Screen
                name={"froggie"}
                options={{
                    tabBarButton: () => <PlayButton/>
                }}
            />

            {/* SETTINGS PAGE */}
            <Tabs.Screen
                name={"settings"}
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={30} name={"cog"} color={color} />
                }}
            />
        </Tabs>
    )
}