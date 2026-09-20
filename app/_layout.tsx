import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import "./global.css";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import SettingsContextProvider from "@/contexts/settingsContext";
import ExerciseContextProvider from "@/contexts/exerciseContext";

const VIVIDLY_FONT = require("../assets/fonts/Vividly-Regular.otf");
const WORK_SANS_LIGHT_FONT = require("../assets/fonts/WorkSans-Light.ttf");

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    vividly: VIVIDLY_FONT,
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    workSansLight: WORK_SANS_LIGHT_FONT,
  });

  if (!fontsLoaded) return null;

  return (
      <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
              <SettingsContextProvider>
                  <ExerciseContextProvider>
                      <Stack screenOptions={{headerShown: false}}>
                          <Stack.Screen name="index"/>
                          <Stack.Screen name="settings"/>
                      </Stack>
                  </ExerciseContextProvider>
              </SettingsContextProvider>
          </SafeAreaProvider>
      </GestureHandlerRootView>
  )
}
