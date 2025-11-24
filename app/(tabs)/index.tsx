import { AddDeckCard } from "@/components/cards/AddDeckCard";
import { Deck, DeckCard } from "@/components/cards/DeckCard";
import { Carousel } from "@/components/carousel/Carousel";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // 👈 NEW
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Animated, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [decks, setDecks] = useState<Deck[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [scrollTrigger, setScrollTrigger] = useState(0);

  const addDeck = () => {
    setDecks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "My New Deck",
        commander: "Dummy Commander",
        format: "Commander",
        colors: "White, Black",
      },
    ]);
    // trigger carousel scroll only for additions
    setScrollTrigger((s) => s + 1);
  };

  const deleteDeck = (deckToDelete: Deck) => {
    Alert.alert(
      "Delete Deck",
      `Are you sure you want to delete "${deckToDelete.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setDeletingId(deckToDelete.id);

            setTimeout(() => {
              setDecks((prev) => prev.filter((d) => d.id !== deckToDelete.id));
              setDeletingId(null);
            }, 200);
          },
        },
      ]
    );
  };

  // ⭐ Only show the 5 most recent decks in the carousel
  const MAX_VISIBLE_DECKS = 5;
  const visibleDecks =
    decks.length > MAX_VISIBLE_DECKS
      ? decks.slice(-MAX_VISIBLE_DECKS) // last 5
      : decks;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#202020",
        paddingHorizontal: 20,
        paddingTop: 80,
      }}
    >
      <Text style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>
        ManaKeep
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        {/* LEFT: icon + label together */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <MaterialCommunityIcons
            name="cards-outline"
            size={20}
            color="#BBBBBB"
          />
          <Text style={{ fontSize: 20, color: "#BBBBBB", fontWeight: "600" }}>
            My Decks
          </Text>
        </View>

        <Pressable
          onPress={() => {
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
            ]).start(() => {
              // 👇 navigate after the little fade animation finishes
              router.push("/decks");
            });
          }}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
              opacity: fadeAnim,
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#F5A623" }}>
              View All
            </Text>
            <IconSymbol name="chevron.right" size={18} color="#F5A623" />
          </Animated.View>
        </Pressable>
      </View>

      {/* 🔁 Carousel stays exactly the same, we just inject a temp card when decks.length === 0 */}
      <Carousel autoScrollToEndTrigger={scrollTrigger}>
        {/* 🟣 Empty-state helper card shown ONLY when there are no decks */}
        {decks.length === 0 && (
          <View
            style={{
              width: 220,
              backgroundColor: "#181818",
              borderRadius: 16,
              paddingVertical: 14,
              paddingHorizontal: 12,
              marginRight: 12,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 4,
              }}
            >
              You don’t have any decks yet.
            </Text>
            <Text style={{ color: "#A0A0A0", fontSize: 14 }}>
              Tap the + button to add your first deck.
            </Text>
          </View>
        )}

        {/* 🟢 Real deck cards (now only the most recent 5) */}
        {visibleDecks.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            isDeleting={deck.id === deletingId}
            onPress={(clickedDeck) => console.log("Clicked:", clickedDeck)}
            onDelete={deleteDeck}
          />
        ))}

        {/* ➕ Add deck card (unchanged) */}
        <AddDeckCard onPress={addDeck} pulseTrigger={decks.length} />
      </Carousel>
    </View>
  );
}
