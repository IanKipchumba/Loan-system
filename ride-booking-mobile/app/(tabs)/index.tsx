import { useMemo, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type RideType = "Standard" | "Comfort" | "XL";
type Status = "planning" | "options" | "confirmed";

const rides: { type: RideType; icon: keyof typeof MaterialIcons.glyphMap; subtitle: string; eta: string; fare: number }[] = [
  { type: "Standard", icon: "directions-car", subtitle: "Affordable everyday rides", eta: "3 min", fare: 18 },
  { type: "Comfort", icon: "airport-shuttle", subtitle: "Newer cars, extra legroom", eta: "5 min", fare: 26 },
  { type: "XL", icon: "groups", subtitle: "Room for groups and luggage", eta: "7 min", fare: 34 },
];

export default function HomeScreen() {
  const [pickup, setPickup] = useState("Current location");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState<Status>("planning");
  const [selectedRide, setSelectedRide] = useState<RideType>("Standard");

  const selected = useMemo(() => rides.find((ride) => ride.type === selectedRide) ?? rides[0], [selectedRide]);

  const confirmBooking = () => setStatus("confirmed");
  const cancelBooking = () => {
    Alert.alert("Cancel ride?", "Your ride request will be cancelled.", [
      { text: "Keep ride", style: "cancel" },
      { text: "Cancel ride", style: "destructive", onPress: () => { setStatus("planning"); setDestination(""); } },
    ]);
  };

  return (
    <ScreenContainer edges={["top", "left", "right", "bottom"]} containerClassName="bg-[#F7F7F5]">
      <FlatList
        data={[]}
        renderItem={null}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.eyebrow}>FRIDAY, AUGUST 23</Text>
                <Text style={styles.title}>{status === "confirmed" ? "You’re all set." : "Where to next?"}</Text>
              </View>
              <View style={styles.profile}><Text style={styles.profileText}>J</Text></View>
            </View>

            <View style={styles.mapCard}>
              <View style={styles.mapGrid} />
              <View style={[styles.routeDot, { top: 72, left: 62 }]} />
              <View style={[styles.routeDot, { bottom: 50, right: 64, backgroundColor: "#111111" }]} />
              <View style={styles.routeLine} />
              <View style={styles.mapLabel}><MaterialIcons name="near-me" size={14} color="#5E7A3B" /><Text style={styles.mapLabelText}>Downtown</Text></View>
              <Text style={styles.mapCaption}>A simple preview of your route</Text>
            </View>

            {status === "planning" && (
              <View style={styles.panel}>
                <Text style={styles.sectionTitle}>Plan your ride</Text>
                <View style={styles.inputRow}>
                  <View style={[styles.inputDot, { backgroundColor: "#B8F36B" }]} />
                  <TextInput value={pickup} onChangeText={setPickup} style={styles.input} placeholder="Pickup location" placeholderTextColor="#6F746B" returnKeyType="next" />
                </View>
                <View style={styles.connector} />
                <View style={styles.inputRow}>
                  <View style={[styles.inputDot, { backgroundColor: "#111111" }]} />
                  <TextInput value={destination} onChangeText={setDestination} style={styles.input} placeholder="Where are you going?" placeholderTextColor="#6F746B" returnKeyType="done" />
                </View>
                <Pressable onPress={() => setDestination("Central Market") } style={({ pressed }) => [styles.recent, pressed && styles.pressed]}>
                  <MaterialIcons name="history" size={18} color="#6F746B" /><Text style={styles.recentText}>Central Market</Text><Text style={styles.recentMeta}>8 min</Text>
                </Pressable>
                <Pressable disabled={!destination.trim()} onPress={() => setStatus("options")} style={({ pressed }) => [styles.primaryButton, !destination.trim() && styles.disabled, pressed && styles.pressed]}>
                  <Text style={styles.primaryText}>See ride options</Text><MaterialIcons name="arrow-forward" size={20} color="#111111" />
                </Pressable>
              </View>
            )}

            {status === "options" && (
              <View style={styles.panel}>
                <View style={styles.backRow}><Pressable onPress={() => setStatus("planning")}><MaterialIcons name="arrow-back" size={22} color="#111111" /></Pressable><Text style={styles.sectionTitle}>Choose a ride</Text></View>
                <Text style={styles.routeSummary}>{pickup}  →  {destination}</Text>
                {rides.map((ride) => {
                  const active = ride.type === selectedRide;
                  return <Pressable key={ride.type} onPress={() => setSelectedRide(ride.type)} style={({ pressed }) => [styles.rideCard, active && styles.rideCardActive, pressed && styles.pressed]}>
                    <View style={[styles.rideIcon, active && styles.rideIconActive]}><MaterialIcons name={ride.icon} size={24} color={active ? "#111111" : "#6F746B"} /></View>
                    <View style={styles.rideInfo}><Text style={styles.rideName}>{ride.type}</Text><Text style={styles.rideSubtitle}>{ride.subtitle}</Text></View>
                    <View style={styles.ridePrice}><Text style={styles.fare}>${ride.fare}</Text><Text style={styles.eta}>{ride.eta}</Text></View>
                  </Pressable>;
                })}
                <Pressable onPress={confirmBooking} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryText}>Confirm {selected.type} · ${selected.fare}</Text><MaterialIcons name="arrow-forward" size={20} color="#111111" /></Pressable>
              </View>
            )}

            {status === "confirmed" && (
              <View style={styles.panel}>
                <View style={styles.successBadge}><MaterialIcons name="check" size={18} color="#111111" /><Text style={styles.successText}>Ride confirmed</Text></View>
                <Text style={styles.confirmTitle}>Your driver is on the way.</Text>
                <Text style={styles.routeSummary}>{pickup}  →  {destination || "Central Market"}</Text>
                <View style={styles.driverCard}><View style={styles.driverAvatar}><Text style={styles.driverAvatarText}>M</Text></View><View style={styles.rideInfo}><Text style={styles.rideName}>Maya R. · {selected.type}</Text><Text style={styles.rideSubtitle}>Silver Toyota Camry · 4.9 ★</Text></View><Text style={styles.arrival}>3 min</Text></View>
                <View style={styles.actionRow}><Pressable style={styles.secondaryButton}><MaterialIcons name="share" size={18} color="#111111" /><Text style={styles.secondaryText}>Share trip</Text></Pressable><Pressable onPress={cancelBooking} style={[styles.secondaryButton, styles.cancelButton]}><MaterialIcons name="close" size={18} color="#C95C45" /><Text style={[styles.secondaryText, { color: "#C95C45" }]}>Cancel</Text></Pressable></View>
              </View>
            )}
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 34 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, color: "#6F746B", fontWeight: "700", marginBottom: 7 },
  title: { fontSize: 30, lineHeight: 36, color: "#111111", fontWeight: "800", letterSpacing: -0.6 },
  profile: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#111111", alignItems: "center", justifyContent: "center" },
  profileText: { color: "#B8F36B", fontWeight: "800", fontSize: 17 },
  mapCard: { height: 220, borderRadius: 24, overflow: "hidden", backgroundColor: "#E9EBDD", position: "relative", marginBottom: 16 },
  mapGrid: { ...StyleSheet.absoluteFillObject, opacity: 0.45, backgroundColor: "#E9EBDD", borderWidth: 18, borderColor: "#DDE2D0" },
  routeLine: { position: "absolute", top: 90, left: 78, width: 138, height: 68, borderTopWidth: 3, borderRightWidth: 3, borderColor: "#5E7A3B", transform: [{ rotate: "16deg" }] },
  routeDot: { width: 15, height: 15, borderRadius: 8, backgroundColor: "#B8F36B", position: "absolute", borderWidth: 3, borderColor: "#FFFFFF" },
  mapLabel: { position: "absolute", top: 18, left: 18, flexDirection: "row", gap: 5, backgroundColor: "#FFFFFF", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 14 },
  mapLabelText: { fontSize: 12, color: "#111111", fontWeight: "700" },
  mapCaption: { position: "absolute", bottom: 16, left: 18, color: "#6F746B", fontSize: 12 },
  panel: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, borderWidth: 1, borderColor: "#E3E5DF" },
  sectionTitle: { fontSize: 19, color: "#111111", fontWeight: "800", marginBottom: 14 },
  inputRow: { flexDirection: "row", alignItems: "center", height: 48, backgroundColor: "#F7F7F5", borderRadius: 14, paddingHorizontal: 13 },
  inputDot: { width: 10, height: 10, borderRadius: 5, marginRight: 11 },
  input: { flex: 1, color: "#111111", fontSize: 15 },
  connector: { height: 14, borderLeftWidth: 1.5, borderColor: "#C9CDC3", marginLeft: 18 },
  recent: { flexDirection: "row", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1, borderColor: "#E3E5DF", gap: 9 },
  recentText: { flex: 1, color: "#111111", fontSize: 14, fontWeight: "600" },
  recentMeta: { color: "#6F746B", fontSize: 13 },
  primaryButton: { height: 54, backgroundColor: "#B8F36B", borderRadius: 16, marginTop: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  primaryText: { color: "#111111", fontSize: 15, fontWeight: "800" },
  disabled: { opacity: 0.45 }, pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  backRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  routeSummary: { color: "#6F746B", fontSize: 13, marginBottom: 14 },
  rideCard: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E3E5DF", borderRadius: 16, padding: 12, marginBottom: 9 },
  rideCardActive: { borderColor: "#B8F36B", backgroundColor: "#F5FBEA" },
  rideIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: "#F7F7F5", alignItems: "center", justifyContent: "center", marginRight: 11 },
  rideIconActive: { backgroundColor: "#B8F36B" },
  rideInfo: { flex: 1 },
  rideName: { color: "#111111", fontSize: 15, fontWeight: "800" },
  rideSubtitle: { color: "#6F746B", fontSize: 12, marginTop: 3 },
  ridePrice: { alignItems: "flex-end" },
  fare: { color: "#111111", fontSize: 16, fontWeight: "800" },
  eta: { color: "#5E7A3B", fontSize: 12, marginTop: 3, fontWeight: "700" },
  successBadge: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: 6, backgroundColor: "#B8F36B", borderRadius: 20, paddingVertical: 7, paddingHorizontal: 11, marginBottom: 13 },
  successText: { color: "#111111", fontSize: 12, fontWeight: "800" },
  confirmTitle: { color: "#111111", fontSize: 24, lineHeight: 29, fontWeight: "800", marginBottom: 8 },
  driverCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F7F7F5", borderRadius: 16, padding: 12, marginTop: 4 },
  driverAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#D5D8CB", alignItems: "center", justifyContent: "center", marginRight: 11 },
  driverAvatarText: { color: "#111111", fontWeight: "800", fontSize: 18 },
  arrival: { fontSize: 15, fontWeight: "800", color: "#5E7A3B" },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  secondaryButton: { flex: 1, height: 45, borderRadius: 13, borderWidth: 1, borderColor: "#E3E5DF", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6 },
  cancelButton: { borderColor: "#F0D7D1" },
  secondaryText: { color: "#111111", fontSize: 13, fontWeight: "700" },
});
