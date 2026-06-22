import { Tabs } from 'expo-router';
import {MaterialIcons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#168AAD',
                tabBarInactiveTintColor: 'grey',
                animation: 'shift',
                tabBarStyle: {
                    height: 80,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
                tabBarIconStyle: {
                    marginBottom: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                }
            }}
        >
            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) =>
                        <MaterialIcons size={30} name={"home"} color={color} />
                }}
            />
            <Tabs.Screen
                name={"settings"}
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) =>
                        <MaterialIcons size={30} name="settings" color={color} />
                }}
            />
        </Tabs>
    )
}