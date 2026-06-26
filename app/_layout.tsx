import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Header from "@/app/components/header";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    vividly: require("../assets/fonts/Vividly-Regular.otf"),
  });

  if (!fontsLoaded) return null;

  return (
      <SafeAreaProvider>
          {/*TODO: Use Header options here*/}
          <Stack screenOptions={{
              header: () => <Header/>,
          }}>
              <Stack.Screen name="(tabs)"/>
          </Stack>
      </SafeAreaProvider>
  )
}
