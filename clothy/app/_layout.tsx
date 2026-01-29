import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import "./global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "DMSans-Regular": require("@/assets/fonts/static/DMSans-Regular.ttf"),
    "DMSans-Medium": require("@/assets/fonts/static/DMSans-Medium.ttf"),
    "DMSans-SemiBold": require("@/assets/fonts/static/DMSans-SemiBold.ttf"),
    "DMSans-Bold": require("@/assets/fonts/static/DMSans-Bold.ttf"),
    "DMSans-Italic": require("@/assets/fonts/static/DMSans-Italic.ttf"),
  });

  if (!fontsLoaded) return <ActivityIndicator size="large" />;

  const isDark = false;

  return (
    <View className={isDark ? "dark flex-1 font-dm" : "flex-1 font-dm"}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </View>
  );
}
