export function formatDisplayTime(time: number): string {
  if (time < 10) {
    return `0${time}`;
  }
  return time.toString();
}

export function secondsToTime(seconds: number): [number, number] {
  return [Math.floor(seconds / 60), seconds % 60];
}