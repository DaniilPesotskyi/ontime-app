export function calculateDelay(time: string, startHour: number) {
    const [initHours, initMinutes] = time.split(":").map(Number);
    const arrivalTime = initHours * 60 + initMinutes;
    const startTime = startHour * 60;

    const delay = Math.max(arrivalTime - startTime, 0)

    const hours = Math.floor(delay / 60);
    const minutes = delay % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}