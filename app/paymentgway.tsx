import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentGway() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backWrapper} onPress={() => router.back()}>
        <Image
          source={require("../assets/weui_back-filled.png")}
          style={styles.backBtn}
        />
      </TouchableOpacity>

      <Image
        style={styles.logo_top}
        source={require("../assets/YSLogo.png")}
        resizeMode="cover"
      />

      <View style={styles.oauthpayment}>

        <TextInput value="" style={styles.regbox} placeholder="CARD NUMBER" />

        <Image
          source={require("../assets/cardlogo.png")}
          style={styles.cardlogo}
        />

        <TextInput value="" style={styles.regbox_1} placeholder="MM/YY" />
        <TextInput value="" style={styles.regbox_1} placeholder="Country" />

        <TextInput
          value=""
          style={[styles.regbox_1, { top: -80, left: 210 }]}
          placeholder="CVC"
        />

        <TextInput
          value=""
          style={[styles.regbox_1, { top: -80, left: 210 }]}
          placeholder="Postal code"
        />

        <Text style={{ left: 190, top: 15 }}>Or</Text>
      </View>

      <TouchableOpacity style={styles.applepayment}>
        <Image
          source={require("../assets/apple.png")}
          style={styles.paybutton}
          resizeMode="contain"
        />
        <Text style={styles.payText}>Apple Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googlepayment}>
        <Image
          source={require("../assets/logogg.png")}
          style={styles.paybutton}
          resizeMode="contain"
        />
        <Text style={styles.payText}>Google Pay</Text>
      </TouchableOpacity>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "white" }]}
        >
          <Text style={{ color: "black", fontWeight: "600" }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#475569" }]}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Pay Now</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F2EF",
  },

  backWrapper: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 999,
  },

  backBtn: {
    width: 30,
    height: 40,
    resizeMode: "contain",
  },

  logo_top: {
    marginTop: 100,
    height: 150,
    width: 100,
  },

  oauthpayment: {
    marginTop: 30,
    width: 400,
    height: 450,
    borderColor: "F5F2EF",
    borderWidth: 0.4,
    borderRadius: 40,
  },

  regbox: {
    top: 60,
    left: 50,
    height: 45,
    width: "70%",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },

  cardlogo: {
    top: 10,
    left: 240,
    height: 15,
    width: "20%",
    backgroundColor: "white",
    borderRadius: 8,
  },

  regbox_1: {
    top: 50,
    left: 50,
    height: 45,
    width: "30%",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },

  applepayment: {
    bottom: 157,
    left: 80,
    borderRadius: 45,
    borderWidth: 4,
    width: 120,
    padding: 4,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
  },

  googlepayment: {
    bottom: 210,
    right: 80,
    borderRadius: 45,
    borderWidth: 3,
    width: 120,
    paddingLeft: 20,
    padding: 4,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
  },

  paybutton: {
    backgroundColor: "black",
    borderRadius: 200,
    width: 20,
    height: 38,
  },

  payText: {
    marginLeft: 2,
    top: 10,
    width: 90,
    color: "white",
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    marginTop: -170, 
  },

  actionButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
