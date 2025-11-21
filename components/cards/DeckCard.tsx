import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";

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
  onDelete,
  isDeleting, // 🔥 passed from HomeScreen
}: {
  deck: Deck;
  onPress?: (deck: Deck) => void;
  onDelete?: (deck: Deck) => void;
  isDeleting?: boolean;
}) {
  // Animation refs
  const pressScale = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const trashScale = useRef(new Animated.Value(0)).current;

  // Fade + scale in (creation)
  const appearAnim = useRef(new Animated.Value(0)).current;

  const [deleteMode, setDeleteMode] = useState(false);

  // ------------------------
  // CREATION ANIMATION (fade + scale)
  // ------------------------
  useEffect(() => {
    Animated.parallel([
      Animated.timing(appearAnim, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ------------------------
  // DELETE ANIMATION (fade + shrink)
  // ------------------------
  useEffect(() => {
    if (isDeleting) {
      Animated.parallel([
        Animated.timing(appearAnim, {
          toValue: 0,
          duration: 180,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pressScale, {
          toValue: 0.85,
          duration: 180,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isDeleting]);

  // ------------------------
  // TAP ANIMATION
  // ------------------------
  const animatePress = () => {
    if (deleteMode) return;

    Animated.sequence([
      Animated.timing(pressScale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(pressScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => onPress?.(deck));
  };

  // ------------------------
  // SHAKE + TRASH POP (delete mode)
  // ------------------------
  useEffect(() => {
    if (deleteMode) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Shake (subtle)
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 0.8,
            duration: 120,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -0.8,
            duration: 120,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 120,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Trash pop
      trashScale.setValue(0);
      Animated.spring(trashScale, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }).start();
    } else {
      shakeAnim.stopAnimation();
      shakeAnim.setValue(0);
      trashScale.setValue(0);
    }
  }, [deleteMode]);

  // ------------------------
  // COLOR BORDER
  // ------------------------
  const colorList = deck.colors.split(",").map((c) => c.trim());
  const borderColors = colorList.map((c) => MANA_COLORS[c] || "#FFF");

  const gradientColors =
    borderColors.length > 1
      ? (borderColors as [string, string, ...string[]])
      : ([borderColors[0], borderColors[0]] as [string, string]);

  // ------------------------
  // RENDER
  // ------------------------
  return (
    <View style={{ marginRight: 10 }}>
      {/* WRAPPER TO ADD HORIZONTAL MARGIN */}
      <Animated.View
        style={{
          opacity: appearAnim,
          transform: [
            {
              scale: appearAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
            { scale: pressScale },
            { translateX: shakeAnim },
          ],
        }}
      >
        {!deleteMode ? (
          <Pressable
            onPress={animatePress}
            onLongPress={() => setDeleteMode(true)}
            delayLongPress={300}
          >
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
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#181818",
                  borderRadius: 12,
                  padding: 14,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                >
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
        ) : (
          // DELETE MODE
          <View
            style={{
              width: 220,
              height: 120,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: "#B22222",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#181818",
            }}
          >
            {/* Animated Trash Button */}
            <Animated.View
              style={{
                transform: [{ scale: trashScale }],
                zIndex: 10,
              }}
            >
              <Pressable
                onPress={() => onDelete?.(deck)}
                style={{
                  padding: 12,
                  backgroundColor: "#B22222",
                  borderRadius: 50,
                }}
              >
                <MaterialIcons name="delete" size={32} color="white" />
              </Pressable>
            </Animated.View>

            {/* Exit delete mode by tapping outside */}
            <Pressable
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
              onPressOut={(e) => {
                const { locationX, locationY } = e.nativeEvent;

                const centerX = 110;
                const centerY = 60;
                const radius = 45;

                const dx = locationX - centerX;
                const dy = locationY - centerY;

                if (dx * dx + dy * dy > radius * radius) {
                  setDeleteMode(false);
                }
              }}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
}
