/**
 * 
 * @param {string} key - key get value
 * @returns {string} Return string 
 */
export function get(key: string) {
    let arr = [];
    let cValue = '';
    arr = document.cookie.split(';');
    arr.map(item => {
        item = item.trim();
        if(item.indexOf(`${key}=`) == 0) {
            cValue = item.slice(item.indexOf('=') + 1, item.length);
        } 
        return item;
    });
    return cValue;
}

/**
 * Ex: document.cookie = key=value;expires=second;path=/
 * @param {string} key 
 * @param {string} value 
 * @param {number} time - Number second 
 */
export function set(key: string, value: string, time?: number) {
    let d = new Date();
    d.setTime(d.getTime() + (time*1000));
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${key}=${value};${expires};path=/`;
}

/**
 * remove key from cookie
 * @param {string} key 
 */
export function remove(key: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}