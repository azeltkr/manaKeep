import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

export function AddDeckCard({ onPress }: { onPress: () => void }) {
  // scale value for tap animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92, // shrink slightly
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // pop back
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(onPress); // execute callback after animation
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable onPress={animatePress}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#2A2AA240", // translucent blue
            borderRadius: 40, // circle
            justifyContent: "center",
            alignItems: "center",

            borderWidth: 2,
            borderColor: "#2A2AA2", // same blue border
            marginHorizontal: 12,
          }}
        >
          <Text
            style={{
              color: "#2A2AA2",
              fontSize: 28,
              fontWeight: "bold",
              lineHeight: 30,
            }}
          >
            +
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
