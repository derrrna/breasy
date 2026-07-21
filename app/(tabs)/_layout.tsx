import {Tabs} from 'expo-router';
import PlayButton from "@/components/buttons/playButton";
import React from "react";
import SettingsContextProvider from "@/store/settingsContext";
import ExerciseContextProvider from "@/store/exerciseContext";
import BottomBar from "@/components/bottomBar";
import HomeIcon from "@/components/display/homeIcon";
import CogIcon from "@/components/display/cogIcon";

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
                                <HomeIcon size={30} color={color} />
                        }}
                    />

                    {/* SETTINGS PAGE */}
                    <Tabs.Screen
                        name={"settings"}
                        options={{
                            title: "Settings",
                            tabBarIcon: ({ color }) =>
                                <CogIcon size={30} color={color} />
                        }}
                    />
                </Tabs>
            </ExerciseContextProvider>
        </SettingsContextProvider>
    )
}