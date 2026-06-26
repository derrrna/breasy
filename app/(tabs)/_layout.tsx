import {Tabs} from 'expo-router';
import {FontAwesome, FontAwesome6} from "@expo/vector-icons";
import Header from "@/app/components/header";
import NavigationBar from "@/app/components/navigationBar";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{headerShown: false}} tabBar={()=> <NavigationBar/>}/>
    )
}