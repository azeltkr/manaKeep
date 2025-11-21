import { Text, View } from "react-native";

export type CardData = {
  id: string;
  name: string;
};

export function CardCard({ card }: { card: CardData }) {
  return (
    <View
      style={{
        width: 160,
        height: 220,
        backgroundColor: "#181818",
        borderRadius: 12,
        padding: 10,
      }}
    >
      <Text style={{ color: "white" }}>{card.name}</Text>
    </View>
  );
}
