import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSessions = async (
  sessions: any[]
) => {
  await AsyncStorage.setItem(
    "sessions",
    JSON.stringify(sessions)
  );
};

export const loadSessions =
  async () => {
    const data =
      await AsyncStorage.getItem(
        "sessions"
      );

    return data
      ? JSON.parse(data)
      : [];
  };