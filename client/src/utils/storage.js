export function setStorage(key, value) {
    sessionStorage.setItem(key, value);
}

export function getStorage(key) {
    return sessionStorage.getItem(key);
}

export function removeItem(key) {
    sessionStorage.removeItem(key);
}
