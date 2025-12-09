import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const RegisterScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <ImageBackground
        source={require("../assets/bg.png")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.bgOverlay} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Image
            source={require("../assets/weui_back-filled.png")}
            style={{ width: 30, height: 40, resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/YSLogo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Register</Text>
          <TouchableOpacity style={[styles.button, styles.facebookButton]}>
            <Image
              source={require("../assets/fb.png")}
              style={styles.iconImage}
            />
            <Text style={styles.buttonText}>Sign up with Facebook</Text>
          </TouchableOpacity>

          {/* Apple button */}
          <TouchableOpacity style={[styles.button, styles.appleButton]}>
            <Image
              source={require("../assets/apple.png")}
              style={styles.iconImage}
            />
            <Text style={styles.buttonText}>Sign up with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.googleButton]}>
            <Image
              source={require("../assets/google.png")}
              style={styles.iconImage}
            />
            <Text style={styles.googleText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity onPress={() => router.push("/regpage")}>
            <Text style={styles.emailLink}>Register with Email</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.75)",
  },

  backButton: {
    position: "absolute",
    top: 10,
    left: 12,
    zIndex: 20,
    padding: 5,
  },

  logoContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  logoImage: {
    width: 171,
    height: 171,
  },
  logoTitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#333",
  },

  card: {
    width: "85%",
    marginTop: 32,
    paddingVertical: 26,
    paddingHorizontal: 22,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 26,
  },

  button: {
    height: 54,
    borderRadius: 12,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
  },
  appleButton: {
    backgroundColor: "#000",
  },
  googleButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  googleText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomSection: {
    marginTop: 30,
    alignItems: "center",
  },
  emailLink: {
    fontSize: 15,
    textDecorationLine: "underline",
    marginTop: 4,
    color: "#2f66dbff",
  },
});

export default RegisterScreen;
