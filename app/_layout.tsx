import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
   
      <ThemeProvider value={DarkTheme}>
        <Drawer screenOptions={{ headerShown: false }}>
          <Drawer.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="history"
            options={{
              title: "history",
            }}
          />
          <Drawer.Screen
            name="session"
            options={{
              title: "session",
            }}
          />
        </Drawer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}