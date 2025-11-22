// components/cards/AllDeckCard.tsx

import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { Deck } from "./DeckCard";

// same mana colors as DeckCard
const MANA_COLORS: Record<string, string> = {
  White: "#F8F4E3",
  Blue: "#4A90E2",
  Black: "#2C2C2C",
  Red: "#D64541",
  Green: "#4CAF50",
};

type AllDeckCardProps = {
  deck: Deck;
  onPress?: (deck: Deck) => void;
  onDelete?: (deck: Deck) => void;
  isDeleting?: boolean; // driven by parent like on Home
};

export function AllDeckCard({
  deck,
  onPress,
  onDelete,
  isDeleting,
}: AllDeckCardProps) {
  // --- Anim refs (mirroring DeckCard) ---
  const pressScale = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const trashScale = useRef(new Animated.Value(0)).current;
  const appearAnim = useRef(new Animated.Value(0)).current;

  const [deleteMode, setDeleteMode] = useState(false);

  // CREATION: fade + scale in
  useEffect(() => {
    Animated.timing(appearAnim, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  // DELETE from parent: fade + shrink (same pattern as Home)
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

  // TAP animation
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

  // DELETE MODE: haptics, shake, trash pop
  useEffect(() => {
    if (deleteMode) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // subtle shake loop
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

      // trash pop
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

  // COLOR BORDER (same logic as DeckCard)
  const colorList = deck.colors.split(",").map((c) => c.trim());
  const borderColors = colorList.map((c) => MANA_COLORS[c] || "#FFF");

  const gradientColors =
    borderColors.length > 1
      ? (borderColors as [string, string, ...string[]])
      : ([borderColors[0], borderColors[0]] as [string, string]);

  return (
    <Animated.View
      style={[
        styles.animatedWrapper,
        {
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
        },
      ]}
    >
      {!deleteMode ? (
        // NORMAL MODE
        <Pressable
          onPress={animatePress}
          onLongPress={() => setDeleteMode(true)}
          delayLongPress={300}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
          >
            <View style={styles.innerCard}>
              <View style={styles.topRow}>
                <Text style={styles.name} numberOfLines={1}>
                  {deck.name}
                </Text>
                <Text style={styles.format}>{deck.format}</Text>
              </View>

              <Text style={styles.meta}>Commander: {deck.commander}</Text>
              <Text style={styles.meta}>Colors: {deck.colors}</Text>
            </View>
          </LinearGradient>
        </Pressable>
      ) : (
        // DELETE MODE
        <View style={styles.deleteCard}>
          {/* Background tap to exit delete mode (behind trash) */}
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => setDeleteMode(false)}
          />

          {/* Trash button on top */}
          <Animated.View
            style={{ transform: [{ scale: trashScale }], zIndex: 2 }}
          >
            <Pressable
              onPress={() => onDelete?.(deck)}
              style={styles.trashButton}
            >
              <MaterialIcons name="delete" size={32} color="white" />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedWrapper: {
    width: "100%", // full width in list
    alignSelf: "stretch",
  },
  gradientBorder: {
    padding: 3,
    borderRadius: 16,
  },
  innerCard: {
    flex: 1,
    backgroundColor: "#181818",
    borderRadius: 14,
    padding: 14,
    justifyContent: "space-between",
    minHeight: 120, // nice tall card height
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    flexShrink: 1,
    marginRight: 8,
  },
  format: {
    color: "#F5A623",
    fontSize: 13,
    fontWeight: "600",
  },
  meta: {
    color: "#BBBBBB",
    fontSize: 14,
    marginTop: 2,
  },
  deleteCard: {
    width: "100%",
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#B22222",
    backgroundColor: "#181818",
    justifyContent: "center",
    alignItems: "center",
  },
  trashButton: {
    padding: 12,
    backgroundColor: "#B22222",
    borderRadius: 50,
  },
});
