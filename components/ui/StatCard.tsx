import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#181818",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: "center",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    color: "#F6B878",
    fontSize: 20,
    fontWeight: "600",
  },
});
