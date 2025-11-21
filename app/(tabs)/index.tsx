import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  // opacity animated value (start at fully visible)
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Fade to 0.6, then fade back to 1
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.6,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    console.log("View All pressed!");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#202020",
        paddingTop: 80,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        ManaKeep
      </Text>

      {/* My Decks — View All → */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#BBBBBB",
          }}
        >
          My Decks
        </Text>

        <Pressable onPress={handlePress}>
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
              opacity: fadeAnim, // <-- animated fade
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#F5A623",
              }}
            >
              View All
            </Text>

            <IconSymbol name="chevron.right" size={18} color="#F5A623" />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
