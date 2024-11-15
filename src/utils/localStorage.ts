export const addToLocalStorage = (key: string, value: any) => {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
}

export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

export const updateLocalStorage = (key: string, newValue: any) => {
    if (localStorage.getItem(key) !== null) {
        const stringValue = JSON.stringify(newValue);
        localStorage.setItem(key, stringValue);
    } else {
        console.warn(`Key "${key}" does not exist in localStorage.`);
    }
}
