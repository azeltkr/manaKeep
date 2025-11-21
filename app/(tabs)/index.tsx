import { AddDeckCard } from "@/components/cards/AddDeckCard";
import { Deck, DeckCard } from "@/components/cards/DeckCard";
import { Carousel } from "@/components/carousel/Carousel";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Correctly typed deck list
  const [decks, setDecks] = useState<Deck[]>([]);

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
  };

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

      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text style={{ fontSize: 20, color: "#BBBBBB", fontWeight: "600" }}>
          My Decks
        </Text>

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
            ]).start();
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

            {/* Restore arrow icon */}
            <IconSymbol name="chevron.right" size={18} color="#F5A623" />
          </Animated.View>
        </Pressable>
      </View>

      {/* Deck Carousel */}
      <Carousel>
        {decks.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            onPress={(clickedDeck) => {
              console.log("Clicked deck:", clickedDeck);
              // later: navigate to deck details
            }}
          />
        ))}

        <AddDeckCard onPress={addDeck} />
      </Carousel>
    </View>
  );
}
