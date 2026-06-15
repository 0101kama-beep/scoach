import { Pedometer } from "expo-sensors";

export const requestPedometerPermission = async () => {
  const { granted } = await Pedometer.requestPermissionsAsync();
  return granted;
};

export const startPedometer = (
  onStepChange: (steps: number) => void
) => {
  return Pedometer.watchStepCount((result) => {
    onStepChange(result.steps);
  });
};