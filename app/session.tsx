import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import Colors from "../src/Color";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function Session() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const onPress = () => {
    router.push("/history");
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startTracking = async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Location permission denied");
        return;
      }

      subscription =
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 5,
          },
          (location) => {
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);

            console.log("Latitude:", location.coords.latitude);
            console.log("Longitude:", location.coords.longitude);
          }
        );
    };

    startTracking();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <LinearGradient
      colors={["#191212", "#929717"]}
      style={styles.container}
    >
      <Text style={styles.title}>
        GPS Tracking
      </Text>

      {errorMsg ? (
        <Text style={styles.error}>
          {errorMsg}
        </Text>
      ) : (
        <>
          <Text style={styles.text}>
            Latitude:
          </Text>

          <Text style={styles.value}>
            {latitude ?? "Loading..."}
          </Text>

          <Text style={styles.text}>
            Longitude:
          </Text>

          <Text style={styles.value}>
            {longitude ?? "Loading..."}
          </Text>
        </>
      )}

      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Go To History
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  text: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },

  value: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  error: {
    color: "red",
    fontSize: 18,
  },

  button: {
    marginTop: 30,
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 15,
    width: "50%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});