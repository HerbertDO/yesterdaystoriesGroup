import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileSettingsScreen({ navigation }) {
  const router = useRouter();

  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/70");
  const [showCardForm, setShowCardForm] = useState(false);
  const [paymentList, setPaymentList] = useState([]);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const pickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required to pick an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const saveCard = () => {
    if (!cardName || !cardNumber || !cardExpiry) {
      alert("Please fill all fields");
      return;
    }

    const masked = "•••• " + cardNumber.slice(-4);
    const newCard = { id: Date.now(), masked, cardName, cardExpiry };
    setPaymentList([...paymentList, newCard]);

    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCVV("");
    setShowCardForm(false);
  };

  const deleteCard = (id) => setPaymentList(paymentList.filter(c => c.id !== id));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F2EF" }}>
      <View style={styles.container}>

        <View style={styles.topNav}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image
              source={require("../assets/weui_back-filled.png")}
              style={{ width: 30, height: 40, resizeMode: "contain" }}
            />
          </TouchableOpacity>

          <Image
            source={require("../assets/YSLogo.png")}
            style={{ width: 55, height: 55, marginTop: 40 }}
          />

          <TouchableOpacity onPress={() => alert("Saved (demo)")}>
            <Image
              source={require("../assets/akar-icons_save.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
            <View style={styles.titleRow}>
                <Image
                    source={require("../assets/iconamoon_profile-light.png")}
                    style={styles.titleIcon}
                />
                <Text style={styles.title}>Profile Information</Text>
            </View>

          <Text style={styles.subtitle}>
            Manage your personal information and profile picture
          </Text>

          <View style={styles.profileRow}>
            <TouchableOpacity
              style={styles.profilePicBtn}
              onPress={pickProfileImage}
            >
              <Image source={{ uri: profilePic }} style={styles.profileImg} />
            </TouchableOpacity>

            <Text style={styles.memberLabel}>Member since September 2025</Text>
          </View>

          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="User Name" />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="username@example.com" />

          <Text style={styles.label}>Bio</Text>
          <TextInput style={styles.input} placeholder="I love travel." />
        </View>

        <View style={styles.card}>
            <View style={styles.titleRow}>
                <Image
                    source={require("../assets/iconamoon_profile-light.png")}
                    style={styles.titleIcon}
                />
                <Text style={styles.title}>Payment Methods</Text>
            </View>
          <Text style={styles.subtitle}>Manage your payment options</Text>

          {paymentList.map(item => (
            <View key={item.id} style={styles.paymentBox}>
              <View>
                <Text style={{ fontWeight: "bold" }}>{item.masked}</Text>
                <Text style={styles.cardSmall}>{item.cardName}</Text>
                <Text style={styles.cardSmall}>Expires {item.cardExpiry}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteCard(item.id)}>
                <Text style={styles.deleteBtn}>🗑</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addPaymentBtn}
            onPress={() => setShowCardForm(!showCardForm)}
          >
            <Text style={{ textAlign: "center" }}>+ Add Payment Method</Text>
          </TouchableOpacity>

          {showCardForm && (
            <View style={styles.paymentForm}>
              <Text style={styles.label}>Cardholder Name</Text>
              <TextInput
                style={styles.inputLarge}
                value={cardName}
                onChangeText={setCardName}
                placeholder="John Doe"
              />

              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.inputLarge}
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />

              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.inputLarge}
                value={cardExpiry}
                onChangeText={setCardExpiry}
                placeholder="MM/YY"
              />

              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.inputLarge}
                value={cardCVV}
                onChangeText={setCardCVV}
                placeholder="123"
                maxLength={4}
              />

              <TouchableOpacity style={styles.saveCardBtn} onPress={saveCard}>
                <Text style={{ color: "white", textAlign: "center" }}>
                  Save Card
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.card}>
            <View style={styles.titleRow}>
                <Image
                    source={require("../assets/si_shield-line.png")}
                    style={styles.titleIcon}
                />
                <Text style={styles.title}>Account Actions</Text>
            </View>
          <Text style={styles.subtitle}>Manage your account</Text>

          <TouchableOpacity style={styles.whiteBtn}>
                <Image
                    source={require("../assets/si_sign-out-duotone.png")}
                    style={styles.titleIcon}
                />
            <Text style={{ marginLeft: 8, alignSelf: "center" }}>Sign Out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteAccountBtn}>
                <Image
                    source={require("../assets/typcn_warning.png")}
                    style={styles.titleIcon}
                />
            <Text style={{ marginLeft: 8, color: "white", alignSelf: "center" }}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: "92%", 
    paddingTop: 30,
    alignSelf: "center", 
    paddingVertical: 20,
  },
  titleRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
    },
    titleIcon: {
    width: 24,
    height: 20,
    resizeMode: "contain",
    },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {},
  card: {
    backgroundColor: "#F5F2EF",
    padding: 20,
    marginTop: 12,
    width: "95%",
    alignSelf: "center", 
    borderRadius: 15,
    borderColor: "#B7B7B7",
    borderWidth: 0.2,
  },
  title: { fontSize: 18, marginLeft: 5 },
  subtitle: { fontSize: 12, color: "#555", marginBottom: 6 },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  profilePicBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: 2,
  },
  profileImg: { width: "100%", height: "100%" },
  memberLabel: {
    fontSize: 13,
    color: "#444",
    marginLeft: 10,
  },
  label: { fontSize: 14, marginTop: 10 },
  input: {
    backgroundColor: "#E7E5E2",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  paymentBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteBtn: { fontSize: 20, color: "#b50000" },
  addPaymentBtn: {
    padding: 5,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "#ccc",
  },
  paymentForm: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputLarge: {
    width: "100%",
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
  },
  saveCardBtn: {
    marginTop: 10,
    backgroundColor: "#c10000",
    padding: 12,
    borderRadius: 10,
  },
  whiteBtn: {
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
    paddingLeft: 12,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: "#ccc",
  },
  deleteAccountBtn: {
    flexDirection: "row",
    backgroundColor: "#c10000",
    marginTop: 10,
    padding: 5,
    paddingLeft: 12,
    borderRadius: 5,
    borderWidth: 0.2,
  },
  cardSmall: { fontSize: 12, color: "#777" },
});
