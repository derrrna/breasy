import {Tabs} from 'expo-router';
import {FontAwesome} from "@expo/vector-icons";
import PlayButton from "@/components/buttons/playButton";
import React from "react";
import SettingsContextProvider from "@/store/settingsContext";
import ExerciseContextProvider from "@/store/exerciseContext";
import BottomBar from "@/components/bottomBar";

export default function TabLayout() {
    return (
        <SettingsContextProvider>
            <ExerciseContextProvider>
                <Tabs
                    tabBar={(props) => <BottomBar {...props}/>}
                    screenOptions={{
                        headerShown: false,
                        animation: 'shift',
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