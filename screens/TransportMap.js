import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

// Haversine formula for distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const TransportMap = () => {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [currentMapCenter, setCurrentMapCenter] = useState({
    latitude: 36.7277622657912, // Latitude of Tunisia
    longitude: 10.203072895008471, // Longitude of Tunisia
    latitudeDelta: 1, // Zoom level
    longitudeDelta: 1, // Zoom level
  });
  const [selectionStage, setSelectionStage] = useState("from"); // 'from', 'to', 'completed'
  const mapRef = useRef(null);

  // Pricing constants
  const BASE_FARE = 5;
  const PRICE_PER_KM = 1.5;

  const handleMapCenterChange = region => {
    console.log(region);
    setCurrentMapCenter({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const confirmLocation = () => {
    if (selectionStage === "from") {
      setFromLocation(currentMapCenter);
      setSelectionStage("to");
    } else if (selectionStage === "to") {
      setToLocation(currentMapCenter);
      setSelectionStage("completed");
    }
  };
  const calculateTripDetails = () => {
    if (!fromLocation || !toLocation) return null;

    const distance = calculateDistance(
      fromLocation.latitude,
      fromLocation.longitude,
      toLocation.latitude,
      toLocation.longitude
    );

    const totalPrice = BASE_FARE + distance * PRICE_PER_KM;

    return {
      distance: distance.toFixed(2), // Distance in kilometers
      basePrice: BASE_FARE,
      distancePrice: (distance * PRICE_PER_KM).toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    };
  };
  const tripDetails = calculateTripDetails();

  const resetSelection = () => {
    setFromLocation(null);
    setToLocation(null);
    setSelectionStage("from");
    setCurrentMapCenter(null);
  };
console.log("From marker" , fromLocation )
console.log("To marker", toLocation )
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 36.7277622657912, // Latitude of Tunisia
          longitude: 10.203072895008471, // Longitude of Tunisia
          latitudeDelta: 1, // Zoom level
          longitudeDelta: 1, // Zoom level
        }}
        onRegionChangeComplete={handleMapCenterChange}>
        {fromLocation && (
          <Marker
            coordinate={fromLocation}
            pinColor='green'
            title='Lieu de départ'
          />
        )}

        {toLocation && (
          <Marker coordinate={toLocation} pinColor='red' title="Lieu d'arrivée" />
        )}

        {fromLocation && toLocation && (
          <Polyline
            coordinates={[fromLocation, toLocation]}
            strokeColor='#000'
            strokeWidth={3}
          />
        )}
      </MapView>

      {/* Centered Marker */}
      {!(fromLocation && toLocation) && (
        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={require("../assets/marker.png")}
          />
        </View>
      )}

      {/* Instruction Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.instructionText}>
          {selectionStage === "from"
            ? "Centrez la carte sur le lieu de départ"
            : selectionStage === "to"
            ? "Centrez la carte sur le lieu d'arrivée"
            : "Lieux sélectionnés"}
        </Text>
      </View>

      {/* Confirm Location Button */}
      {selectionStage !== "completed" && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmLocation}>
          <Text style={styles.confirmButtonText}>
            {selectionStage === "from" ? "Confirmer le départ" : "Confirmer l'arrivée"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Pricing Container */}
      {fromLocation && toLocation && tripDetails && (
        <View style={styles.pricingContainer}>
          <Text style={styles.pricingTitle}>Détails du trajet</Text>
          
          <View style={styles.pricingDetailsContainer}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Distance totale</Text>
              <Text style={styles.pricingValue}>{tripDetails.distance} km</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Prix de base</Text>
              <Text style={styles.pricingValue}>TND {tripDetails.basePrice}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Prix par distance</Text>
              <Text style={styles.pricingValue}>
                € {tripDetails.distancePrice} (TND 1.50/km)
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.pricingRow}>
              <Text style={styles.totalLabel}>Prix total</Text>
              <Text style={styles.totalValue}>
                TND {tripDetails.totalPrice}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Reset Button */}
      {(fromLocation || toLocation) && (
        <TouchableOpacity style={styles.resetButton} onPress={resetSelection}>
          <Text style={styles.resetButtonText}>Réinitialiser</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -24,
    marginTop: -24,
  },
  marker: {
    height: 48,
    width: 48,
  },
  overlay: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  instructionText: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  confirmButton: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pricingContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  pricingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  pricingDetailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pricingLabel: {
    fontSize: 16,
    color: '#666',
  },
  pricingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  resetButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: "red",
  },
});

export default TransportMap;
