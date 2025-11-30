import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const trailData = [
  {
    id: "1",
    title: "Mount Kembla Trail",
    image: require("../assets/trail.png"),
    time: "6 minutes",
    views: 25,
  },
];

const storyData = [
  {
    id: "2",
    title: "Circular Quay - Sydney Opera House",
    description:
      "The Sydney Harbour Bridge is an iconic steel arch bridge in Sydney, Australia, that connects the CBD with the North Shore …",
    image: require("../assets/trail.png"),
    time: "9 minutes",
    views: 120000,
  },
  {
    id: "3",
    title: "Circular Quay - Sydney Opera House",
    description:
      "The Sydney Harbour Bridge is an iconic steel arch bridge in Sydney, Australia, that connects the CBD with the North Shore …",
    image: require("../assets/trail.png"),
    time: "10 minutes",
    views: 95000,
  },
];

export default function ViewStories() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Trail");
  const TAB_WIDTH = "188%";

  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab) => {
    setActiveTab(tab);

    Animated.timing(slideAnim, {
      toValue: tab === "Trail" ? 0 : TAB_WIDTH,
      duration: 240,
      easing: Easing.out(Easing.circle),
      useNativeDriver: true,
    }).start();
  };

  const listToRender = activeTab === "Trail" ? trailData : storyData;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        {item.description && (
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}

        <View style={styles.cardFooter}>
          <Text style={styles.cardTime}>{item.time}</Text>
          <Text style={styles.cardViews}>{item.views.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../assets/weui_back-filled.png")}
            style={{ width: 30, height: 40, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <Image
          source={require("../assets/YSLogo.png")}
          style={styles.logo}
        />

        <TouchableOpacity 
          onPress={() => router.push("/bookmark_stories")}>
          <Image
          source={require("../assets/jam_menu.png")}
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Explore amazing routes and share your adventure stories
      </Text>

      <View style={styles.tabWrapper}>
        <Animated.View
          style={[
            styles.activeBackground,
            { transform: [{ translateX: slideAnim }] },
          ]}
        />
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("Trail")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Trail" && styles.activeTabText,
            ]}
          >
            Trail List
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("Story")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Story" && styles.activeTabText,
            ]}
          >
            Story List
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.searchInput} placeholder="Search" />

      <FlatList
        data={listToRender}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },

  logo: { width: 55, height: 55, resizeMode: "contain", marginTop: 25 },

  menuButton: { fontSize: 24 },

  subtitle: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 13,
    color: "#333",
  },

  tabWrapper: {
    flexDirection: "row",
    backgroundColor: "#d4d4d4",
    borderRadius: 6,
    height: 27,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
    marginHorizontal: 15,
  },

  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  tabText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#000",
    fontWeight: "700",
  },

  activeBackground: {
    position: "absolute",
    width: "50%",
    height: "95%",
    backgroundColor: "#fff",
    borderRadius: 6,
    zIndex: 1,
    margin: 0.5,
  },

  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    marginHorizontal: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 15,
    overflow: "hidden",
  },

  cardImage: { width: "100%", height: 150 },

  cardContent: { padding: 12 },

  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },

  cardDescription: { fontSize: 14, color: "#555", marginBottom: 6 },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTime: { fontSize: 12, color: "#888" },
  cardViews: { fontSize: 12, color: "#888" },
});
