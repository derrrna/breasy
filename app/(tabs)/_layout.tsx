import {Tabs} from 'expo-router';
import {FontAwesome, FontAwesome6} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                    headerShown: false,

                    tabBarActiveTintColor: '#168AAD',
                    tabBarInactiveBackgroundColor: '#168AAD',
                    animation: 'shift',
                    tabBarStyle: {
                        paddingTop: 8,
                        paddingBottom: 10,
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                    tabBarIconStyle: {
                        marginBottom: 5,
                    },
                    tabBarLabelStyle: {
                        fontSize: 15,
                    }
                }}>

            {/* FROGGIE PAGE */}

            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={30} name={"home"} color={color} />
                }}
            />

            <Tabs.Screen
                name={"froggie"}
                options={{
                    title: "Froggie",
                    tabBarIcon: ({ color }) =>
                        <FontAwesome6 size={25} name={"frog"} color={color} />
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