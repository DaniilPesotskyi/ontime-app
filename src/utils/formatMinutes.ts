export const formatMinutes = (value: number) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}