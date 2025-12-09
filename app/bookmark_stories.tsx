import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const VISIBLE_BOOKMARKS = 3;

type Bookmark = { id: string; title: string; image: string; };
type Story = { id: string; title: string; subtitle: string; distance: string; duration: string; views: number; image: string; bookmarkId: string; };

const bookmarked: Bookmark[] = [
  { id: "b1", title: "Opera House", image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=500&q=60" },
  { id: "b2", title: "Haymarket", image: "https://www.cityofsydney.nsw.gov.au/-/jssmedia/corporate/images/general/haymarket-precinct/dixonstreet_gates.jpg?mw=640" },
  { id: "b3", title: "Circular Quay", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=60" },
  { id: "b4", title: "Circular Quay2", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=60" },
];

const allStories: Story[] = [
  { id: "s1", title: "Haymarket - Henry Fine Chang", subtitle: "Henry Fine Chang migrated to Sydney in 1877. Successful...", distance: "Distance from story: 50 m", duration: "14m", views: 95, image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=500&q=60", bookmarkId: "b2" },
  { id: "s2", title: "Circular Quay - Sydney Opera House", subtitle: "The Sydney Harbour Bridge is an iconic steel arch bridge...", distance: "Distance from story: 280 m", duration: "18m", views: 20000, image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=500&q=60", bookmarkId: "b3" },
  { id: "s3", title: "Haymarket - Henry Fine Chang", subtitle: "Henry Fine Chang opened a small grocery shop near the market...", distance: "Distance from story: 60 m", duration: "12m", views: 140, image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=60", bookmarkId: "b2" },
  { id: "s4", title: "Haymarket - Chinatown Gate", subtitle: "Walk through the iconic Chinatown gate and discover local food...", distance: "Distance from story: 80 m", duration: "10m", views: 320, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=60", bookmarkId: "b2" },
  { id: "s5", title: "Opera House - Harbour View", subtitle: "Discover how the Opera House changed Sydney’s skyline forever...", distance: "Distance from story: 150 m", duration: "16m", views: 12500, image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=500&q=60", bookmarkId: "b1" },
  { id: "s6", title: "Opera House - Backstage Stories", subtitle: "Behind the scenes of world-class performances and concerts...", distance: "Distance from story: 190 m", duration: "20m", views: 8600, image: "https://images.unsplash.com/photo-1526481280695-3c687fd543c0?auto=format&fit=crop&w=500&q=60", bookmarkId: "b1" },
  { id: "s7", title: "Circular Quay - Harbour Views", subtitle: "Walk along the waterfront and enjoy stunning views of the city...", distance: "Distance from story: 120 m", duration: "11m", views: 9800, image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=60", bookmarkId: "b4" },
  { id: "s8", title: "Circular Quay - Ferry Stories", subtitle: "Learn how ferries connected suburbs and shaped daily life...", distance: "Distance from story: 210 m", duration: "9m", views: 4300, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=500&q=60", bookmarkId: "b3" },
  { id: "s9", title: "Haymarket - Market Life", subtitle: "Stories from stall owners and families working at the market...", distance: "Distance from story: 40 m", duration: "13m", views: 510, image: "https://images.unsplash.com/photo-1534297635766-a262cdcb6b0b?auto=format&fit=crop&w=500&q=60", bookmarkId: "b2" },
  { id: "s10", title: "Opera House - Design & Architecture", subtitle: "Discover the bold ideas behind the Opera House design...", distance: "Distance from story: 200 m", duration: "17m", views: 15700, image: "https://images.unsplash.com/photo-1526481280693-3b113a133871?auto=format&fit=crop&w=500&q=60", bookmarkId: "b1" },
];

// Mảng màu pastel để random màu FlatList
const colors = ["#FFF9F2", "#F2F1FF", "#FFF1F2", "#F2FFF4", "#FFFFF2", "#F6E2B3", "#C3F0CA"];

export default function BookmarkedStoriesScreen() {
  const router = useRouter();
  const [bookmarksOrder, setBookmarksOrder] = useState(bookmarked);
  const [selectedBookmark, setSelectedBookmark] = useState(bookmarked[1].id);

  const scaleAnims = useRef(
    bookmarked.reduce((acc, b) => {
      acc[b.id] = new Animated.Value(b.id === selectedBookmark ? 1.2 : 0.85);
      return acc;
    }, {} as { [key: string]: Animated.Value })
  ).current;

  const filteredStories = allStories.filter(s => s.bookmarkId === selectedBookmark);

  const animateScale = (centerId: string) => {
    bookmarksOrder.forEach(b => {
      Animated.spring(scaleAnims[b.id], {
        toValue: b.id === centerId ? 1.2 : 0.85,
        useNativeDriver: true,
      }).start();
    });
  };

  const rotateRight = () => {
    const newOrder = [...bookmarksOrder];
    newOrder.push(newOrder.shift()!); 
    setBookmarksOrder(newOrder);
    setSelectedBookmark(newOrder[1].id);
    animateScale(newOrder[1].id);
  };

  const rotateLeft = () => {
    const newOrder = [...bookmarksOrder];
    newOrder.unshift(newOrder.pop()!); 
    setBookmarksOrder(newOrder);
    setSelectedBookmark(newOrder[1].id);
    animateScale(newOrder[1].id);
  };

  const renderStory = ({ item, index }: { item: Story; index: number }) => {
    const backgroundColor = colors[index % colors.length]; // màu random theo index
    return (
      <TouchableOpacity style={[styles.storyCard, { backgroundColor }]} activeOpacity={0.8}>
        <Image source={{ uri: item.image }} style={styles.storyImage} />
        <View style={styles.storyContent}>
          <View style={styles.storyHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.storyTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.storySubtitle} numberOfLines={1}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={28} color="#999" style={styles.arrowButton2} />
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
              <View style={styles.distanceContainer}>
                <Text style={styles.storyDistance}>{item.distance}</Text>
              </View>
              <View style={styles.storyFooter}>
                <View style={styles.viewsContainer}>
                  <Ionicons name="eye-outline" size={12} color="#666" />
                  <Text style={styles.viewsText}>{item.views >= 1000 ? `${(item.views / 1000).toFixed(0)}k` : item.views}</Text>
                </View>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Image source={require("../assets/YSLogo.png")} style={styles.logo} />
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.bookmarkSection}>
        <View style={styles.badgeWrapper}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Bookmarked Stories</Text>
          </View>
        </View>

        <View style={styles.bookmarkRow}>
          <TouchableOpacity onPress={rotateLeft} style={styles.arrowButton}>
            <Ionicons name="chevron-back" size={28} color="#444" />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}>
            {bookmarksOrder.slice(0, VISIBLE_BOOKMARKS).map((b, i) => {
              const isCenter = i === 1;
              return (
                <Animated.View
                  key={b.id}
                  style={{
                    alignItems: "center",
                    marginHorizontal: 10,
                    transform: [{ scale: scaleAnims[b.id] }],
                  }}
                >
                  <Image source={{ uri: b.image }} style={styles.circleImage} />
                  <Text style={[styles.circleLabel, isCenter && styles.circleLabelSelected]}>{b.title}</Text>
                </Animated.View>
              );
            })}
          </View>

          <TouchableOpacity onPress={rotateRight} style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={28} color="#444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Stories List</Text>
      </View>

      <FlatList
        data={filteredStories}
        keyExtractor={(item) => item.id}
        renderItem={renderStory}
        scrollEnabled={false}
        contentContainerStyle={styles.storiesList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff",  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12},
  headerButton: { padding: 6, width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  logo: { width: 50, height: 50, resizeMode: "contain" },
  bookmarkSection: { backgroundColor: "#FAF6F6", paddingBottom: 40, },
  badgeWrapper: { paddingHorizontal: 10, marginTop: 10 },
  badge: { alignSelf: "flex-start", backgroundColor: "#D4F4DD", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  badgeText: { fontSize: 15, fontWeight: "600", color: "#2D5F3F" },
  bookmarkRow: {  flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 14 },
  arrowButton: { padding: 8, },
  arrowButton2: { paddingTop: 8, },
  circleImage: { width: 85, height: 85, borderRadius: 42.5 },
  circleLabel: { fontSize: 12, color: "#999", marginTop: 4 },
  circleLabelSelected: { fontSize: 13, fontWeight: "700", color: "#000" },
  listHeader: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 10 },
  listTitle: { fontSize: 18, fontWeight: "700" },
  storiesList: { paddingHorizontal: 16, paddingBottom: 40, },
  storyCard: { flexDirection: "row", padding: 12, borderRadius: 12, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 3, elevation: 1, borderColor: "#B7B7B7", borderWidth: 0.2, },
  storyImage: { width: 60, height: 60, borderRadius: 30 },
  storyContent: { flex: 1, marginLeft: 12 },
  storyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  storyTitle: { fontSize: 14, fontWeight: "700" },
  storySubtitle: { fontSize: 11, color: "#666", marginTop: 2, marginBottom: 4 },
  distanceContainer: { backgroundColor: "#EEE", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, width: undefined, alignSelf: "flex-start" },
  storyDistance: { fontSize: 10, color: "#555", },
  storyFooter: { flexDirection: "row", justifyContent: "flex-end", marginTop: 6 },
  viewsContainer: { flexDirection: "row",  paddingHorizontal: 8, paddingVertical: 0,  alignItems: "center" },
  viewsText: { fontSize: 8, marginLeft: 4, color: "#666" },
});
