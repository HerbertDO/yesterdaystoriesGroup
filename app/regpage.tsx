import Checkbox from 'expo-checkbox';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';




export default function regpage() {

  
    const router = useRouter();
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const [emailprompt, setEmailPrompt] = useState<string>("");
  const [passwordprompt, setpassprompt] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const passwordv = /^(?=.*[0-9]).{6,}$/;
  const emailv = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const toggleCheckbox = () => {
    setIsAccept(prev => !prev);
  };

  const handleregister = () => {
    if (!isAccept) {
      Alert.alert("Please Accept Terms and conditions");
    } else if (!emailv.test(emailprompt)) {
      Alert.alert("Please enter a valid email");
    } else if (!passwordv.test(passwordprompt)) {
      Alert.alert("Please enter a valid password");
    } else if (passwordprompt !== confirmPassword) {
      Alert.alert("Passwords do not match");
    } else {
      Alert.alert("Registered Successfully");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}>
                <Image
                  source={require("../assets/weui_back-filled.png")}
                  style={{ width: 30, height: 40, resizeMode: "contain" }}
                />
              </TouchableOpacity>
      <ImageBackground
        style={styles.logo_top}
        source={require('../assets/YSLogo.png')}
        resizeMode="cover"
      />
      <ImageBackground
        style={styles.logo}
        source={require('../assets/YSLogo.png')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.inputbox} />

        <View style={styles.termsconditions}>
          <Checkbox style={styles.checkbox} value={isAccept} onValueChange={setIsAccept} />
          <Text style={styles.link}> Terms and Conditions </Text>
        </View>

        <TouchableOpacity style={styles.buttonbox} onPress={handleregister}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}> Register</Text>
        </TouchableOpacity>

        <TextInput
          value={emailprompt}
          style={styles.regbox}
          placeholder="   Enter your email"
          onChangeText={setEmailPrompt}
        />
        <TextInput
          value={passwordprompt}
          style={styles.regbox}
          placeholder="   Enter your password"
          secureTextEntry
          onChangeText={setpassprompt}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.regbox}
          placeholder="   Confirm your password"
          secureTextEntry
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 300,
    paddingTop: 80,
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 12,
    zIndex: 20,
    padding: 5,
  },
  inputbox: {
    marginBottom: 200,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: '80%',
    backgroundColor: 'rgba(240, 239, 243, 0.47)',
    borderRadius: 10,
  },
  logo_top: {
    position: 'absolute',
    top: 100,
    height: 150,
    width: 100,
  },
  regbox: {
    top: -600,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: '70%',
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  buttonbox: {
    width: '60%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    margin: -20,
    padding: 10,
    top: -380,
    backgroundColor: '#444767ff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkbox: {
    marginRight: 8,
    marginLeft: 10,
    top: 1,
    left: 70,
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  termsconditions: {
    top: -415,
    left: -100,
    flexDirection: 'row',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    left: 70,
  },
});
