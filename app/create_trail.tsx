import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function EditTrailScreen() {
  const router = useRouter();

  const [trailName, setTrailName] = useState("");
  const [trailDescription, setTrailDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const availableLocations = [
    {
      id: 1,
      title: "Haymarktet - Henry Fine Chong",
      desc: "Henry Fine Chong migrated to Sydney in 1877. Successful…..",
      img: "https://picsum.photos/200/200",
    },
    {
      id: 2,
      title: "Harbour Bridge",
      desc: "Famous steel arch bridge connecting Sydney’s shores",
      img: "https://picsum.photos/200/201",
    },
  ];

  const trailRoute = [
    {
      id: 2,
      title: "Harbour Bridge",
      img: "https://picsum.photos/200/201",
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F6F4F2" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <Image source={require('../assets/weui_back-filled.png')} style={{ width: 30, height: 40, resizeMode: 'contain' }}/>
        </TouchableOpacity>
        <Image
            source={require("../assets/YSLogo.png")} style={styles.logo}/>

        <TouchableOpacity>
          <Image
            source={require('../assets/akar-icons_save.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Trail Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Trail name"
          value={trailName}
          onChangeText={setTrailName}
        />

        <TextInput
          style={styles.input}
          placeholder="Trail description"
          value={trailDescription}
          onChangeText={setTrailDescription}
        />
      </View>

      <View style={styles.mapWrapper}>
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude: -33.865143,
            longitude: 151.2099,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: -33.8587, longitude: 151.2140 }}
            title="Harbour Bridge"
          />
          <Marker
            coordinate={{ latitude: -33.8720, longitude: 151.2065 }}
            title="Haymarket"
          />
        </MapView>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Available Locations</Text>

        {availableLocations.map((loc) => (
          <View key={loc.id} style={styles.locationCard}>
            <Image source={{ uri: loc.img }} style={styles.locationImage} />

            <View style={{ flex: 1 }}>
              <Text style={styles.locationTitle}>{loc.title}</Text>
              <Text style={styles.locationDesc}>{loc.desc}</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.addIcon}>＋</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Trail Route ( 1 stops )</Text>

        {trailRoute.map((stop, index) => (
          <View key={stop.id} style={styles.routeCard}>
            <View style={styles.stepCircle}>
              <Text style={{ color: "#fff" }}>{index + 1}</Text>
            </View>

            <Image source={{ uri: stop.img }} style={styles.routeImage} />

            <Text style={styles.routeTitle}>{stop.title}</Text>

            <TouchableOpacity>
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleButton, isPublic && styles.toggleActive]}
          onPress={() => setIsPublic(true)}
        >
          <Text>Public</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, !isPublic && styles.toggleActive]}
          onPress={() => setIsPublic(false)}
        >
          <Text>Private</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginLeft: 20, marginTop: 5, color: "#666" }}>
        Allow everyone to access your trail.
      </Text>

      <TouchableOpacity style={styles.updateBtn}>
        <Text style={styles.updateText}>Update</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: { width: 55, height: 55, resizeMode: "contain" },
  backArrow: { fontSize: 32 },
  card: {
    marginHorizontal: 20,
    backgroundColor: "#f0efefff",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    elevation: 2,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 14 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },
  mapWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 14,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: 300,
  },
  locationCard: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  locationImage: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  locationTitle: { fontSize: 16, fontWeight: "700" },
  locationDesc: { color: "#666", fontSize: 12, marginTop: 4 },
  addIcon: { fontSize: 34, color: "green", paddingHorizontal: 10 },
  routeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 14,
  },
  stepCircle: {
    width: 28,
    height: 28,
    backgroundColor: "#58C062",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  routeImage: { width: 50, height: 50, borderRadius: 10, marginRight: 12 },
  routeTitle: { flex: 1, fontSize: 16, fontWeight: "600" },
  deleteIcon: { fontSize: 22, color: "red", paddingLeft: 10 },
  toggleRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#D0D0D0",
  },
  updateBtn: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#2C3E50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  updateText: { color: "#fff", fontSize: 20, fontWeight: "600" },
});
