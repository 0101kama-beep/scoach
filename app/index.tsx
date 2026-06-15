import Colors from "@/src/Color";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import {
    requestPedometerPermission,
    startPedometer,
} from "../hooks/services/pedometer";

type PedometerSubscription = {
  remove: () => void;
};

export default function HomeScreen() {
  const [steps, setSteps] = useState(0);

  const goal = 10000;
  const percentage = Math.min((steps / goal) * 100, 100);

  const calories = (steps * 0.04).toFixed(0);
  const distance = (steps * 0.0008).toFixed(2);

  useEffect(() => {
    let subscription: PedometerSubscription | null = null;

    const init = async () => {
      const granted = await requestPedometerPermission();

      if (!granted) {
        console.log("Permission denied");
        return;
      }

      subscription = startPedometer((newSteps) => {
        setSteps(newSteps);
      });
    };

    init();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <LinearGradient colors={["#191212", "#929717"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Today Activity</Text>

        <AnimatedCircularProgress
          size={250}
          width={20}
          fill={percentage}
          tintColor="#4CAF50"
          backgroundColor="#3A3A3A"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View style={styles.centerContent}>
              <Text style={styles.stepsText}>{steps}</Text>
              <Text style={styles.goalText}>/ {goal} steps</Text>
            </View>
          )}
        </AnimatedCircularProgress>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progress</Text>
          <Text style={styles.cardValue}>{percentage.toFixed(0)}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Calories Burned</Text>
          <Text style={styles.cardValue}>{calories} kcal</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Distance</Text>
          <Text style={styles.cardValue}>{distance} km</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Goal Status</Text>
          <Text style={styles.cardValue}>
            {steps >= goal ? "Completed 🎉" : "In Progress"}
          </Text>
        </View>

        <View style={styles.card2}>
          <Text style={styles.title2}>Keep moving, every step counts 🚶</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/session")}
        >
          <Text style={styles.buttonText}>Start Session</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/history")}
        >
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },

  centerContent: {
    alignItems: "center",
  },

  stepsText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },

  goalText: {
    color: "#fff",
    marginTop: 5,
  },

  card: {
    marginTop: 20,
    width: "85%",
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
  },

  cardValue: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },

  card2: {
    marginTop: 20,
    width: "85%",
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },

  title2: {
    color: Colors.TEXT,
    fontSize: 18,
    fontWeight: "600",
  },

  button: {
    marginTop: 20,
    width: "85%",
    backgroundColor: Colors.PRIMARY,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
