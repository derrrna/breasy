import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    vividly: require("../assets/fonts/Vividly-Regular.otf"),
  });

  if (!fontsLoaded) return null;

  return (
      <SafeAreaProvider>
          <Stack>
              <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          </Stack>
      </SafeAreaProvider>
  )
}
