import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ACCENT_BLUE = "#2A2AA2"; // search bar + future primary accent
const ACCENT_GOLD = "#F5A623"; // orange-gold highlight for stats

export default function CollectionScreen() {
  // Text inside the search bar
  const [query, setQuery] = useState("");
  // Whether the user is actively searching (search bar focused)
  const [isSearching, setIsSearching] = useState(false);

  // ===== Reanimated shared values (for smooth animations) =====

  const cancelOpacity = useSharedValue(0); // fade for Cancel button
  const cancelTranslateX = useSharedValue(10); // small slide-in from the right
  const clearOpacity = useSharedValue(0); // fade for the clear "x" button

  const containerPaddingTop = useSharedValue(80); // vertical padding from top
  const titleOpacity = useSharedValue(1); // fade title in/out
  const titleTranslateY = useSharedValue(0); // slide title slightly up

  // ===== Animated styles =====

  const animatedCancelStyle = useAnimatedStyle(() => ({
    opacity: cancelOpacity.value,
    transform: [{ translateX: cancelTranslateX.value }],
  }));

  const animatedClearStyle = useAnimatedStyle(() => ({
    opacity: clearOpacity.value,
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    paddingTop: containerPaddingTop.value,
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  // ===== Handlers for entering / leaving “search mode” =====

  const startSearchAnimation = () => {
    setIsSearching(true);

    // Focus mode: move everything up a bit, hide the title
    containerPaddingTop.value = withTiming(30, { duration: 200 });
    titleOpacity.value = withTiming(0, { duration: 180 });
    titleTranslateY.value = withTiming(-10, { duration: 180 });

    // Show the Cancel button (fade + slide)
    cancelOpacity.value = withTiming(1, { duration: 200 });
    cancelTranslateX.value = withTiming(0, { duration: 200 });
  };

  const stopSearchAnimation = () => {
    setIsSearching(false);

    // Restore layout
    containerPaddingTop.value = withTiming(80, { duration: 200 });
    titleOpacity.value = withTiming(1, { duration: 180 });
    titleTranslateY.value = withTiming(0, { duration: 180 });

    // Hide the Cancel button
    cancelOpacity.value = withTiming(0, { duration: 200 });
    cancelTranslateX.value = withTiming(10, { duration: 200 });

    Keyboard.dismiss();
  };

  const handleCancel = () => {
    setQuery("");
    clearOpacity.value = withTiming(0, { duration: 120 });
    stopSearchAnimation();
  };

  const handleChangeText = (text: string) => {
    setQuery(text);

    // Show "x" when there is text, hide when empty
    clearOpacity.value = withTiming(text ? 1 : 0, { duration: 120 });
  };

  const handleClear = () => {
    setQuery("");
    clearOpacity.value = withTiming(0, { duration: 120 });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (isSearching) {
          handleCancel(); // tap outside = cancel search
        } else {
          Keyboard.dismiss();
        }
      }}
    >
      {/* Animated container so we can move content up/down */}
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        {/* Animated title that fades/collapses in search mode */}
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          Collection
        </Animated.Text>

        {/* Search bar + Cancel row */}
        <View style={styles.searchRow}>
          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <IconSymbol
              name="magnifyingglass"
              size={20}
              color="#A0A0A0"
              style={styles.searchIcon}
            />

            <TextInput
              value={query}
              onChangeText={handleChangeText}
              placeholder="Search cards"
              placeholderTextColor="#A0A0A0"
              style={styles.searchInput}
              returnKeyType="search"
              onFocus={startSearchAnimation}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                stopSearchAnimation();
              }}
            />

            {/* Clear "x" button (fades in/out) */}
            <Animated.View style={[styles.clearButton, animatedClearStyle]}>
              <TouchableOpacity onPress={handleClear} hitSlop={8}>
                <IconSymbol name="xmark" size={18} color="#E5E5E5" />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Animated Cancel Button */}
          <Animated.View style={animatedCancelStyle}>
            {isSearching && (
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelButton}
              >
                <Animated.Text style={styles.cancelText}>Cancel</Animated.Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>

        {/* 📊 Stats cards row – below search bar */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total cards</Text>
            <Text style={styles.statValue}>0</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total value</Text>
            <Text style={styles.statValue}>--</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Unique cards</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // Screen container – horizontal padding is fixed, top is animated
  container: {
    flex: 1,
    backgroundColor: "#202020",
    paddingHorizontal: 20,
  },
  // "Collection" title
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  // Row with search bar + Cancel
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  // Pill-shaped search background
  searchWrapper: {
    flex: 1,
    backgroundColor: ACCENT_BLUE, // ✅ blue
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative", // for the absolute-positioned "x"
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    padding: 0,
    paddingRight: 28, // space so text doesn't overlap the "x"
  },
  clearButton: {
    position: "absolute",
    right: 20, // pulled slightly left so it's not too close to Cancel
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  cancelButton: {
    marginLeft: 14,
  },
  cancelText: {
    color: "#A0A0A0",
    fontSize: 16,
  },

  // ===== Stats row styles =====
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#181818",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    marginBottom: 4,
  },
  statValue: {
    color: ACCENT_GOLD, // blue accent colour
    fontSize: 20,
    fontWeight: "600",
  },
});
