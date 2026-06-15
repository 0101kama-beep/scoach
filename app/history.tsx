import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import Colors from "../src/Color";

export default function Session() {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [steps, setSteps] = useState(0);

  const saveSession = async () => {
    try {
      const session = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        steps,
        distance,
        duration,
      };

      const existingData =
        await AsyncStorage.getItem("sessions");

      const sessions = existingData
        ? JSON.parse(existingData)
        : [];

      sessions.push(session);

      await AsyncStorage.setItem(
        "sessions",
        JSON.stringify(sessions)
      );

      Alert.alert(
        "Success",
        "Session saved successfully!"
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Failed to save session"
      );
    }
  };

  const clearSessions = async () => {
    await AsyncStorage.removeItem("sessions");
    Alert.alert("All sessions deleted");
  };

  return (
    <LinearGradient
      colors={["#191212", "#929717"]}
      style={styles.container}
    >
      <Text style={styles.title}>
        Current Session
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Steps
        </Text>
        <Text style={styles.value}>
          {steps}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Distance
        </Text>
        <Text style={styles.value}>
          {distance} km
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Duration
        </Text>
        <Text style={styles.value}>
          {duration} sec
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={saveSession}
      >
        <Text style={styles.buttonText}>
          Save Session
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/history")
        }
      >
        <Text style={styles.buttonText}>
          Go To History
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={clearSessions}
      >
        <Text style={styles.buttonText}>
          Delete All Sessions
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>
          Home
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },

  card: {
    width: "80%",
    backgroundColor: Colors.card,
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: "center",
  },

  label: {
    color: "#fff",
    fontSize: 18,
  },

  value: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },

  button: {
    marginTop: 15,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    width: "70%",
    borderRadius: 15,
    alignItems: "center",
  },

  deleteButton: {
    marginTop: 15,
    backgroundColor: "red",
    padding: 15,
    width: "70%",
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});