import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Story = {
  id: string;
  title: string;
  location: string;
  description: string;
  distance: string;
  fromStory: string;
  image: string;
};

const bookmarked = [
  {
    id: "b1",
    title: "Opera House",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "b2",
    title: "Haymarket",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad89?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "b3",
    title: "Opera House",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=60",
  },
];

const stories: Story[] = [
  {
    id: "s1",
    title: "Haymarket - Henry Fine Chang",
    location: "Haymarket - Sydney Metro Station",
    description: "The largest Asian community in the world welcomes you with food, culture, and vibrant streets.",
    distance: "14m",
    fromStory: "5.8km from story B",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "s2",
    title: "Circular Quay - Sydney Opera House",
    location: "Circular Quay - Sydney Opera House",
    description: "Admire Sydney’s world-famous harbour icon from every angle as you approach the concourse.",
    distance: "14m",
    fromStory: "5.8km from story B",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "s3",
    title: "Haymarket - Henry Fine Chang",
    location: "Haymarket - Sydney Metro Station",
    description: "Enjoy buzzing markets and hidden eateries as you explore the city’s historic Chinatown district.",
    distance: "14m",
    fromStory: "5.8km from story B",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=60",
  },
];

export default function BookmarkedStoriesScreen() {
  const router = useRouter();

  const renderStory = ({ item }: { item: Story }) => (
    <View style={styles.storyCard}>
      <Image source={{ uri: item.image }} style={styles.storyImage} />
      <View style={styles.storyContent}>
        <Text style={styles.storyTitle}>{item.title}</Text>
        <Text style={styles.storyLocation}>{item.location}</Text>
        <Text style={styles.storyDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.storyMetaRow}>
          <View>
            <Text style={styles.storyDistance}>{item.distance}</Text>
            <Text style={styles.storyFrom}>{item.fromStory}</Text>
          </View>
          <TouchableOpacity style={styles.storyAction}>
            <Ionicons name="arrow-forward" size={18} color="#3A4452" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Image source={require("../assets/YSLogo.png")} style={styles.logo} />
        <View style={styles.headerIcons}>
          <Ionicons name="bookmark-outline" size={22} color="#000" />
          <Ionicons name="notifications-outline" size={22} color="#000" style={{ marginLeft: 12 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bookmarked Stories</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bookmarkRow}
        >
          {bookmarked.map((item) => (
            <View key={item.id} style={styles.bookmarkCard}>
              <Image source={{ uri: item.image }} style={styles.bookmarkImage} />
              <Text style={styles.bookmarkTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.listHeaderRow}>
          <Text style={styles.storiesListTitle}>Stories List</Text>
          <TouchableOpacity style={styles.sortPill}>
            <Ionicons name="list-outline" size={16} color="#3A4452" />
            <Text style={styles.sortText}>Sort by</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={renderStory}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  logo: {
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeader: {
    alignSelf: "flex-start",
    marginLeft: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#E7F5E8",
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3A4452",
  },
  bookmarkRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  bookmarkCard: {
    alignItems: "center",
    marginRight: 16,
  },
  bookmarkImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 6,
  },
  bookmarkTitle: {
    fontSize: 12,
    color: "#3A4452",
  },
  listHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  storiesListTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  sortPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F1F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sortText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#3A4452",
  },
  storyCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  storyImage: {
    width: 100,
    height: "100%",
  },
  storyContent: {
    flex: 1,
    padding: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2F3542",
  },
  storyLocation: {
    fontSize: 12,
    color: "#6B7280",
    marginVertical: 2,
  },
  storyDescription: {
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 8,
  },
  storyMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storyDistance: {
    fontSize: 12,
    color: "#2F855A",
    fontWeight: "600",
  },
  storyFrom: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  storyAction: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#EDEFF3",
    alignItems: "center",
    justifyContent: "center",
  },
});