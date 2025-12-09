import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function LoginScreen({ navigation }) {
  const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            alert("Please enter both username/email and password.");
            return;
        }
        alert("Logging in… (demo)");
        navigation.navigate("CreateStory");
    };

    return (
        <View style={styles.root}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Image
            source={require("../assets/weui_back-filled.png")}
            style={{ width: 30, height: 40, resizeMode: "contain" }}
          />
        </TouchableOpacity>

            <View style={styles.logoWrap}>
                <Image source={require("../assets/YSLogo.png")} style={styles.logo} />
            </View>

            <View style={styles.formBox}>
                <Text style={styles.title}>Sign In</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Username / Email"
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity onPress={() => alert("Forgot password (demo)")}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} 
                    onPress={() => router.push("/ProfileSettingsScreen")}>
                    <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerBar}
                    onPress={() => router.push("/register")}
                >
                    <Text style={{ color: "white", fontWeight: "600" }}>
                        Don't have an account yet?
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        paddingTop: 80,
    },


    backButton: {
        position: "absolute",
        top: 75,
        left: 12,
        zIndex: 20,
        padding: 5,
    },
    logoWrap: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: { width: 171, height: 171, resizeMode: "contain" },
    logoText: { fontWeight: "700", marginTop: 6 },
    formBox: {
        width: "90%",
        maxWidth: 420,
        backgroundColor: "#f2f2f2",
        borderRadius: 15,
        padding: 25,
    },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
    input: {
        width: "100%",
        padding: 10,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    forgot: {
        textAlign: "center",
        color: "#4a90e2",
        marginTop: 6,
        marginBottom: 12,
        textDecorationLine: "underline",
    },
    loginBtn: {
        backgroundColor: "#2d3748",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    loginBtnText: { color: "white", fontSize: 16 },
    registerBar: {
        backgroundColor: "#0a8d71",
        marginTop: 16,
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
    },
});