// app/decks/index.tsx

import { AllDeckCard } from "@/components/cards/AllDeckCard";
import { Deck } from "@/components/cards/DeckCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ACCENT_GOLD = "#F5A623";

// Temporary starter data for All Decks.
// Later we can share real decks between Home and this screen.
const INITIAL_DECKS: Deck[] = [
  {
    id: "1",
    name: "Azorius Control",
    commander: "Dummy Commander 1",
    format: "Commander",
    colors: "White, Blue",
  },
  {
    id: "2",
    name: "Golgari Graveyard",
    commander: "Dummy Commander 2",
    format: "Commander",
    colors: "Black, Green",
  },
  {
    id: "3",
    name: "Mono-Red Aggro",
    commander: "Dummy Commander 3",
    format: "Commander",
    colors: "Red",
  },
];

export default function DeckListScreen() {
  const [decks, setDecks] = useState<Deck[]>(INITIAL_DECKS);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  return (
    <View style={styles.container}>
      {/* Header with back chevron and title */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <IconSymbol name="chevron.left" size={20} color={ACCENT_GOLD} />
        </Pressable>

        <Text style={styles.title}>All Decks</Text>
      </View>

      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <AllDeckCard
            deck={item}
            isDeleting={item.id === deletingId}
            onPress={(clickedDeck) =>
              console.log("Open deck from /decks:", clickedDeck)
            }
            onDelete={deleteDeck}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 8, // space between chevron and text
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12, // vertical gap between cards
  },
});
