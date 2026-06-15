import * as Location from "expo-location";

export const startLocationTracking =
  async (callback: any) => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error(
        "Location denied"
      );
    }

    return Location.watchPositionAsync(
      {
        accuracy:
          Location.Accuracy.High,
        distanceInterval: 5,
      },
      callback
    );
  };