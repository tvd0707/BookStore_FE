const API_DOMAIN = 'http://localhost:8080/';

export const get = async (path:string) => {
    const response = await fetch(API_DOMAIN + path);
    const result = await response.json();
    return result;
}

export const post = async (path:string, data:any) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)  
    });
    const result = await response.json();
    return result;
}

export const patch = async (path:string, data:any) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'PATCH',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)  
    });
    const result = await response.json();
    return result;
}

export const del = async (path:string) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'DELETE',
    });
    const result = await response.json();
    return result;
}