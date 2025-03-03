export function calculateDelay(time: string, startHour: number) {
    const [hours, minutes] = time.split(":").map(Number);
    const arrivalTime = hours * 60 + minutes;
    const startTime = startHour * 60;

    return Math.max(arrivalTime - startTime, 0)
}