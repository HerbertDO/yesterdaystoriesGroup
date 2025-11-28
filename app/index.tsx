
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function HomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: -33.8688,
          longitude: 151.2093,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFillObject} />

      <View style={styles.logoContainer}>
        <Image source={require('../assets/YSLogo.png')} style={styles.logo} />
      </View>

      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => router.push("/view_stories")}
      >
        <Image
          source={require('../assets/pajamas_profile.png')}
          style={styles.profile}
        />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.viewButton]}
          onPress={() => router.push("/view_stories")}
        >
          <Image source={require('../assets/viewstoriesicon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>View Stories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.uploadButton]}>
          <Image source={require('../assets/uploadicon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Upload Stories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.trailButton]}
          onPress={() => router.push("/create_trail")}>
          <Image source={require('../assets/trailicon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Create Trail List</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Select an option to get started on your storytelling journey
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  profileIcon: {
    position: 'absolute',
    top: '8%',
    left: '5%',
  },
  profile: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  logoContainer: {
    position: 'absolute',
    top: '8%',
    alignSelf: 'center',
    width: '100%',
    height: '30%',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    opacity: 0.65,
  },

  buttonContainer: {
    position: 'absolute',
    top: '36%',
    width: '100%',
    height: '42%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    height: '20%',
    paddingLeft: '10%',
    marginVertical: 15,
    borderRadius: 6,
  },
  viewButton: { backgroundColor: '#475569' },
  uploadButton: { backgroundColor: '#0D9488' },
  trailButton: { backgroundColor: '#EA580C' },

  buttonText: {
    color: '#fff',
    marginLeft: 8,
    width: '60%',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },

  icon: {
    marginRight: 5,
    width: '20%',
    height: '45%',
    resizeMode: 'contain',
  },

  footerText: {
    position: 'absolute',
    width: '80%',
    top: '75%',
    alignSelf: 'center',
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Italic',
  },
});
