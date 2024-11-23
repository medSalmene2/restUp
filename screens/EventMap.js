import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
const EventMap = ({ location }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Ensure location coordinates are numeric values
  const markerCoords = {
    latitude: parseFloat(location.latitude),
    longitude: parseFloat(location.longitude),
  };

  const initialRegion = {
    latitude: markerCoords.latitude,
    longitude: markerCoords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const EmbeddedMap = () => (
    <TouchableOpacity
      onPress={toggleFullScreen}
      style={styles.embeddedContainer}>
      <MapView
        style={styles.embeddedMap}
        initialRegion={initialRegion}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}>
        <Marker
          coordinate={{
            latitude: markerCoords.latitude,
            longitude: markerCoords.longitude,
          }}
        />
      </MapView>
    </TouchableOpacity>
  );

  const FullScreenMap = () => (
    <Modal
      animationType='slide'
      transparent={false}
      visible={isFullScreen}
      onRequestClose={toggleFullScreen}>
      <View style={styles.fullScreenContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleFullScreen}>
          <Ionicons name='close' size={30} color='#000' />
        </TouchableOpacity>
        <MapView
          style={styles.fullScreenMap}
          initialRegion={initialRegion}
          showsUserLocation={true}>
          <Marker
            coordinate={{
              latitude: markerCoords.latitude,
              longitude: markerCoords.longitude,
            }}
          />
        </MapView>
      </View>
    </Modal>
  );

  // Add error handling for invalid coordinates
  if (!location || !location.latitude || !location.longitude) {
    return <View style={styles.embeddedContainer} />;
  }

  return (
    <>
      <EmbeddedMap />
      <FullScreenMap />
    </>
  );
};

const styles = StyleSheet.create({
  embeddedContainer: {
    height: 250,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  embeddedMap: {
    height: "100%",
    width: "100%",
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  fullScreenMap: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default EventMap;
