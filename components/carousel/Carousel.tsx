import { ReactNode, useEffect, useRef } from "react";
import { Animated, ScrollView, View } from "react-native";

export function Carousel({
  children,
  autoScrollToEndTrigger,
}: {
  children: ReactNode[];
  // change this number to trigger scrolling to end (e.g., decks.length)
  autoScrollToEndTrigger?: number;
}) {
  const shiftAnim = useRef(new Animated.Value(1)).current;
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(shiftAnim, {
        toValue: 0.97,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(shiftAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [children.length]);

  // When the trigger changes (e.g. decks.length), scroll to the end smoothly
  useEffect(() => {
    if (typeof autoScrollToEndTrigger === "undefined") return;
    // Small timeout to allow layout to update before scrolling
    const id = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 40);
    return () => clearTimeout(id);
  }, [autoScrollToEndTrigger]);

  return (
    <View
      style={{
        marginTop: 20,
        height: 140,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={{
          paddingLeft: 0, // <- aligns deck under "My Decks"
          paddingRight: 20,
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            transform: [{ scale: shiftAnim }],
          }}
        >
          {children}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
