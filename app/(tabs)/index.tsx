import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#202020", // clean dark grey
        paddingTop: 80,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        ManaKeep
      </Text>
    </View>
  );
}
