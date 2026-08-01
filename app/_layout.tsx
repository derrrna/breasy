import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import "./global.css";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Header from "@/components/navigation/header";

const VIVIDLY_FONT = require("../assets/fonts/Vividly-Regular.otf");

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    vividly: VIVIDLY_FONT,
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
      <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
              <Stack
                  screenOptions={{
                      header: () => <Header/>,
                  }}>
                  <Stack.Screen name="(tabs)"/>
              </Stack>
          </SafeAreaProvider>
      </GestureHandlerRootView>
  )
}
