// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

// 🔶 Global accent for active tab icon + label
const ACCENT_GOLD = "#F5A623";

export default function TabLayout() {
  const colorScheme = useColorScheme(); // kept for future light/dark tweaks if needed

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1A1A1A",
          borderTopColor: "#3A3A3A",
          position: "absolute",
        },
        tabBarActiveTintColor: ACCENT_GOLD, // active icon + label
        tabBarInactiveTintColor: "#888", // inactive icon + label
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
