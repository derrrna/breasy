import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    vividly: require("../assets/fonts/Vividly-Regular.otf"),
  });

  if (!fontsLoaded) return null;

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
  )
}
