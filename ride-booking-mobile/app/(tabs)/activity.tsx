import { FlatList, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const history = [
  { id: "1", date: "Today, 9:42 AM", route: "Riverside Station → Central Market", type: "Standard", fare: "$18" },
  { id: "2", date: "Yesterday, 6:18 PM", route: "North Avenue → Riverside Station", type: "Comfort", fare: "$26" },
  { id: "3", date: "Aug 19, 12:05 PM", route: "Central Market → North Avenue", type: "Standard", fare: "$16" },
];

export default function ActivityScreen() {
  return <ScreenContainer edges={["top", "left", "right", "bottom"]} containerClassName="bg-[#F7F7F5]">
    <FlatList data={history} keyExtractor={(item) => item.id} contentContainerStyle={styles.content} ListHeaderComponent={<><Text style={styles.eyebrow}>YOUR RIDES</Text><Text style={styles.title}>Activity</Text><Text style={styles.subtitle}>A quick look at where you’ve been.</Text></>} renderItem={({ item }) => <View style={styles.card}><View style={styles.icon}><Text style={styles.iconText}>↗</Text></View><View style={styles.info}><Text style={styles.route}>{item.route}</Text><Text style={styles.meta}>{item.date} · {item.type}</Text></View><Text style={styles.fare}>{item.fare}</Text></View>} />
  </ScreenContainer>;
}

const styles = StyleSheet.create({ content: { padding: 20, gap: 12 }, eyebrow: { color: "#6F746B", fontSize: 11, letterSpacing: 1.5, fontWeight: "800", marginTop: 8 }, title: { color: "#111111", fontSize: 30, lineHeight: 36, fontWeight: "800", marginTop: 7 }, subtitle: { color: "#6F746B", fontSize: 14, marginBottom: 18 }, card: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E3E5DF", borderRadius: 18, padding: 14, flexDirection: "row", alignItems: "center" }, icon: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#EAF3D9", alignItems: "center", justifyContent: "center", marginRight: 11 }, iconText: { color: "#5E7A3B", fontSize: 20, fontWeight: "800" }, info: { flex: 1 }, route: { color: "#111111", fontSize: 14, lineHeight: 19, fontWeight: "700" }, meta: { color: "#6F746B", fontSize: 12, marginTop: 4 }, fare: { color: "#111111", fontSize: 15, fontWeight: "800" } });
