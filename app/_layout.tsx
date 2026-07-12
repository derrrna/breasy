import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Header from "@/components/header";
import LoadingScreen from "@/components/loadingScreen";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    vividly: require("../assets/fonts/Vividly-Regular.otf"),
  });

  if (!fontsLoaded) return <LoadingScreen/>;

  return (
      <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
              {/*TODO: Use Header options here*/}
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
