import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

export function Carousel({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        height: 140, // FIX: limits vertical touch area
        overflow: "hidden", // FIX: prevents gesture capture outside this zone
        marginTop: 10,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingRight: 20,
          alignItems: "center",
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}
