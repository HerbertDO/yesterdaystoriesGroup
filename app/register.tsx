import { useRouter } from "expo-router";
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const RegisterScreen = () => {
  const handleFacebookSignUp = () => {
    console.log('Facebook sign up');
  };

  const router = useRouter();

  const handleAppleSignUp = () => {
    console.log('Apple sign up');
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up');
  };

  const handleEmailSignUp = () => {
    console.log('Email sign up');
  };

  const handleBack = () => {
    console.log('Go back');
  };

  return (
    <ImageBackground 
      source={require('../assets/bg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity onPress={() => router.back()}>
                  <Image
                              source={require("../assets/weui_back-filled.png")}
                              style={{ width: 30, height: 40, resizeMode: "contain" }}
                            />
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoTitle}>Yesterday Stories</Text>
        </View>

        {/* Register Title */}
        <Text style={styles.title}>Register</Text>

        {/* Sign Up Buttons */}
        <View style={styles.buttonsContainer}>
          {/* Facebook Button */}
          <TouchableOpacity 
            style={[styles.button, styles.facebookButton]}
            onPress={handleFacebookSignUp}
          >
            <Image 
              source={require('../assets/fb.png')}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Sign up with Facebook</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity 
            style={[styles.button, styles.appleButton]}
            onPress={handleAppleSignUp}
          >
            <Image 
              source={require('../assets/apple.png')}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, styles.appleButtonText]}>
              Sign up with Apple
            </Text>
          </TouchableOpacity>

          {/* Google Button */}
          <TouchableOpacity 
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleSignUp}
          >
            <Image 
              source={require('../assets/google.png')}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, styles.googleButtonText]}>
              Sign up with Google
            </Text>
          </TouchableOpacity>

          {/* Email Button */}
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={handleEmailSignUp}
          >
            <Text style={styles.emailButtonText}>Register with Email</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Logo */}
        <Text style={styles.bottomLogo}>Yesterday Stories</Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    width: 40,
  },
  backIcon: {
    fontSize: 36,
    color: '#000',
    fontWeight: '300',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  logoTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  appleButtonText: {
    marginLeft: 0,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  googleButtonText: {
    color: '#000',
  },
  emailButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  emailButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  bottomLogo: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '300',
    color: '#E8E8E8',
  },
});

export default RegisterScreen;