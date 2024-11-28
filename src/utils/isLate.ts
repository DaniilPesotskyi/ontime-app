const isLate = (startHour: number) => {
    const workStartTime = new Date();
    workStartTime.setHours(startHour, 0, 0, 0);

    return new Date() > workStartTime
}

export default isLate;