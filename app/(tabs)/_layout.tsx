import {Tabs} from 'expo-router';
import {FontAwesome, FontAwesome6} from "@expo/vector-icons";
import PlayButton from "@/components/playButton";
import React from "react";
import SettingsContextProvider from "@/store/settingsContext";
import ExerciseContextProvider from "@/store/exerciseContext";

export default function TabLayout() {
    return (
        <SettingsContextProvider>
            <ExerciseContextProvider>
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
            </ExerciseContextProvider>
        </SettingsContextProvider>
    )
}