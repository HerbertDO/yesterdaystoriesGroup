import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const data = [
  {
    id: '1',
    title: "Mount Kembla Trail",
    image: require("../assets/trail.png"),
    time: "6 minutes",
    views: 25,
  },
  {
    id: '2',
    title: "Circular Quay - Sydney Opera House",
    description:
      "The Sydney Harbour Bridge is an iconic steel arch bridge in Sydney, Australia, that connects the Sydney central business district (CBD) with the North Shore …",
    image: require("../assets/trail.png"),
    time: "9 minutes",
    views: 120000,
  },
  {
    id: '3',
    title: "Circular Quay - Sydney Opera House",
    description:
      "The Sydney Harbour Bridge is an iconic steel arch bridge in Sydney, Australia, that connects the Sydney central business district (CBD) with the North Shore …",
    image: require("../assets/trail.png"),
    time: "10 minutes",
    views: 95000,
  },
];

export default function ViewStories() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Trail");

  const renderItem = ({ item }: any) => (
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
          <Image source={require('../assets/weui_back-filled.png')} style={{ width: 30, height: 40, resizeMode: 'contain' }}/>
        </TouchableOpacity>
        <Image
          source={require("../assets/YSLogo.png")}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Text style={styles.menuButton}>≡</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Explore amazing routes and share your adventure stories
      </Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Trail" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Trail")}
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
          style={[
            styles.tab,
            activeTab === "Story" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Story")}
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

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  backButton: { fontSize: 24 },
  menuButton: { fontSize: 24 },
  logo: { width: 100, height: 55, resizeMode: "contain" },
  subtitle: { textAlign: "center", marginBottom: 16, color: "#333" },

  tabContainer: { flexDirection: "row", marginBottom: 10 },
  tab: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: { backgroundColor: "#475569" },
  tabText: { color: "#333", fontWeight: "500" },
  activeTabText: { color: "#fff" },

  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
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
