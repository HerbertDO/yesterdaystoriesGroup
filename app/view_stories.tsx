import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { useFonts } from 'expo-font';


export default function App() {

  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
  });
  const initialRegion = {
    latitude: -33.8696,
    longitude: 151.2094,
    latitudeDelta: 0.06,
    longitudeDelta: 0.06,
  };

  const markers = [
    { id: '1', title: 'Museum', coord: { latitude: -33.8715, longitude: 151.2153 }, type: 'museum' },
    { id: '2', title: 'Cafe', coord: { latitude: -33.8731, longitude: 151.2069 }, type: 'cafe' },
    { id: '3', title: 'Attraction', coord: { latitude: -33.8688, longitude: 151.2093 }, type: 'attraction' },
    { id: '4', title: 'Park', coord: { latitude: -33.8655, longitude: 151.2100 }, type: 'park' },
  ];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        mapType={Platform.OS === 'android' ? 'standard' : 'mutedStandard'}
      >
        {markers.map((m) => (
          <Marker key={m.id} coordinate={m.coord} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={[styles.markerWrap, styles[`marker_${m.type}`]]}>
              <MaterialCommunityIcons name={m.type === 'museum' ? 'bank' : m.type === 'cafe' ? 'coffee' : m.type === 'park' ? 'tree' : 'map-marker'} size={20} color="#fff" />
            </View>
            <Callout>
              <View style={{ width: 150 }}>
                <Text style={{ fontWeight: '700' }}>{m.title}</Text>
                <Text>Tap for details</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView> 
      <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <Image source={require('../assets/weui_back-filled.png')} style={{ width: 30, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
            </View>
      <View style={styles.floatingButtons}> 
        <TouchableOpacity style={styles.fab} 
          onPress={() => router.push("/stories_trails_list")}>
          <Image source={require('../assets/tabler_list.png')} style={{ width: '70%', height: '70%', resizeMode: 'contain' }}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab} onPress={() => console.log('layers')}>
          <Image source={require('../assets/solar_compass-big-linear.png')} style={{ width: '70%', height: '70%', resizeMode: 'contain' }}/>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.searchBox}>
          <Image source={require('../assets/iconamoon_search-thin.png')} style={{ width: '10%', height: '45%', resizeMode: 'contain' }}/>
          <TextInput placeholder="Search" placeholderTextColor="#666" style={styles.input} />
        </View>
        <Text style={styles.bottomNote}>Explore amazing routes and share your adventure stories</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrap: {
    padding: 8,
    borderRadius: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker_attraction: {
    backgroundColor: '#C84B6A',
  },
  marker_cafe: {
    backgroundColor: '#6B5B95',
  },
  marker_museum: {
    backgroundColor: '#A57C00',
  },
  marker_park: {
    backgroundColor: '#419D78',
  },

  floatingButtons: {
    position: 'absolute',
    right: 14,
    top: '70%',
    alignItems: 'center',
    gap: 12,
  },
  fab: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabWhite: {
    backgroundColor: '#fff',
  },

 bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
searchBox: {
    width: '100%',
    height: 56,
    backgroundColor: '#d9d9d9',
    borderRadius: 14,
    paddingLeft: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  backButton: { fontSize: 24 },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular',
  },
  bottomNote: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
