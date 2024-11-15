const isLate = () => {
    const workStartTime = new Date();
    workStartTime.setHours(9, 0, 0, 0);

    return new Date() > workStartTime
}

export default isLate;