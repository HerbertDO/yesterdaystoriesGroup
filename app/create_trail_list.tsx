import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface Package {
  id: number;
  price: number;
  title: string;
  description: string;
  perStory: string;
}

export default function CreateTrailListScreen() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [waypoints, setWaypoints] = useState<string[]>(["", "", ""]);
  const [startingPoint, setStartingPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");

  const packages: Package[] = [
    {
      id: 1,
      price: 50,
      title: "5 Story Package",
      description: "Upload up to 5 stories to add to your trail.",
      perStory: "per year",
    },
    {
      id: 2,
      price: 100,
      title: "10 Story Package",
      description: "Upload up to 10 stories to add to your trail.",
      perStory: "per year",
    },
    {
      id: 3,
      price: 200,
      title: "20 Story Package",
      description: "Upload up to 20 stories or ads to your trail.",
      perStory: "per year",
    },
  ];

  const handleAddWaypoint = () => {
    setWaypoints((prev) => [...prev, ""]);
  };

  const handleWaypointChange = (index: number, value: string) => {
    setWaypoints((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Trail</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Available Options</Text>

        <View style={styles.packagesContainer}>
          {packages.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              style={[
                styles.packageCard,
                selectedPackage === pkg.id && styles.packageCardSelected,
              ]}
              onPress={() => setSelectedPackage(pkg.id)}
              activeOpacity={0.9}
            >
              <View style={styles.packageHeader}>
                <Text style={styles.packagePrice}>{pkg.price}$</Text>
                <Text style={styles.packagePerStory}>{pkg.perStory}</Text>
              </View>
              <Text style={styles.packageTitle}>{pkg.title}</Text>
              <Text style={styles.packageDescription}>{pkg.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Starting of the trail"
          placeholderTextColor="#999"
          value={startingPoint}
          onChangeText={setStartingPoint}
        />

        {waypoints.map((waypoint, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Waypoint ${String.fromCharCode(65 + index)}`}
            placeholderTextColor="#999"
            value={waypoint}
            onChangeText={(value) => handleWaypointChange(index, value)}
          />
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddWaypoint}>
          <Text style={styles.addButtonText}>+ Add Waypoint</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter End of the trail"
          placeholderTextColor="#999"
          value={endPoint}
          onChangeText={setEndPoint}
        />
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/create_trail")}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c8c8c8ff",
  },
  header: {
    marginTop: 60,
    backgroundColor: "#4A5F7F",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    width: "100%",
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "300",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  packagesContainer: {
    marginBottom: 16,
  },
  packageCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  backBtn: {
    width: 30,
    height: 40,
    resizeMode: "contain",
  },
  packageCardSelected: {
    borderColor: "#4A5F7F",
  },
  packageHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  packagePrice: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginRight: 4,
  },
  packagePerStory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#4A5F7F",
    borderStyle: "dashed",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A5F7F",
  },
  bottomButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  goBackButton: {
    flex: 1,
    backgroundColor: "#4A5F7F",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  goBackText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#4A5F7F",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  nextText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});