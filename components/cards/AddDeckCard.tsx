import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

export function AddDeckCard({
  onPress,
  pulseTrigger,
}: {
  onPress: () => void;
  // change this number to trigger a pulse animation (e.g. decks.length)
  pulseTrigger?: number;
}) {
  // Scale animation for tap feedback
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /**
   * Handles the tap animation:
   * 1. Shrinks slightly (0.92)
   * 2. Pops back to full size (1)
   * 3. Calls the onPress callback after animation
   */
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(onPress); // Run callback AFTER animation
  };

  // Pulse animation when pulseTrigger changes (used when a card is added/removed)
  useEffect(() => {
    if (typeof pulseTrigger === "undefined") return;

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.88,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pulseTrigger]);

  return (
    <View style={{ marginLeft: 12, marginRight: 10 }}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Pressable onPress={animatePress}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#2A2AA240", // translucent blue fill
              borderRadius: 40, // circle
              borderWidth: 2,
              borderColor: "#2A2AA2", // same blue border as before

              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 0,
            }}
          >
            <Text
              style={{
                color: "#2A2AA2",
                fontSize: 28,
                fontWeight: "bold",
                lineHeight: 30, // keep + centered nicely
              }}
            >
              +
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}
