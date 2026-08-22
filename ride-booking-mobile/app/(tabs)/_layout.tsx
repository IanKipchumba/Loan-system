import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColors } from "@/hooks/use-colors";
import { HapticTab } from "@/components/haptic-tab";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.tint, tabBarInactiveTintColor: "#9AA095", tabBarButton: HapticTab, tabBarStyle: { paddingTop: 8, paddingBottom: bottomPadding, height: 56 + bottomPadding, backgroundColor: "#FFFFFF", borderTopColor: "#E3E5DF", borderTopWidth: 0.5 } }}>
    <Tabs.Screen name="index" options={{ title: "Book", tabBarIcon: ({ color, size }) => <MaterialIcons name="near-me" size={size} color={color} /> }} />
    <Tabs.Screen name="activity" options={{ title: "Activity", tabBarIcon: ({ color, size }) => <MaterialIcons name="receipt-long" size={size} color={color} /> }} />
    <Tabs.Screen name="account" options={{ title: "Account", tabBarIcon: ({ color, size }) => <MaterialIcons name="person-outline" size={size} color={color} /> }} />
  </Tabs>;
}
