import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

// ✅ Define and export the Deck type HERE
export type Deck = {
  id: string;
  name: string;
  commander: string;
  format: string;
  colors: string;
};

const MANA_COLORS: Record<string, string> = {
  White: "#F8F4E3",
  Blue: "#4A90E2",
  Black: "#2C2C2C",
  Red: "#D64541",
  Green: "#4CAF50",
};

export function DeckCard({
  deck,
  onPress,
}: {
  deck: Deck;
  onPress?: (deck: Deck) => void;
}) {
  // ===========================
  // 🔥 Press Animation (scale)
  // ===========================
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onPress?.(deck); // Fires AFTER animation finishes
    });
  };

  // ===========================
  // 🎨 Border colors
  // ===========================
  const colorList = deck.colors.split(",").map((c) => c.trim());
  const borderColors = colorList.map((c) => MANA_COLORS[c] || "#FFF");

  const gradientColors =
    borderColors.length > 1
      ? (borderColors as [string, string, ...string[]])
      : ([borderColors[0], borderColors[0]] as [string, string]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable onPress={animatePress}>
        {/* Outer border gradient */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            padding: 3,
            borderRadius: 14,
            width: 220,
            height: 120,
          }}
        >
          {/* Actual card */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#181818",
              borderRadius: 12,
              padding: 14,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              {deck.name}
            </Text>

            <Text style={{ color: "#BBBBBB" }}>
              Commander: {deck.commander}
            </Text>
            <Text style={{ color: "#BBBBBB" }}>{deck.format}</Text>
            <Text style={{ color: "#BBBBBB" }}>Colors: {deck.colors}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}
