export const getIp = async () => {
    try {
        return await fetch('https://checkip.amazonaws.com/')
            .then((res) => res.text())
            .then((data) => data.trim())
    } catch (error) {
        console.error(error);
        throw error;
    }
}