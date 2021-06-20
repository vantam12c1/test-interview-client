/**
 * data type is number or string => often params id ||
 * data type is object => often search, method get have query
 * @param {*} data 
 * @returns {string} Return string
 */
export function query(data: any): string {
    if(typeof data == 'number' || typeof data == 'string') {
        // ex: 1 => /1 or motcaigidolastring123 => /motcaigidolastring123
        return `/${data}`;
    } else {
        // ex: {name: 'vantam', age: 22} => ?name=vantam&age=22
        /* Idea: 
        *   + Loop data => push item into array [name=vantam, age=22] 
        *   + join and add &
        */
        let arr = [];
        for(let k in data) {
            arr.push(`${k}=${data[k]}`);
        }
        if(arr.length > 0) {
            return `?${arr.join('&')}` 
        }
        return '';
    }
}

/**
 * 
 * @param {string} domain 
 * @param {string} endpoint 
 * @param {string} query 
 * @returns {string} Return string
 */
export function merge(domain: string, endpoint: string, query: string = ''): string {
    return `${domain}${endpoint}${query}`
}