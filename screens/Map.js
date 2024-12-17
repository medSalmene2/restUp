import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Banner, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../firestore/auth/AuthContext";
import { updateUserLocation } from "../firestore/User";

const Map = ({ setLocation, setLocationPoint }) => {
  const mapViewRef = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  const currentRegion = useRef({
    latitude: 36.7277622657912, // Latitude of Tunisia
    longitude: 10.203072895008471, // Longitude of Tunisia
    latitudeDelta: 1, // Zoom level
    longitudeDelta: 1, // Zoom level
  });
  const navigation = useNavigation();
  const { user , refreshUser} = useAuth();
  useEffect(() => {
    if (mapViewRef.current && currentLocation !== null) {
      mapViewRef.current.fitToCoordinates(currentLocation, { animated: true });
    }
  }, [currentLocation]);
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=0`,
        {
          headers: {
            "User-Agent": "YourAppName/2.0.0", // Replace with your app's name/version
          },
        }
      );
      //setLocation is provided during event creation  , this is arbitrary choice
      if (setLocation) {
        setLocationPoint({ latitude, longitude });
        setLocation(response.data.display_name);
        navigation.goBack();
      }
      //This is for profile location saving
      else {
        navigation.navigate("Profile", {
          adress: response.data.display_name,
          location: { latitude, longitude },
        });
        await updateUserLocation(
          user?.id,
          { longitude, latitude },
          response.data.display_name
        );
        await refreshUser();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to get location data");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            top: "10%",
            width: "95%",
            padding: 10,
            height: 60,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: "#e0f7fa",
            direction: "rtl",
            position: "absolute",
            zIndex: 2,
            justifyContent: "space-between",
            opacity: 0.9,
            flexDirection: "row",
          }}>
          <Text>اضغط على الموافقة لتسجيل احداثياتك </Text>
          <IconButton
            onPress={async () => {
              const latlng = {
                latitude: currentRegion.current.latitude,
                longitude: currentRegion.current.longitude,
              };
              setCurrentLocation(latlng);
              await reverseGeocode(latlng.latitude, latlng.longitude);
            }}
            icon={"check"}
            mode='contained'
            size={20}
          />
        </View>
        <MapView
          style={styles.map}
          ref={mapViewRef}
          onRegionChangeComplete={region => (currentRegion.current = region)}
          initialRegion={{
            latitude: 36.7277622657912, // Latitude of Tunisia
            longitude: 10.203072895008471, // Longitude of Tunisia
            latitudeDelta: 1, // Zoom level
            longitudeDelta: 1, // Zoom level
          }}></MapView>
        <IconButton
          icon={"target"}
          mode='contained'
          size={37}
          style={{
            alignSelf: "flex-end",
            marginBottom: "40%",
            marginRight: 15,
          }}
          onPress={async () => {
            try {
              let { status } =
                await Location.requestForegroundPermissionsAsync();
              if (status !== "granted") {
                throw new Error();
              }

              let location = await Location.getCurrentPositionAsync({});
              setCurrentLocation([
                {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
              ]);
            } catch (error) {
              console.log(error);
              Alert.alert("Please enable location permission");
            }
          }}
        />
        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={require("../assets/marker.png")}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  markerFixed: {
    position: "absolute",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    marginLeft: -24, // Adjust based on half of the marker width
    marginTop: -24, // Adjust based on half of the marker height
  },
  marker: {
    height: 48,
    width: 48,
  },
});

export default Map;
