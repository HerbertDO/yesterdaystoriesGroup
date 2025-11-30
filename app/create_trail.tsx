import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function EditTrailScreen() {
  const router = useRouter();

  const [trailName, setTrailName] = useState("");
  const [trailDescription, setTrailDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [accessCode, setAccessCode] = useState("");

  const initialLocations = [
    {
      id: 1,
      title: "Haymarket - Henry Fine Chong",
      desc: "Henry Fine Chong migrated to Sydney in 1877. Successful…",
      img: "https://picsum.photos/200/200",
      coord: { latitude: -33.872, longitude: 151.2065 },
      type: "museum",
    },
    {
      id: 2,
      title: "Harbour Bridge",
      desc: "Famous steel arch bridge connecting Sydney’s shores",
      img: "https://picsum.photos/200/201",
      coord: { latitude: -33.8523, longitude: 151.2108 },
      type: "bridge",
    },
    {
      id: 3,
      title: "Circular Quay",
      desc: "Popular ferry terminal in Sydney",
      img: "https://picsum.photos/200/202",
      coord: { latitude: -33.861, longitude: 151.212 },
      type: "ferry",
    },
  ];

  const [availableLocations, setAvailableLocations] = useState(initialLocations);
  const [trailRoute, setTrailRoute] = useState([]);

  const generateAccessCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handlePrivatePress = () => {
    setIsPublic(false);
    setAccessCode(generateAccessCode());
  };

  const handleAddLocation = (loc) => {
    setTrailRoute([...trailRoute, loc]);
  };

  const handleRemoveRoute = (loc) => {
    setTrailRoute(trailRoute.filter((item) => item.id !== loc.id));
  };

  const isInRoute = (loc) => trailRoute.some((item) => item.id === loc.id);

  const initialRegion = {
    latitude: -33.865143,
    longitude: 151.2099,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F6F4F2" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../assets/weui_back-filled.png")}
            style={{ width: 30, height: 40, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <Image source={require("../assets/YSLogo.png")} style={styles.logo} />

        <TouchableOpacity>
          <Image
            source={require("../assets/akar-icons_save.png")}
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
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          mapType={Platform.OS === "android" ? "standard" : "mutedStandard"}
        >
          {availableLocations.map((loc) => (
            <Marker key={loc.id} coordinate={loc.coord} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={[styles.markerWrap, styles[`marker_${loc.type}`]]}>
                <MaterialCommunityIcons
                  name={
                    loc.type === "museum"
                      ? "bank"
                      : loc.type === "cafe"
                      ? "coffee"
                      : loc.type === "park"
                      ? "tree"
                      : loc.type === "bridge"
                      ? "bridge"
                      : loc.type === "ferry"
                      ? "ferry"
                      : "map-marker"
                  }
                  size={20}
                  color="#fff"
                />
              </View>
              <Callout>
                <View style={{ width: 150 }}>
                  <Text style={{ fontWeight: "700" }}>{loc.title}</Text>
                  <Text>{loc.type}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      <View style={styles.card2}>
        <Text style={styles.sectionTitle}>Available Locations</Text>

        {availableLocations.map((loc) => (
          <View key={loc.id} style={styles.locationCard}>
            <Image source={{ uri: loc.img }} style={styles.locationImage} />

            <View style={{ flex: 1 }}>
              <Text style={styles.locationTitle}>{loc.title}</Text>
              <Text style={styles.locationDesc}>{loc.desc}</Text>
            </View>

            {!isInRoute(loc) ? (
              <TouchableOpacity onPress={() => handleAddLocation(loc)}>
                <Image
                  source={require("../assets/gg_add.png")}
                  style={{
                    width: 30,
                    height: 40,
                    resizeMode: "contain",
                    marginLeft: 10,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleRemoveRoute(loc)}>
                <Image
                  source={require("../assets/material-symbols-light_delete (1).png")}
                  style={{
                    width: 30,
                    height: 40,
                    resizeMode: "contain",
                    marginLeft: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <View style={styles.card2}>
        <Text style={styles.sectionTitle}>Trail Route ({trailRoute.length} stops)</Text>

        {trailRoute.map((stop, index) => (
          <View key={stop.id} style={styles.routeCard}>
            <View style={styles.stepCircle}>
              <Text style={{ color: "#fff" }}>{index + 1}</Text>
            </View>

            <Image source={{ uri: stop.img }} style={styles.routeImage} />

            <Text style={styles.routeTitle}>{stop.title}</Text>

            <TouchableOpacity onPress={() => handleRemoveRoute(stop)}>
              <Image
                source={require("../assets/material-symbols-light_delete (1).png")}
                style={{
                  width: 30,
                  height: 40,
                  resizeMode: "contain",
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.leftSide}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleBtn, isPublic && styles.toggleSelected]}
              onPress={() => setIsPublic(true)}
            >
              <Text
                style={[styles.toggleText, isPublic && styles.toggleTextActive]}
              >
                Public
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, !isPublic && styles.toggleSelected]}
              onPress={handlePrivatePress}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isPublic && styles.toggleTextActive,
                ]}
              >
                Private
              </Text>
            </TouchableOpacity>
          </View>

          {isPublic ? (
            <Text style={styles.subText}>Allow everyone to access your trail.</Text>
          ) : (
            <Text style={styles.subText}>Share the code with approved users.</Text>
          )}

          {!isPublic && (
            <Text style={styles.accessCode}>
              Access Code: <Text style={{ fontWeight: "bold" }}>{accessCode}</Text>
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.updateBtnRight}>
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginTop: 25,
  },
  card: {
    marginHorizontal: 30,
    backgroundColor: "#EEEEEE",
    borderRadius: 6,
    borderColor: "#B7B7B7",
    borderWidth: 0.2,
    padding: 10,
    elevation: 2,
  },
  card2: {
    marginHorizontal: 30,
    backgroundColor: "#EEEEEE",
    borderRadius: 6,
    borderColor: "#B7B7B7",
    borderWidth: 0.2,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 6,
    height: 26,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 6,
    marginHorizontal: 5,
  },
  mapWrapper: {
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 14,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: 300,
  },
  markerWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#58C062",
    alignItems: "center",
    justifyContent: "center",
  },
  marker_museum: { backgroundColor: "#6a1b9a" },
  marker_cafe: { backgroundColor: "#ff8f00" },
  marker_park: { backgroundColor: "#388e3c" },
  marker_bridge: { backgroundColor: "#1565c0" },
  marker_ferry: { backgroundColor: "#f57c00" },
  locationCard: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  locationImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  locationDesc: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
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
  routeImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  routeTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#E7E5E4",
    padding: 4,
    borderRadius: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleSelected: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.8,
    elevation: 2,
  },
  toggleText: {
    fontSize: 13,
    color: "#555",
  },
  toggleTextActive: {
    fontWeight: "600",
    color: "#111",
  },
  subText: {
    marginTop: 8,
    fontSize: 12,
    color: "#444",
  },
  accessCode: {
    marginTop: 8,
    fontSize: 12,
    color: "#222",
  },
  bottomContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSide: {
    width: "48%",
    marginRight: 10,
  },
  updateBtnRight: {
    width: "48%",
    backgroundColor: "#2C3E50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  updateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
